import {Template} from "meteor/templating";


Template.assetItem.helpers({
    titleImg() {
        return  Content.findOne({_id: Session.get("CurrentContentId")},{})
    }
});


Template.assetItem.events({
    'click div[name=asset-card]' (evt,tmpl){

        console.log(tmpl.data._id);
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