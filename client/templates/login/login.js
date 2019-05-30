import {Template} from "meteor/templating";
import {ReactiveVar} from "meteor/reactive-var";
import {caver} from "../caver.js";

Template.login.helpers({
    signinMode(){
        return Template.instance().mode.get()=="signin";
    },
    loginMode(){
        return Template.instance().mode.get()=="login";
    },
    currentUserName(){
        return Meteor.user().profile.name;
    }
});

Template.login.events({
    "click button[name=login]" (evt,tmpl){

        var email    = tmpl.find('input[name=loginEmail]').value;
        var password = tmpl.find('input[name=loginPassword]').value;

        Meteor.loginWithPassword(email,password,function(error){
            if(!error){
                Meteor.logoutOtherClients();
                $(tmpl.findAll('input')).val("");

                //todo 클레이튼연결하기
                const walletInstance = caver.klay.accounts.privateKeyToAccount(password);
                caver.klay.accounts.wallet.add(walletInstance);
                sessionStorage.setItem("pk", password);
                sessionStorage.setItem("walletInstance",JSON.stringify(walletInstance));
                sessionStorage.setItem("userId", email);

                FlowRouter.go("/");

            } else {
                alert(error.reason);
            }
        });
    },
    "click .KlaytnLoginButton" (evt,tmpl){
        if(tmpl.mode.get()==""){
            return tmpl.mode.set("login");
        }else{
            return tmpl.mode.set("");
        }
    },
    "click .KlaytnLogOutButton" (evt,tmpl){
        Meteor.logout();
        caver.klay.accounts.wallet.clear();
        sessionStorage.removeItem("walletInstance");
    },
    "click .goSignin" (evt,tmpl){
        tmpl.mode.set("signin");
    }
});


Template.login.onRendered(function() {

})


Template.login.onCreated(function () {
    this.privateKey = new ReactiveVar("");
    this.klaytnAddress = "";
    this.mode = new ReactiveVar(""); // login | signin
});

Template.login.onRendered(function () {

});

Template.login.onDestroyed(function () {

});
