import {Template} from "meteor/templating";


Template.fundItem.helpers({

});


Template.fundItem.events({
    'click div[name=fund-card]' (evt,tmpl){

        console.log("카드 클릭");
        window.location.href = "/mypage";

    }
});


Template.fundItem.onRendered(function() {

})


Template.fundItem.onCreated(function () {

});

Template.fundItem.onRendered(function () {

});

Template.fundItem.onDestroyed(function () {

});