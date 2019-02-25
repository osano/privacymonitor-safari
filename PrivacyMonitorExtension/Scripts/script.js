if (window.top === window) {
	safari.self.addEventListener("message", handleMessage, true);
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		PMInit();
	} else {
		document.addEventListener('DOMContentLoaded', function() {
			PMInit();
		});
	}
}

function PMInit() {
	createToaster();
	//comment out below for debugging
	safari.extension.dispatchMessage("contentLoaded");
}

function dispatchMessage(messageName, parameters) {
	safari.extension.dispatchMessage(messageName, parameters);
}

function handleMessage(event) {
	if (event.name === "domainLoaded") {
		loadDomain(event.message.rootDomain, event.message.score, event.message.previousScore);
	} else if (event.name === "openToaster") {
		// Remove toaster if needed
		removeToaster();
		// Create the toaster if needed
		createToaster();
		// Finally show the toaster
		openToaster();
	} else if (event.name === "removeToaster") {
		removeToaster();
	} else if (event.name == "showLoader") {
		showLoader();
	} else if (event.name == "hideLoader") {
		hideLoader();
	} else if (event.name == "handleError") {
		handleError(event.message.errorMessage, event.message.requestScoreAnalysis);
	} else if (event.name == "scoreAnalysisDidFinish") {
		scoreAnalysisDidFinish(event.message.success, event.message.message);
	} else if (event.name == "hideScoreAnalysisButton") {
		hideScoreAnalysisButton();
	}
}

