import {Template} from "meteor/templating";


Template.fundingList.helpers({
    list(){
        return Content.find({},{});
    }
});


Template.fundingList.events({
    'click button[name=fund-card]' (evt,tmpl){

        console.log("카드 클릭");
    }
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