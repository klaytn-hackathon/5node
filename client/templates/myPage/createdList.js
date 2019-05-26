import {Template} from "meteor/templating";


Template.createdList.helpers({
    list(){
        return Content.find({},{});
    }
});

Template.createdList.events({
    'click button[name=c-modal]' (evt,tmpl){

        console.log("modal id check - ", this._id);
        Session.set("editItem",this._id);
    },

});


Template.createdList.onRendered(function() {

})


Template.createdList.onCreated(function () {
    this.subscribe("contentList");

    // $('#exampleModal').on('show.bs.modal', function (event) {
    //     var button = $(event.relatedTarget) // Button that triggered the modal
    //     var recipient = button.data('whatever') // Extract info from data-* attributes
    //     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    //     var modal = $(this)
    //     modal.find('.modal-title').text('New message to ' + recipient)
    //     modal.find('.modal-body input').val(recipient)
    // })
});

Template.createdList.onRendered(function () {

});

Template.createdList.onDestroyed(function () {

});