function createToaster() {
	if (document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc")) {
		return;
	}
	// Main container
	var parentElement = document.createElement("div");
	parentElement.id = "privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	parentElement.className = "privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Header
	var headerElement = document.createElement("div");
	headerElement.className = "privacyMonitor_header-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Header > Logo image link
	var logoHref = document.createElement("a");
	logoHref.href = "https://www.privacymonitor.com";
	logoHref.target = "_blank";
	// Header > Logo image
	var logoImageElement = document.createElement("img");
	logoImageElement.className = "privacyMonitor_logo-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	//logoImageElement.src = safari.extension.baseURI + "PrivacyMonitorLogo.svg";
	logoImageElement.src = 'data:image/svg+xml;utf8,<svg height="101" viewBox="0 0 544 101" width="544" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="m80.981 23.8584-27.443-19.875c-2.949-2.134-6.849-3.156-10.756-3.087-3.89.073-7.833 1.225-10.887 3.439l-26.475 19.172c-1.664 1.207-3.072 2.737-3.983 4.511-.846 1.64-1.26 3.47-1.072 5.424v31.277c-.166 1.736.148 3.471.948 5.101.772 1.556 1.978 2.986 3.625 4.178l2.914 2.109 3.902-2.821 21.45-15.316 6.517 4.718c.901.655 2.097.967 3.293.947 1.19-.024 2.395-.375 3.33-1.055l8.109-5.869c.51-.37.94-.835 1.22-1.381.261-.502.385-1.062.327-1.66v-9.574c.055-.532-.043-1.067-.29-1.565-.235-.478-.606-.913-1.11-1.28l-8.401-6.086c-.904-.652-2.099-.967-3.296-.945-1.19.022-2.397.376-3.334 1.053-8.349 6.047-16.678 12.117-25.013 18.186v-14.86c-.127-1.301.15-2.522.715-3.617.607-1.182 1.548-2.204 2.658-3.006l17.651-12.785c2.04-1.478 4.668-2.247 7.26-2.294 2.605-.045 5.207.636 7.175 2.059l18.298 13.253c1.099.797 1.904 1.754 2.415 2.792.534 1.082.745 2.246.633 3.404v20.849c.129 1.305-.145 2.526-.709 3.619l-.002-.004c-.609 1.187-1.551 2.204-2.66 3.01l-17.654 12.783c-2.037 1.475-4.666 2.247-7.258 2.294-2.606.047-5.207-.636-7.173-2.058l-3.54-2.564-12.244 8.66 12.258 8.882c2.951 2.132 6.848 3.158 10.758 3.084 3.888-.071 7.83-1.224 10.886-3.435l26.474-19.173c1.667-1.208 3.076-2.738 3.989-4.513h.002c.844-1.639 1.258-3.466 1.065-5.425v-31.263c.169-1.74-.147-3.483-.948-5.112-.768-1.556-1.978-2.986-3.624-4.181" fill="#00c7ff"/><g fill="#174d73"><path d="m532.2539 31.1938h-9.885v34.533h9.885v-16.624c.011-1.958.472-3.649 1.392-5.071.92-1.412 2.235-2.471 3.936-3.167 1.701-.706 3.734-.952 6.098-.749v-9.307c-2.578.043-4.824.621-6.75 1.743-1.926 1.124-3.477 2.74-4.676 4.869z"/><path d="m500.5342 30.8735c-2.781.01-5.317.427-7.584 1.262-2.269.823-4.216 2.011-5.853 3.562-1.636 1.541-2.898 3.391-3.776 5.542-.878 2.161-1.326 4.568-1.337 7.221.011 2.642.459 5.038 1.337 7.2.878 2.161 2.14 4.011 3.776 5.573 1.637 1.562 3.584 2.761 5.853 3.605 2.267.834 4.803 1.263 7.584 1.274 2.771-.011 5.285-.44 7.542-1.274 2.268-.844 4.216-2.043 5.842-3.605 1.637-1.562 2.888-3.412 3.765-5.573.877-2.162 1.327-4.558 1.337-7.2-.01-2.653-.46-5.06-1.337-7.221-.877-2.151-2.128-4.001-3.765-5.542-1.626-1.551-3.574-2.739-5.842-3.562-2.257-.835-4.771-1.252-7.542-1.262m0 8.215c1.701.011 3.199.418 4.482 1.21 1.284.791 2.29 1.892 3.017 3.316.729 1.423 1.092 3.081 1.103 4.974-.011 1.894-.374 3.552-1.103 4.975-.727 1.422-1.733 2.524-3.017 3.316-1.283.791-2.781 1.199-4.482 1.209-1.722-.01-3.23-.418-4.514-1.209-1.284-.792-2.279-1.894-2.996-3.316-.717-1.423-1.081-3.081-1.091-4.975.01-1.893.374-3.551 1.091-4.974.717-1.424 1.712-2.525 2.996-3.316 1.284-.792 2.792-1.199 4.514-1.21"/><path d="m478.4238 56.5488c-.897.416-1.732.737-2.503.952-.77.224-1.476.331-2.118.331-1.069.043-1.882-.246-2.46-.877-.578-.632-.866-1.669-.878-3.102v-14.25h9.372v-6.868h-9.372v-9.5h-9.821v32.287c.011 1.775.29 3.338.836 4.674.534 1.327 1.304 2.44 2.278 3.327.984.888 2.129 1.551 3.444 1.991 1.306.437 2.739.663 4.29.663 1.616-.011 3.199-.215 4.729-.632 1.54-.417 2.963-.994 4.258-1.743z"/><path d="m446.427 65.727h9.886v-34.533h-9.886z"/><path d="m451.6211 15.8535c-1.059.011-1.979.246-2.781.716-.792.472-1.413 1.124-1.863 1.947-.448.824-.673 1.776-.684 2.857.011 1.08.236 2.032.684 2.856.45.824 1.071 1.477 1.863 1.947.802.471 1.722.706 2.781.717 1.059-.011 1.979-.246 2.781-.717.792-.47 1.412-1.123 1.862-1.947.449-.824.673-1.776.684-2.856-.011-1.081-.235-2.033-.684-2.857-.45-.823-1.07-1.475-1.862-1.947-.802-.47-1.722-.705-2.781-.716"/><path d="m429.4346 30.8091c-2.706.021-5.06.567-7.071 1.616-2.022 1.058-3.637 2.653-4.867 4.803v-6.034h-9.885v34.532h9.885v-17.009c.01-1.7.32-3.22.952-4.536.62-1.316 1.519-2.364 2.695-3.123 1.177-.76 2.589-1.166 4.247-1.199 1.423 0 2.632.289 3.648.856 1.017.567 1.798 1.38 2.333 2.428.545 1.06.824 2.311.824 3.777v18.806h9.885v-21.694c-.012-2.707-.536-5.05-1.563-7.029-1.037-1.969-2.492-3.488-4.375-4.568-1.894-1.069-4.13-1.615-6.708-1.626"/><path d="m385.4092 30.8735c-2.781.01-5.317.427-7.585 1.262-2.269.823-4.215 2.011-5.852 3.562-1.636 1.541-2.899 3.391-3.776 5.542-.878 2.161-1.327 4.568-1.337 7.221.01 2.642.459 5.038 1.337 7.2.877 2.161 2.14 4.011 3.776 5.573 1.637 1.562 3.583 2.761 5.852 3.605 2.268.834 4.804 1.263 7.585 1.274 2.771-.011 5.284-.44 7.542-1.274 2.268-.844 4.215-2.043 5.842-3.605 1.637-1.562 2.887-3.412 3.764-5.573.878-2.162 1.327-4.558 1.338-7.2-.011-2.653-.46-5.06-1.338-7.221-.877-2.151-2.127-4.001-3.764-5.542-1.627-1.551-3.574-2.739-5.842-3.562-2.258-.835-4.771-1.252-7.542-1.262m0 8.215c1.701.011 3.199.418 4.482 1.21 1.284.791 2.289 1.892 3.017 3.316.728 1.423 1.092 3.081 1.102 4.974-.01 1.894-.374 3.552-1.102 4.975-.728 1.422-1.733 2.524-3.017 3.316-1.283.791-2.781 1.199-4.482 1.209-1.722-.01-3.231-.418-4.515-1.209-1.284-.792-2.278-1.894-2.995-3.316-.717-1.423-1.081-3.081-1.092-4.975.011-1.893.375-3.551 1.092-4.974.717-1.424 1.711-2.525 2.995-3.316 1.284-.792 2.793-1.199 4.515-1.21"/><path d="m350.8906 30.8091c-2.931.021-5.455.695-7.573 2-2.118 1.316-3.744 3.295-4.878 5.959-.557-1.68-1.38-3.102-2.472-4.29-1.092-1.187-2.407-2.086-3.959-2.717-1.551-.632-3.294-.952-5.253-.952-2.61.032-4.898.567-6.878 1.616-1.968 1.048-3.573 2.62-4.803 4.738v-5.969h-9.885v34.532h9.885v-17.073c.01-1.679.31-3.177.93-4.493.611-1.306 1.488-2.343 2.632-3.102 1.155-.77 2.525-1.166 4.14-1.199 1.359 0 2.525.289 3.51.846.994.556 1.753 1.358 2.289 2.417.535 1.048.813 2.311.813 3.798v18.806h9.82v-17.073c.011-1.679.31-3.177.931-4.493.61-1.306 1.477-2.343 2.621-3.102 1.135-.77 2.504-1.166 4.086-1.199 1.381 0 2.568.289 3.563.846.995.556 1.754 1.358 2.3 2.417.535 1.048.813 2.311.813 3.798v18.806h9.821v-21.694c-.011-2.707-.524-5.05-1.53-7.029-1.006-1.969-2.44-3.488-4.301-4.568-1.851-1.069-4.064-1.615-6.622-1.626"/><path d="m302.1387 31.8994h-5.136l-10.718 27.923-11.234-27.923h-5.263l13.994 33.57-1.414 3.146c-.684 1.572-1.55 2.761-2.599 3.552-1.049.802-2.235 1.198-3.562 1.198-.834 0-1.637-.128-2.418-.396-.792-.257-1.562-.664-2.332-1.209l-2.118 4.172c1.017.835 2.108 1.455 3.274 1.873 1.166.417 2.449.63 3.85.63 2.257 0 4.247-.674 5.96-2 1.722-1.327 3.112-3.295 4.182-5.894z"/><path d="m255.2944 31.7715c-2.449.011-4.697.429-6.729 1.252-2.043.824-3.808 1.99-5.306 3.509-1.498 1.508-2.653 3.305-3.477 5.392-.813 2.085-1.231 4.386-1.241 6.922.01 2.524.428 4.835 1.241 6.921.813 2.075 1.958 3.883 3.455 5.392 1.487 1.518 3.253 2.684 5.296 3.508 2.044.825 4.289 1.242 6.761 1.252 2.932-.01 5.542-.536 7.831-1.551 2.289-1.017 4.194-2.451 5.713-4.29l-2.888-3.081c-1.199 1.422-2.686 2.503-4.462 3.242-1.776.749-3.777 1.123-6.001 1.123-1.755-.011-3.37-.311-4.825-.921-1.465-.599-2.728-1.454-3.798-2.566-1.07-1.113-1.904-2.429-2.492-3.959-.589-1.53-.878-3.22-.889-5.07.011-1.852.3-3.542.889-5.061.588-1.519 1.422-2.834 2.492-3.937 1.07-1.101 2.333-1.947 3.798-2.546 1.455-.599 3.07-.899 4.825-.909 2.054.01 3.926.353 5.616 1.038 1.69.684 3.177 1.647 4.462 2.878l2.76-3.531c-1.552-1.616-3.424-2.856-5.628-3.734-2.193-.866-4.664-1.294-7.403-1.273"/><path d="m230.2539 65.7266h4.879l-.065-22.337c-.021-2.428-.545-4.515-1.551-6.258-1.005-1.733-2.482-3.07-4.407-4.012-1.926-.931-4.279-1.401-7.072-1.412-1.904 0-3.637.182-5.178.535-1.54.364-3.005.877-4.385 1.551-1.391.684-2.804 1.509-4.237 2.472l2.119 3.658c1.754-1.23 3.519-2.172 5.284-2.846 1.765-.664 3.584-.995 5.434-1.005 1.991 0 3.659.321 4.996.952 1.349.62 2.354 1.519 3.039 2.696.674 1.177 1.016 2.589 1.016 4.247v1.99h-11.104c-2.664.032-4.932.438-6.815 1.23s-3.328 1.904-4.322 3.337c-.995 1.434-1.498 3.146-1.508 5.125.01 1.466.278 2.824.813 4.076.534 1.252 1.304 2.343 2.311 3.284 1.005.931 2.203 1.658 3.615 2.182 1.412.514 2.996.782 4.75.793 2.707 0 5.114-.45 7.211-1.36 2.096-.898 3.818-2.267 5.177-4.097zm-11.425-4.107c-1.594-.011-2.963-.268-4.129-.771-1.156-.503-2.055-1.219-2.675-2.14-.631-.92-.952-2.001-.963-3.252 0-1.861.728-3.23 2.183-4.129 1.444-.888 3.594-1.337 6.418-1.326h10.528v4.043c-.439 1.573-1.189 2.92-2.248 4.044-1.059 1.134-2.364 2-3.915 2.611-1.55.609-3.284.909-5.199.92z"/><path d="m192.9761 65.7266 13.287-33.827h-5.071l-10.719 28.628-10.784-28.628h-5.327l13.414 33.827z"/><path d="m165.571 65.726h4.943v-33.827h-4.943z"/><path d="m168.0107 18.7422c-.631 0-1.188.159-1.68.46-.481.289-.877.706-1.155 1.219-.289.525-.428 1.113-.438 1.787.01.663.149 1.262.438 1.786.278.514.674.92 1.155 1.22.492.299 1.049.449 1.68.46.631-.011 1.188-.161 1.679-.46.492-.3.878-.706 1.155-1.22.29-.524.429-1.123.44-1.786-.011-.674-.15-1.262-.44-1.787-.277-.513-.663-.93-1.155-1.219-.491-.301-1.048-.46-1.679-.46"/><path d="m149.522 31.8994h-5.006v33.827h5.006v-17.972c.204-2.236.803-4.183 1.819-5.841 1.016-1.659 2.386-2.931 4.129-3.829 1.744-.9 3.799-1.338 6.183-1.306v-5.071c-2.866.043-5.316.717-7.37 2.023-2.043 1.304-3.627 3.198-4.761 5.68z"/><path d="m124.7471 31.7075c-2.974.011-5.563.674-7.788 1.969-2.225 1.305-3.968 3.145-5.241 5.541v-7.318h-5.007v46.279h5.007v-19.705c1.262 2.364 3.016 4.183 5.252 5.478s4.879 1.947 7.905 1.968c2.397-.01 4.59-.427 6.559-1.252 1.968-.824 3.659-1.99 5.081-3.498 1.433-1.508 2.525-3.305 3.295-5.38.781-2.077 1.166-4.366 1.177-6.88-.011-2.546-.407-4.867-1.187-6.964-.793-2.097-1.905-3.915-3.348-5.446-1.434-1.518-3.146-2.695-5.136-3.529-1.979-.835-4.162-1.252-6.569-1.263m-.898 29.655c-1.787-.011-3.424-.322-4.9-.931s-2.76-1.475-3.841-2.589c-1.079-1.124-1.914-2.449-2.492-3.979-.588-1.531-.888-3.231-.898-5.082.01-1.84.31-3.52.898-5.05.578-1.529 1.413-2.866 2.492-3.99 1.081-1.123 2.365-1.99 3.841-2.61 1.476-.61 3.113-.92 4.9-.931 1.775.011 3.391.321 4.867.942 1.467.62 2.739 1.498 3.82 2.631 1.069 1.124 1.904 2.451 2.492 3.98.589 1.53.877 3.209.888 5.028-.011 1.84-.299 3.519-.888 5.049-.588 1.53-1.423 2.857-2.492 3.991-1.081 1.123-2.353 1.99-3.82 2.599-1.476.62-3.092.931-4.867.942"/></g><path d="m416.5684 78.6035c-1.219.005-2.286.244-3.203.722-.916.482-1.663 1.174-2.238 2.087v-8.835h-3.365v21.708h3.365v-2.692c.57.911 1.322 1.605 2.248 2.083.922.482 2.009.721 3.253.726 1.116-.005 2.126-.195 3.027-.57.902-.376 1.678-.913 2.326-1.605.649-.697 1.146-1.52 1.491-2.478.348-.959.523-2.022.528-3.188-.005-1.19-.186-2.272-.541-3.243-.356-.975-.859-1.809-1.517-2.516-.658-.702-1.438-1.243-2.351-1.624-.907-.38-1.916-.57-3.023-.575zm-.701 12.932c-.933-.005-1.756-.225-2.463-.649-.712-.429-1.268-1.023-1.667-1.784-.401-.761-.606-1.648-.61-2.658.004-.985.209-1.853.61-2.604.399-.756.955-1.345 1.667-1.775.707-.429 1.53-.649 2.463-.653.697.004 1.336.128 1.911.38.58.249 1.077.6 1.501 1.048.42.454.747.986.976 1.595.234.609.35 1.282.35 2.009-.004 1.004-.209 1.883-.609 2.647-.399.762-.955 1.357-1.667 1.785-.707.434-1.526.649-2.462.659zm24.253-12.815h-3.364l-4.331 11.791-4.651-11.791h-3.481l6.435 15.331-.525 1.17c-.264.585-.601 1.02-1 1.302-.401.283-.858.424-1.371.424-.346 0-.678-.058-.999-.18-.318-.127-.659-.316-1.02-.581l-1.433 2.605c.537.453 1.097.784 1.677.999.585.215 1.225.317 1.922.317 1.175 0 2.19-.308 3.047-.922.854-.614 1.526-1.535 2.015-2.765zm16.559-.117c-1.209.005-2.316.195-3.305.571-.995.38-1.854.917-2.571 1.614-.72.697-1.277 1.526-1.667 2.491-.39.966-.585 2.043-.59 3.223.005 1.175.2 2.244.59 3.208.39.966.947 1.8 1.667 2.497.717.698 1.576 1.24 2.571 1.62.989.38 2.096.57 3.305.575 1.205-.005 2.302-.195 3.292-.575s1.843-.922 2.559-1.62c.718-.697 1.273-1.531 1.663-2.497.391-.964.586-2.033.591-3.208-.005-1.18-.2-2.257-.591-3.223-.39-.965-.945-1.794-1.663-2.491-.716-.697-1.569-1.234-2.559-1.614-.99-.376-2.087-.566-3.292-.571zm0 2.896c.937.005 1.756.22 2.462.639.713.425 1.269 1.01 1.668 1.761.401.755.605 1.634.61 2.633-.005 1.009-.209 1.896-.61 2.652-.399.756-.955 1.347-1.668 1.766-.706.424-1.525.638-2.462.643-.94-.005-1.769-.219-2.486-.643-.713-.419-1.269-1.01-1.668-1.766-.404-.756-.609-1.643-.614-2.652.005-.999.21-1.878.614-2.633.399-.751.955-1.336 1.668-1.761.717-.419 1.546-.634 2.486-.639zm16.268-2.925c-.751 0-1.474.083-2.156.258-.683.176-1.292.445-1.828.81-.541.365-.961.828-1.273 1.399-.311.572-.474 1.249-.477 2.039.003.794.15 1.458.443 1.989.292.532.678.966 1.16 1.302s1.019.609 1.595.824c.58.215 1.16.405 1.74.571.581.165 1.117.34 1.6.531.488.191.878.423 1.17.707.293.283.444.649.454 1.097-.005.391-.118.708-.341.951-.226.249-.528.429-.907.546-.381.112-.815.171-1.298.171-.575 0-1.174-.078-1.804-.234-.629-.157-1.243-.375-1.833-.663-.59-.289-1.112-.634-1.57-1.035l-1.2 2.4c.522.468 1.126.863 1.804 1.184.682.323 1.405.566 2.165.732.761.166 1.527.249 2.291.249.791 0 1.542-.093 2.253-.274.713-.185 1.352-.462 1.906-.842.557-.376.997-.859 1.318-1.44.321-.579.487-1.272.493-2.066-.006-.8-.152-1.473-.449-2.014-.293-.542-.688-.985-1.176-1.336-.487-.348-1.023-.634-1.608-.859-.591-.224-1.175-.419-1.761-.589-.585-.166-1.126-.342-1.618-.518-.488-.18-.883-.399-1.181-.658-.297-.254-.448-.585-.458-.99.005-.37.103-.668.298-.897.194-.229.468-.395.808-.498.341-.107.732-.156 1.175-.156.464 0 .952.06 1.469.166.512.112 1.028.269 1.541.474.517.204 1.004.453 1.468.736l1.228-2.487c-.473-.331-1.005-.619-1.599-.854-.595-.234-1.219-.414-1.872-.536-.655-.127-1.312-.19-1.97-.19zm18.432 15.711h3.305l-.029-10.21c-.015-1.146-.263-2.126-.751-2.941-.492-.814-1.199-1.438-2.131-1.873-.935-.433-2.067-.653-3.408-.658-.732 0-1.395.044-1.989.127-.591.083-1.146.205-1.659.371-.511.166-1.013.37-1.506.614-.493.243-1.01.527-1.546.848l1.375 2.341c.775-.527 1.551-.921 2.321-1.185.766-.262 1.526-.394 2.272-.394 1.229.004 2.156.282 2.78.828s.936 1.311.936 2.302v.467h-4.711c-1.253.015-2.315.216-3.188.595-.874.386-1.541.922-2 1.619-.458.694-.687 1.517-.693 2.468.006.692.132 1.331.381 1.917.254.584.619 1.092 1.092 1.525.479.439 1.054.776 1.727 1.019.673.24 1.428.361 2.272.366 1.131 0 2.131-.171 3.004-.507.867-.341 1.584-.853 2.146-1.541zm-4.448-2.516c-.629 0-1.166-.098-1.614-.288s-.795-.453-1.033-.8c-.244-.346-.366-.751-.366-1.224-.004-.741.257-1.272.785-1.598.527-.327 1.341-.484 2.433-.479h4.213v1.434c-.063.57-.292 1.078-.687 1.521-.396.444-.917.789-1.556 1.043-.643.254-1.37.386-2.175.391zm20.843-13.166c-1.321-.004-2.467.239-3.438.737-.97.501-1.736 1.286-2.296 2.365v-2.985h-3.365v15.565h3.365v-8.28c.078-.814.307-1.541.677-2.174.372-.629.873-1.132 1.502-1.498.634-.365 1.38-.556 2.239-.57.785.004 1.452.156 2.013.458.556.303.987.737 1.283 1.297s.449 1.235.449 2.019v8.748h3.364v-9.684c-.005-1.244-.234-2.311-.697-3.209-.458-.893-1.116-1.579-1.981-2.061-.862-.479-1.901-.724-3.115-.728zm16.968 0c-1.209.005-2.316.195-3.306.571-.994.38-1.852.917-2.569 1.614-.721.697-1.278 1.527-1.668 2.491-.39.965-.585 2.043-.59 3.223.005 1.175.2 2.244.59 3.208.39.966.947 1.8 1.668 2.497.717.698 1.575 1.24 2.569 1.62.99.38 2.097.57 3.306.575 1.205-.005 2.304-.195 3.292-.575.989-.38 1.845-.922 2.559-1.62.717-.696 1.275-1.531 1.664-2.497.389-.963.585-2.033.59-3.208-.005-1.18-.201-2.258-.59-3.223-.389-.964-.947-1.795-1.664-2.491-.714-.697-1.569-1.234-2.559-1.614-.99-.376-2.087-.566-3.292-.571zm0 2.896c.937.005 1.757.22 2.463.639.713.425 1.268 1.01 1.668 1.761.4.755.604 1.634.609 2.633-.005 1.009-.21 1.897-.609 2.652-.4.755-.955 1.347-1.668 1.766-.706.424-1.526.638-2.463.643-.941-.005-1.769-.219-2.486-.643-.712-.419-1.268-1.01-1.667-1.766-.406-.756-.611-1.643-.615-2.652.004-.999.209-1.878.615-2.633.399-.751.955-1.336 1.667-1.761.717-.419 1.545-.634 2.486-.639z" fill="#00c7ff"/></g></svg>';
	//logoImageElement.srcset = safari.extension.baseURI + "PrivacyMonitorLogo.svg";
	logoImageElement.alt = "Privacy Monitor by Osano";
	// Header > Close button
	var closeButtonElement = document.createElement("a");
	closeButtonElement.className = "privacyMonitor_close-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	closeButtonElement.addEventListener("click", function() {
		document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
	});
	logoHref.appendChild(logoImageElement);
	headerElement.appendChild(logoHref);
	headerElement.appendChild(closeButtonElement);
	// Separator
	var separatorElement = document.createElement("div");
	separatorElement.className = "privacyMonitor_separator-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Main content
	var mainContentElement = document.createElement("div");
	mainContentElement.id = "privacyMonitor_content-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	mainContentElement.className = "privacyMonitor_content-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Domain
	var domainElement = document.createElement("div");
	domainElement.id = "privacyMonitor_domain-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	domainElement.className = "privacyMonitor_domain-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Score stack container
	var stackContainerElement = document.createElement("div");
	stackContainerElement.className = "privacyMonitor_stackContainer-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	mainContentElement.appendChild(domainElement);
	mainContentElement.appendChild(stackContainerElement);
	// Score chart
	var scoreChartElement = document.createElement("div");
	scoreChartElement.id = "privacyMonitor_scoreChart-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	stackContainerElement.appendChild(scoreChartElement);
	// SVG Score chart
	var cxy = "19";
	var radius = "15.91549430918954";
	var strokeWidth = "6";
	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", "100%");
	svgElement.setAttribute("height", "100%");
	svgElement.setAttribute("viewBox", "0 0 38 38");
	scoreChartElement.appendChild(svgElement);
	// SVG Score chart > Background circle
	var backgroundCircleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	backgroundCircleElement.setAttribute("cx", cxy);
	backgroundCircleElement.setAttribute("cy", cxy);
	backgroundCircleElement.setAttribute("r", radius);
	backgroundCircleElement.setAttribute("fill", "#FFF");
	svgElement.appendChild(backgroundCircleElement);
	// SVG Score chart > Background border
	var backgroundBorderElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	backgroundBorderElement.setAttribute("cx", cxy);
	backgroundBorderElement.setAttribute("cy", cxy);
	backgroundBorderElement.setAttribute("r", radius);
	backgroundBorderElement.setAttribute("fill", "transparent");
	backgroundBorderElement.setAttribute("stroke", "#DFDFE2");
	backgroundBorderElement.setAttribute("stroke-width", strokeWidth);
	svgElement.appendChild(backgroundBorderElement);
	// SVG Score chart > Score segment
	var scoreSegmentElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	scoreSegmentElement.setAttribute("id", "privacyMonitor_scoreSegment-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	scoreSegmentElement.setAttribute("cx", cxy);
	scoreSegmentElement.setAttribute("cy", cxy);
	scoreSegmentElement.setAttribute("r", radius);
	scoreSegmentElement.setAttribute("fill", "transparent");
	scoreSegmentElement.setAttribute("stroke-width", strokeWidth);
	scoreSegmentElement.setAttribute("stroke-dashoffset", "25");
	svgElement.appendChild(scoreSegmentElement);
	// SVG Score chart > Previous score segment
	var previousScoreSegmentElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	previousScoreSegmentElement.setAttribute("id", "privacyMonitor_previousScoreSegment-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	previousScoreSegmentElement.setAttribute("cx", cxy);
	previousScoreSegmentElement.setAttribute("cy", cxy);
	previousScoreSegmentElement.setAttribute("r", radius);
	previousScoreSegmentElement.setAttribute("fill", "transparent");
	previousScoreSegmentElement.setAttribute("stroke-width", strokeWidth);
	previousScoreSegmentElement.setAttribute("stroke-dasharray", "1 99");
	svgElement.appendChild(previousScoreSegmentElement);
	// SVG Score char > Trend image
	var trendIconElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
	trendIconElement.setAttribute("id", "privacyMonitor_trendIcon-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	trendIconElement.setAttribute("width", "14");
	trendIconElement.setAttribute("height", "14");
	trendIconElement.setAttribute("x", "50%");
	trendIconElement.setAttribute("y", "50%");
	trendIconElement.setAttribute("transform", "translate(-7,-7)");
	svgElement.appendChild(trendIconElement);
	// Score Container
	var scoreContainerElement = document.createElement("div");
	scoreContainerElement.id = "privacyMonitor_scoreContainer-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	stackContainerElement.appendChild(scoreContainerElement);
	// Score Container > Score value
	var scoreElement = document.createElement("div");
	scoreElement.className = "privacyMonitor_score-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	var scoreValueElement = document.createElement("span");
	scoreValueElement.id = "privacyMonitor_scoreValue-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	scoreElement.appendChild(scoreValueElement);
	// Score Container > Score description
	var scoreDescriptionElement = document.createElement("div");
	scoreDescriptionElement.id = "privacyMonitor_scoreDescription-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Score Container > Trend
	var scoreTrendElement = document.createElement("div");
	scoreTrendElement.className = "privacyMonitor_trend-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	scoreTrendElement.innerHTML = "Trend: ";
	// Score Container > Trend Value
	var scoreTrendValueElement = document.createElement("span");
	scoreTrendValueElement.id = "privacyMonitor_trendValue-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	scoreTrendValueElement.className = "privacyMonitor_trendValue-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	scoreTrendElement.appendChild(scoreTrendValueElement);
	// Loader
	var loaderElement = document.createElement("div");
	loaderElement.id = "privacyMonitor_loader-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Error container
	var errorContainerElement = document.createElement("div");
	errorContainerElement.id = "privacyMonitor_error-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	// Error button
	var errorButtonElement = document.createElement("a");
	errorButtonElement.id = "privacyMonitor_errorButton-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	errorButtonElement.addEventListener("click", function() {
		safari.extension.dispatchMessage("requestScoreAnalysis");
	});
	errorContainerElement.appendChild(errorButtonElement);
	stackContainerElement.appendChild(loaderElement);
	stackContainerElement.appendChild(errorContainerElement);
	scoreContainerElement.appendChild(scoreElement);
	scoreContainerElement.appendChild(scoreDescriptionElement);
	scoreContainerElement.appendChild(scoreTrendElement);
	parentElement.appendChild(headerElement);
	parentElement.appendChild(separatorElement);
	parentElement.appendChild(mainContentElement);
	document.body.insertBefore(parentElement, document.body.firstChild);
}

