import {Template} from "meteor/templating";
import "/imports/collections";//추가
import '../login/login.js';
import {caver} from "../caver.js";



Template.topnavbar.helpers({
    currentUserName(){
        return Meteor.user().profile.name;
    },
    isCreator(){
        return !Meteor.user().profile.job ? true : false;
    }
});


Template.topnavbar.events({
    "click .KlaytnLogOutButton" (evt,tmpl){

        console.log("Come in");
        console.log(Meteor.user().profile.name);

        Meteor.logout();
        caver.klay.accounts.wallet.clear();
        sessionStorage.removeItem("walletInstance");

        FlowRouter.go("/");
    },
    'click button[name=c-modal]' (evt,tmpl){

        console.log("modal id check - ", this._id);
        Session.set("editItem",this._id);
    },
});

Template.topnavbar.onCreated(function () {

});

Template.topnavbar.onRendered(function () {

});

Template.topnavbar.onDestroyed(function () {

});