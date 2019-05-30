import {Template} from "meteor/templating";
import {caver} from "../caver.js";
import {ReactiveVar} from "meteor/reactive-var";


Template.signin.helpers({
    pk() {
        return Template.instance().privateKey.get();
    },
});

Template.signin.events({
    "click button[name=signUp]" (evt,tmpl){
        var email    = tmpl.find('input[name=email]').value;
        var password = tmpl.find('input[name=privateKey]').value;
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

                const walletInstance = caver.klay.accounts.privateKeyToAccount(password);
                caver.klay.accounts.wallet.add(walletInstance);
                sessionStorage.setItem("walletInstance",JSON.stringify(walletInstance));
                sessionStorage.setItem("userId", email);

                FlowRouter.go("/asset");
            }
        });
    },
    "click button[name=createPrivateKey]" (evt,tmpl){
        let accounts = caver.klay.accounts.create();
        tmpl.privateKey.set(accounts.privateKey);
        tmpl.klaytnAddress = accounts.address;
    },
    "click [name=copyPrivateKey]" (evt,tmpl){
        tmpl.find('input[name=privateKey]').select();
        document.execCommand("copy");
        alert("클립보드에 복사되었습니다.");
    },
    "click .goLogin" (evt,tmpl){
        tmpl.mode.set("login");
    }
});


Template.signin.onRendered(function() {

})


Template.signin.onCreated(function () {
    this.privateKey = new ReactiveVar("");
    this.klaytnAddress = "";
    this.mode = new ReactiveVar(""); // login | signin
});

Template.signin.onRendered(function () {

});

Template.signin.onDestroyed(function () {

});