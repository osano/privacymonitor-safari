//
//  ViewController.swift
//  PrivacyMonitor
//
//  Created by reactdev on 12/28/18.
//

import Cocoa
import SafariServices

class ViewController: NSViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    // MARK: - IBAction

    @IBAction func openSafariPreferences(_ sender: Any) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.osano.privacymonitor-mac.safari-extension")
    }
}

