import {Template} from "meteor/templating";


Template.fundingList.helpers({
    list(){
        return Content.find({},{});
    }
});


Template.fundingList.events({

});


Template.fundingList.onRendered(function() {

    // Sparkline
    console.log("펀딩리스트 안녕 ");
})


Template.fundingList.onCreated(function () {
    console.log("펀딩");

});

Template.fundingList.onRendered(function () {

});

Template.fundingList.onDestroyed(function () {

});