import {Template} from "meteor/templating";


Template.fundDetail.helpers({
    content() {
        return Content.findOne({_id: Session.get("CurrentContentId")},{});
    },
});

Template.fundDetail.events({

});


Template.fundDetail.onCreated(function () {
    this.subscribe("Content");
});

Template.fundDetail.onRendered(function() {

})

Template.fundDetail.onDestroyed(function () {

});