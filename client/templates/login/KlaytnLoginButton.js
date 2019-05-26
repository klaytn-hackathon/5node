/*

   meteor npm install --save caver-js

* */

import {Template} from "meteor/templating";
import {ReactiveVar} from "meteor/reactive-var";
import Caver from 'caver-js';
import "./KlaytnLoginButton.html";

caver = new Caver({rpcURL : 'http://api.baobab.klaytn.net:8651'});

Meteor.startup(function(){
   const walletFromSession = sessionStorage.getItem("walletInstance");
   if(walletFromSession){
       try{
            caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
       }catch(e){
            sessionStorage.removeItem("walletInstance");
       }
   }
});

Template.KlaytnLoginButton.helpers({
    pk() {
        return Template.instance().privateKey.get();
    },
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

Template.KlaytnLoginButton.onCreated(function klaytnLoginOnCreated() {
    this.privateKey = new ReactiveVar("");
    this.klaytnAddress = "";
    this.mode = new ReactiveVar(""); // login | signin
});

Template.KlaytnLoginButton.onRendered(function klaytnLoginOnCreated() {


});


Template.KlaytnLoginButton.events({
    "click .goLogin" (evt,tmpl){ tmpl.mode.set("login"); }
    ,
    "click .goSignin" (evt,tmpl){ tmpl.mode.set("signin"); }
    ,
    "click .KlaytnLogOutButton" (evt,tmpl){
        Meteor.logout();
        caver.klay.accounts.wallet.clear();
        sessionStorage.removeItem("walletInstance");
    }
    ,
    "click .KlaytnLoginButton" (evt,tmpl){
        if(tmpl.mode.get()==""){
            return tmpl.mode.set("login");
        }else{
            return tmpl.mode.set("");
        }
    }
    ,
    "click input[name=createPrivateKey]" (evt,tmpl){
        let accounts = caver.klay.accounts.create();
        tmpl.privateKey.set(accounts.privateKey);
        tmpl.klaytnAddress = accounts.address;
    }    ,
    "click input[name=copyPrivateKey]" (evt,tmpl){
        tmpl.find('input[name=password]').select();
        document.execCommand("Copy");
        alert("클립보드에 복사되었습니다.");
    }
    ,
    "click button[name=signUp]" (evt,tmpl){
        var email    = tmpl.find('input[name=email]').value;
        var password = tmpl.find('input[name=password]').value;
        var name     = tmpl.find('input[name=name]').value;
        if(!password) {
            alert("패스워드를 확인하세요");
            return;
        }

        var klaytnAddress = tmpl.klaytnAddress;

        var userInfo = { email, password, profile : { name ,klaytnAddress} };

        Accounts.createUser(userInfo,function(error){
            if(!!error){
                alert(error.reason);
            }else{
                alert("가입 성공");
                $(tmpl.findAll('input')).val("");

                Meteor.loginWithPassword(email,password,function(error){
                    if(!error){
                        Meteor.logoutOtherClients();
                        //todo 클레이튼연결하기
                    }else{
                        alert(error.reason);
                    }
                });
            }
        });
    }
    ,
    "click button[name=login]" (evt,tmpl){

        ttt = tmpl;
        var email    = tmpl.find('input[name=loginEmail]').value;
        var password = tmpl.find('input[name=loginPassword]').value;

        Meteor.loginWithPassword(email,password,function(error){
            if(!error){
                Meteor.logoutOtherClients();
                $(tmpl.findAll('input')).val("");

                //todo 클레이튼연결하기
                const walletInstance = caver.klay.accounts.privateKeyToAccount(password);
                caver.klay.accounts.wallet.add(walletInstance);
                sessionStorage.setItem("walletInstance",JSON.stringify(walletInstance));

            }else{
                alert(error.reason);
            }
        });
    }
});
