import {Template} from "meteor/templating";
import "/imports/collections";//추가


Template.assetList.helpers({
    list(){
        return Content.find({},{});
    }
});


Template.assetList.events({

});


Template.assetList.onRendered(function() {

})


Template.assetList.onCreated(function () {
    this.subscribe("contentList");
});

Template.assetList.onRendered(function () {

});

Template.assetList.onDestroyed(function () {

});