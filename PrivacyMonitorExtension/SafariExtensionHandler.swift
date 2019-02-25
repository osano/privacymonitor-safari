//
//  SafariExtensionHandler.swift
//  PrivacyMonitorExtension
//
//

import SafariServices
import Foundation
import PrivacyMonitorFramework

private enum IncomingMessage: String {
    case contentLoaded
    case requestScoreAnalysis
}

enum OutgoingMessage: String {
    case domainLoaded
    case openToaster
    case removeToaster
    case showLoader
    case hideLoader
    case handleError
    case hideScoreAnalysisButton
    case scoreAnalysisDidFinish
}

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {

        page.getPropertiesWithCompletionHandler { properties in
            let incomingMessage = IncomingMessage(rawValue: messageName)

            switch incomingMessage {
            case .contentLoaded?:
                self.registerDomainVisit()
            case .requestScoreAnalysis?:
                self.requestScoreAnalysis()
            default:
                break
            }
        }
    }

    override func toolbarItemClicked(in window: SFSafariWindow) {
        requestDomainScore(in: window)
    }

    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        validationHandler(true, "")
    }

    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }

    // MARK: - Private

    func getActivePage(completionHandler: @escaping (SFSafariPage?) -> Void) {
        SFSafariApplication.getActiveWindow {$0?.getActiveTab {$0?.getActivePage(completionHandler: completionHandler)}}
    }

    fileprivate func registerDomainVisit() {
        getActivePage { page in
            page?.getPropertiesWithCompletionHandler { properties in
                guard let page = page,
                    let url = properties?.url else { return }

                let privacyMonitor = PrivacyMonitor()
                privacyMonitor.registerDomainVisit(withURL: url) { result in
                    switch result {
                    case let .success(domain):
                        guard let rootDomain = domain.rootDomain else { return }

                        page.dispatchMessageToScript(withName: OutgoingMessage.openToaster.rawValue, userInfo: nil)

                        let userInfo: [String : Any] = [
                            "rootDomain": rootDomain,
                            "score": domain.score,
                            "previousScore": domain.previousScore
                        ]

                        page.dispatchMessageToScript(withName: OutgoingMessage.domainLoaded.rawValue, userInfo: userInfo)
                    default:
                        return
                    }
                }
            }
        }
    }

    fileprivate func requestDomainScore(in window: SFSafariWindow) {
        window.getActiveTab { activeTab in
            activeTab?.getActivePage { activePage in
                activePage?.getPropertiesWithCompletionHandler { properties in
                    guard let page = activePage,
                        let url = properties?.url else { return }

                    window.getToolbarItem { toolbarItem in
                        toolbarItem?.setEnabled(false)
                    }

                    page.dispatchMessageToScript(withName: OutgoingMessage.openToaster.rawValue, userInfo: nil)
                    page.dispatchMessageToScript(withName: OutgoingMessage.showLoader.rawValue, userInfo: nil)

                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {

                        let privacyMonitor = PrivacyMonitor()
                        privacyMonitor.requestDomainScore(withURL: url) { result in
                            switch result {
                            case let .success(domain):
                                guard let rootDomain = domain.rootDomain else { return }

                                page.dispatchMessageToScript(withName: OutgoingMessage.hideLoader.rawValue, userInfo: nil)

                                let userInfo: [String : Any] = [
                                    "rootDomain": rootDomain,
                                    "score": domain.score,
                                    "previousScore": domain.previousScore
                                ]

                                page.dispatchMessageToScript(withName: OutgoingMessage.domainLoaded.rawValue, userInfo: userInfo)
                            case let .failure(error):
                                var errorMessage = error.localizedDescription
                                var requestScoreAnalysis = false
                                switch error {
                                case .domainDoesNotExist:
                                    errorMessage = Constants.ErrorMessages.domainDoesNotExist
                                    requestScoreAnalysis = true
                                default:
                                    errorMessage = Constants.ErrorMessages.unknown
                                }

                                let userInfo: [String: Any] = [
                                    "errorMessage": errorMessage,
                                    "requestScoreAnalysis" : requestScoreAnalysis
                                ]

                                page.dispatchMessageToScript(withName: OutgoingMessage.handleError.rawValue, userInfo: userInfo)
                            }

                            window.getToolbarItem { toolbarItem in
                                toolbarItem?.setEnabled(true)
                            }

                        }
                    }
                }
            }
        }
    }

    fileprivate func requestScoreAnalysis() {
        let privacyMonitor = PrivacyMonitor()

        getActivePage { page in
            page?.getPropertiesWithCompletionHandler { properties in
                guard let page = page,
                    let url = properties?.url else { return }

                // Hide errorButton
                page.dispatchMessageToScript(withName: OutgoingMessage.hideScoreAnalysisButton.rawValue, userInfo: nil);

                // Show Loader
                page.dispatchMessageToScript(withName: OutgoingMessage.showLoader.rawValue, userInfo: nil)

                privacyMonitor.requestScoreAnalysis(withURL: url) { result in
                    switch result {
                    case let .success(success):

                        let userInfo: [String : Any] = [
                            "success": success,
                            "message": success ? Constants.App.scoreAnalysisSuccessText : Constants.ErrorMessages.unknown
                        ]

                        page.dispatchMessageToScript(withName: OutgoingMessage.scoreAnalysisDidFinish.rawValue, userInfo: userInfo)

                    case .failure:

                        let userInfo: [String : Any] = [
                            "success": false,
                            "message": Constants.ErrorMessages.unknown
                        ]

                        page.dispatchMessageToScript(withName: OutgoingMessage.scoreAnalysisDidFinish.rawValue, userInfo: userInfo)
                    }
                }
            }
        }
    }
}
