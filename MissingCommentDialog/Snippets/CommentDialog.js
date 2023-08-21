window.nxComment = window.nxComment || {};
nxComment.missingCommentHandler = nxComment.missingCommentHandler || {};

// holds the array with the paths with comment
nxComment.missingCommentHandler.pathsWithComment = [];

// makes sure that the comment is set.
// this function is registered as a click event during initialization
nxComment.missingCommentHandler.ensureComment = function (event, skipComment) {
	let currentComment = $(".comments-body > textarea").val();
	if (!skipComment && (currentComment == "")) {
		event.stopImmediatePropagation();
		nxComment.missingCommentHandler.commandEvent = event;
		nxComment.missingCommentHandler.showCommentDialog();
	}
}

// translations for dialog title
nxComment.missingCommentHandler.titleLabel = {
  "de": "Kommentar erforderlich",
  "en": "Comment is required",
  "pl": "Komentarze są wymagane",
  "it": "Il commento è necessario",
  "fr": "Le commentaire est nécessaire",
  "sl": "Potreben je komentar",
  "ro": "Comentariul este necesar"
}

// translations for continue button
nxComment.missingCommentHandler.continueBtnLabel = {
  "de": "Weiter",
  "en": "Continue",
  "pl": "Kontynuuj",
  "it": "Procedi",
  "fr": "Continuez",
  "sl": "Nadaljuj",
  "ro": "Mai departe"
}

// function to show the command dialog
nxComment.missingCommentHandler.showCommentDialog = function() {
	$("#Modals").html($("#nxCommentModal").html());
	
	$("#Modals #nxCommentContinueButton").on("click", nxComment.missingCommentHandler.closeAndSubmitComment);
	
	$("#Modals #nxCommentCloseButton").on("click", nxComment.missingCommentHandler.closeCommentDialog);

    $("#Modals #newCommentText")[0].focus();
    $("#Modals #newCommentText")[0].setSelectionRange(0, 0);
}

// closes the command dialog
nxComment.missingCommentHandler.closeCommentDialog = function() {
    $("#Modals").html("");
}

// called by pressing the continue button
// writes the entered comment to the webcon bps comment textarea
// and calls the click event of the button with the skip 
nxComment.missingCommentHandler.closeAndSubmitComment = function() {
	let newCommentText = $("#Modals #newCommentText").val();
	nxComment.missingCommentHandler.closeCommentDialog();
	if (newCommentText != "") {
		let commentTextArea = document.getElementsByClassName("comments-body")[0].firstChild;

		// Set the value in the comment box
		var nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
		eventObject = new Event("input", { bubbles: true });
		nativeTextAreaValueSetter.call(commentTextArea, newCommentText);
		commentTextArea.dispatchEvent(eventObject);

		// Only setting the input is not enough, we need to call another event to update the state
		eventObject = new Event("focusout", { bubbles: true });
		commentTextArea.dispatchEvent(eventObject);

		// Execute the path again, after the event has been dispatched and the states have been updated. 
		setTimeout(() => {$(nxComment.missingCommentHandler.commandEvent.currentTarget).trigger("click",[arg1 = true]); }, 100);
	}
}

// set the title text if translation is available
var titleText = nxComment.missingCommentHandler.titleLabel[G_BROWSER_LANGUAGE.substr(0, 2)];
if (titleText) {
	$("#nxCommentModalTitle").text(titleText);
}

// set the continue button name if translation is available
var continueText = nxComment.missingCommentHandler.continueBtnLabel[G_BROWSER_LANGUAGE.substr(0, 2)];
if (continueText) {
	$("#nxCommentContinueButton").text(continueText)
}

// core function to initialize the ensure comment function
nxComment.missingCommentHandler.initialize = function(pathsWithComment, retryCount) {
	// save to array with paths requiring comments
	if (pathsWithComment) {
		nxComment.missingCommentHandler.pathsWithComment = pathsWithComment;
	}
	if (retryCount == undefined) {
		retryCount = 5;
	}
	var pathPanel = document.getElementById("pathPanel");
	if (!pathPanel) {
		// if path panel is set to floating to the bottom, we have to wait until rendered
		// In readonly mode, when there is no quickpath, there is also no pathPanel. So make sure, that there is no endless loop
		if (retryCount>0) {
			console.log("Retry initializing missing comment handler");
			retryCount--;
			setTimeout(nxComment.missingCommentHandler.initialize, 200, null, retryCount);
		}
		else {
			console.log("Missing comment handler: no pathPanel");
		}
	}
	else {
		if (nxComment.missingCommentHandler.pathsWithComment) {
			console.log("Initialize missing comment handler ");
			let pathButtons = document.getElementsByClassName("form-button__title")
			for (let i = 0; i < nxComment.missingCommentHandler.pathsWithComment.length; i++) {
				let currentPath = nxComment.missingCommentHandler.pathsWithComment[i];
				// WEBCON BPS stores a lot of in the initialModel, so lets find the path button by id
				let path = initialModel.paths.filter(item => item.id == currentPath.id);
				if (path) {
					// get the name of the path 
					let pathName = path[0].title;
					for (let y = 0; y < pathButtons.length; y++) {
						// search the pathbutton by name						
						let currentButton = pathButtons[y];
						if (currentButton.textContent == pathName) {
							// register the handler for the button
							$(currentButton).on("click", nxComment.missingCommentHandler.ensureComment);
						}
					}
				}

			}
		}
	}
}