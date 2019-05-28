import {Template} from "meteor/templating";


Template.fundingList.helpers({
    list(){
        return Content.find({},{});
    }
});


Template.fundingList.events({

});


Template.fundingList.onCreated(function () {
    this.subscribe("contentList");
});

Template.fundingList.onRendered(function () {

});

Template.fundingList.onDestroyed(function () {

});