//
//  Configs.swift
//  PrivacyMonitorExtension
//
//

import Foundation

struct Configs {

    struct App {
        static let bundleIdentifier = "com.osano.privacymonitor-mac.safari-extension"
    }
}

struct Constants {

    struct App {
        static let scoreAnalysisSuccessText = "Your request has been received and will be handled in the order received."
    }

    struct ErrorMessages {
        static let unknown = "An unknown error has occured."
        static let cannotFindHost = "Privacy Monitor by Osano cannot open the page because the server cannot be found."
        static let domainDoesNotExist = "No score found for this site."
    }
}
