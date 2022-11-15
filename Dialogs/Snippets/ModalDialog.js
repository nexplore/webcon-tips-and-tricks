<script>
	window.nxbps = window.nxbps || {};
	nxbps.modal = nxbps.modal || {};
	nxbps.modal.dlgCloseOptions = nxbps.modal.dlgCloseOptions || {
		close: 1,
		closeEdit: 2
	}

	nxbps.modal.popupWindow= null;
	nxbps.modal.onClosing = null;
	nxbps.modal.openUrl = function(title, url, height) {
		document.getElementById('iframe').src = url;
		document.getElementById('nxModalTitle').innerText = title;
		$("#Modals").html($("#NxModal").html());
		if (height != undefined) {
			$(".modal-window").height(height);
		}
		$("#Modals .close > button").click(function() {
			nxbps.modal.closeDlg();
		});
	}

	nxbps.modal.closeDlg = function(closeAction, param1, param2) 
	{
		if (closeAction != undefined) {
		   if (closeAction == nxbps.modal.dlgCloseOptions.close) {
				if (typeof nxbps.modal.onClosing === "function") {
					nxbps.modal.onClosing(closeAction, param1, param2)
				}
		   }
		   else 
		   if (closeAction == nxbps.modal.dlgCloseOptions.closeEdit) {
				$("#Modals").html("");
			   var url = '/api/nav/db/1/element/' + param1 + '/attachments/' + param2 + '/edit?withRedirect=true';
			   console.log(url);
			   window.location = url;
		   }
		   else {
				$("#Modals").html("")
		   }
		}
		$("#Modals").html("");
		$("#ReloadToolbarButton").click();
	}
</script>