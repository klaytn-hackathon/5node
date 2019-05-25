import {Template} from "meteor/templating";
import "/imports/collections";//추가


Template.assetDetail.helpers({
    list(){
        return Content.find({},{});
    }
});


Template.assetDetail.events({

});


Template.assetDetail.onRendered(function() {

})


Template.assetDetail.onCreated(function () {

});

Template.assetDetail.onRendered(function () {

});

Template.assetDetail.onDestroyed(function () {

});