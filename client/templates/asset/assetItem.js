import {Template} from "meteor/templating";


Template.assetItem.helpers({
    prodFinishAt(timestamp) {
        return moment(timestamp).format("YYYY-MM-DD");
    },
});


Template.assetItem.events({
    'click div[name=asset-card]' (evt,tmpl){

        window.location.href = "/assetDetail?id=" + tmpl.data._id;

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