function loadDomain(rootDomain, score, previousScore) {
	var trend = getTrend(score, previousScore);
	// Fill score chart
	setCircleScore(score, previousScore);
	// Set values
    var sc = getScore(score);
	document.getElementById("privacyMonitor_domain-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = rootDomain;
	document.getElementById("privacyMonitor_scoreValue-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = "Score: " + score;
    document.getElementById("privacyMonitor_scoreDescription-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = getScoreDescription(sc);
    document.getElementById("privacyMonitor_scoreDescription-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.color = getScoreColor(sc);
	document.getElementById("privacyMonitor_trendValue-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = getTrendDescription(trend);
	// Set classes
	document.getElementById("privacyMonitor_trendValue-ed942f29-391b-4914-8dc3-ce527fd6d8cc").classList.add(getTrendClass(trend));
	// Set Trend Icon
	var trendIconElement = document.getElementById("privacyMonitor_trendIcon-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	trendIconElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", safari.extension.baseURI + getTrendImageName(trend));
	setTimeout(function() {
		removeToaster();
	}, 10000);
}

function setCircleScore(score, previousScore) {
	var scoreSegment = document.getElementById("privacyMonitor_scoreSegment-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	if (scoreSegment === null) {
		return;
	}
	var minScore = 300.0;
	var maxScore = 850.0;
	// Score
	var scorePercentage = ((score - minScore) * 100.0) / (maxScore - minScore);
	var dasharray = "" + scorePercentage + " " + (100 - scorePercentage) + "";
	scoreSegment.setAttribute("stroke-dasharray", dasharray);
    var sc = getScore(score);
    scoreSegment.setAttribute("stroke", getScoreColor(sc));
	// Previous score
	if (previousScore > 0) {
		var previousScorePercentage = ((previousScore - minScore) * 100.0) / (maxScore - minScore);
		var dashoffset = (previousScorePercentage - 25) * -1;
		var previousScoreColor = "white";
		if (previousScore > score) {
			previousScoreColor = "#E64545";
		}
		var previousScoreSegment = document.getElementById("privacyMonitor_previousScoreSegment-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
		previousScoreSegment.setAttribute("stroke-dashoffset", dashoffset.toString());
		previousScoreSegment.setAttribute("stroke", previousScoreColor);
	}
}

function openToaster() {
	if (document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc")) {
		document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.visibility = "visible";
	}
}

function removeToaster() {
	var toasterElement = document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	if (toasterElement && toasterElement.parentNode) {
		toasterElement.parentNode.removeChild(toasterElement);
	}
}

function showLoader() {
	var parentElement = document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	if (parentElement === null) {
		return;
	}
	document.getElementById("privacyMonitor_domain-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = "Loading...";
	document.getElementById("privacyMonitor_scoreChart-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.opacity = 0;
	document.getElementById("privacyMonitor_scoreContainer-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.opacity = 0;
	document.getElementById("privacyMonitor_loader-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "block";
}

function hideLoader() {
	var parentElement = document.getElementById("privacyMonitor-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	if (parentElement === null) {
		return;
	}
	document.getElementById("privacyMonitor_scoreChart-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.opacity = 1;
	document.getElementById("privacyMonitor_scoreContainer-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.opacity = 1;
	document.getElementById("privacyMonitor_loader-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
}

function handleError(errorMessage, requestScoreAnalysis) {
	document.getElementById("privacyMonitor_loader-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
	document.getElementById("privacyMonitor_domain-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = errorMessage;
	document.getElementById("privacyMonitor_scoreChart-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.opacity = 0;
	document.getElementById("privacyMonitor_scoreContainer-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.opacity = 0;
	document.getElementById("privacyMonitor_error-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "block";
	if (requestScoreAnalysis === true) {
		document.getElementById("privacyMonitor_errorButton-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = "Request Score";
	}
}

function hideScoreAnalysisButton() {
	var errorButtonElement = document.getElementById("privacyMonitor_errorButton-ed942f29-391b-4914-8dc3-ce527fd6d8cc");
	if (errorButtonElement) {
		errorButtonElement.style.display = "none";
	}
}

function scoreAnalysisDidFinish(success, message) {
	document.getElementById("privacyMonitor_loader-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
	if (success) {
		document.getElementById("privacyMonitor_errorButton-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
	}
	document.getElementById("privacyMonitor_domain-ed942f29-391b-4914-8dc3-ce527fd6d8cc").innerHTML = message;
	document.getElementById("privacyMonitor_scoreChart-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
	document.getElementById("privacyMonitor_scoreContainer-ed942f29-391b-4914-8dc3-ce527fd6d8cc").style.display = "none";
}
// View Model
var Trend = {
	UNDEFINED: 1,
	NO_CHANGE: 2,
	DECLINING: 3,
	IMPROVING: 4
};

var Score = {
    UNKNOWN: 1,
    VERY_POOR: 2,
    FAIR: 3,
    GOOD: 4,
    VERY_GOOD: 5,
    EXCEPTIONAL: 6
}

function getScore(score) {
    if (score >= 300 && score < 580) {
        return Score.VERY_POOR;
    }
    else if (score >= 580 && score < 670) {
        return Score.FAIR;
    }
    else if (score >= 670 && score < 740) {
        return Score.GOOD;
    }
    else if (score >= 740 && score < 800) {
        return Score.VERY_GOOD;
    }
    else if (score >= 800 && score <= 850) {
        return Score.EXCEPTIONAL;
    }

    return Score.UNKNOWN;
}

function getScoreDescription(score) {
    switch(score) {
        case Score.UNKNOWN:
            return "Unknown";
        case Score.VERY_POOR:
            return "Very Poor";
        case Score.FAIR:
            return "Fair";
        case Score.GOOD:
            return "Good";
        case Score.VERY_GOOD:
            return "Very Good";
        case Score.EXCEPTIONAL:
            return "Exceptional";
    }
}

function getScoreColor(score) {
    switch(score) {
        case Score.UNKNOWN:
            return "#B6B6B6";
        case Score.VERY_POOR:
            return "#C33E7E";
        case Score.FAIR:
            return "#9F3380";
        case Score.GOOD:
            return "#672976";
        case Score.VERY_GOOD:
            return "#326DB1";
        case Score.EXCEPTIONAL:
            return "#1A468A";
    }
}

function getTrend(score, previousScore) {
	var trend = Trend.UNDEFINED;
	if (previousScore === null || previousScore === 0) {
		return trend;
	}
	if (score > previousScore) {
		trend = Trend.IMPROVING;
	} else if (score < previousScore) {
		trend = Trend.DECLINING;
	} else if (score == previousScore) {
		trend = Trend.NO_CHANGE;
	}
	return trend;
}

function getTrendDescription(trend) {
	switch (trend) {
	case Trend.UNDEFINED:
		return "No History";
	case Trend.NO_CHANGE:
		return "No Change";
	case Trend.IMPROVING:
		return "Improving";
	case Trend.DECLINING:
		return "Declining";
	}
}

function getTrendClass(trend) {
	switch (trend) {
	case Trend.UNDEFINED:
	case Trend.NO_CHANGE:
		return "privacyMonitor_trendValueNoChange-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	case Trend.IMPROVING:
		return "privacyMonitor_trendValueImproving-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	case Trend.DECLINING:
		return "privacyMonitor_trendValueDeclining-ed942f29-391b-4914-8dc3-ce527fd6d8cc";
	}
}

function getTrendImageName(trend) {
	var imageName = "TrendNoChangeIcon";
	switch (trend) {
	case Trend.IMPROVING:
		imageName = "TrendImprovingIcon";
		break;
	case Trend.DECLINING:
		imageName = "TrendDecliningIcon";
		break;
	default:
		break;
	}
	return imageName + ".png";
}
