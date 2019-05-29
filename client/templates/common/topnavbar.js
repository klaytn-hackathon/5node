import {Template} from "meteor/templating";
import "/imports/collections";//추가
import '../login/login.js';


Template.topnavbar.helpers({
    currentUserName(){
        return Meteor.user().profile.name;
    }
});


Template.topnavbar.events({
    "click .KlaytnLogOutButton" (evt,tmpl){

        console.log("Come in");
        console.log(Meteor.user().profile.name);

        Meteor.logout();
        caver.klay.accounts.wallet.clear();
        sessionStorage.removeItem("walletInstance");
    }
});

Template.topnavbar.onCreated(function () {

});

Template.topnavbar.onRendered(function () {

});

Template.topnavbar.onDestroyed(function () {

});