import {Template} from "meteor/templating";
import {caver} from "../caver.js";

Template.signin.helpers({
    pk() {
        return Template.instance().privateKey.get();
    },
});

Template.signin.events({
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
    },
    "click buttion[name=createPrivateKey]" (evt,tmpl){
        let accounts = caver.klay.accounts.create();
        tmpl.privateKey.set(accounts.privateKey);
        tmpl.klaytnAddress = accounts.address;


        console.log(tmpl)
    }    ,
    "click [name=copyPrivateKey]" (evt,tmpl){
        tmpl.find('input[name=password]').select();
        document.execCommand("Copy");
        alert("클립보드에 복사되었습니다.");
    },
    "click .goLogin" (evt,tmpl){
        tmpl.mode.set("login");
    }
});


Template.signin.onRendered(function() {

})


Template.signin.onCreated(function () {
});

Template.signin.onRendered(function () {

});

Template.signin.onDestroyed(function () {

});