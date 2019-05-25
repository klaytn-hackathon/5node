import {Template} from "meteor/templating";


Template.assetItem.helpers({

});


Template.assetItem.events({
    'click div[name=asset-card]' (evt,tmpl){

        console.log("카드 클릭");
        window.location.href = "/assetDetail";

    }
});


Template.assetItem.onRendered(function() {

})


Template.assetItem.onCreated(function () {

});

Template.assetItem.onRendered(function () {

});

Template.assetItem.onDestroyed(function () {

});