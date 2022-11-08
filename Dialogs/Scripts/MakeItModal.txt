<style>
.top-bar-header,
.ms-promotedActionButton-text
{ display:none;}

.redux-toastr { display:none;}
</style>

<script>
$(document).ready(function(){
   setTimeout(addCancelButton,100)
});

function addCancelButton() {
    if ($(".ms-promotedActionButton-text").length == 1) {
        console.log('Make it Modal');
        $(".ms-promotedActionButton-text").hide();
        $el = $(".pathPanelRow").prepend($(".path-button-container").first().wrapAll('<div>').parent().html());
        $(".pathPanelButton:first").attr("style", "background-color: rgb(0, 0, 70);")
        $(".pathPanelButton:first").attr("value",'Abbrechen')
        $(".pathPanelButton:first .form-button__title").text('Abbrechen')
        $(".pathPanelButton:first").click(function(){parent.nxbps.modal.closeDlg(1)})
        return;
    }
   setTimeout(addCancelButton,100);
}
</script>
