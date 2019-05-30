import {Template} from "meteor/templating";


Template.commentList.helpers({
});


Template.commentList.events({
    'click button[name=commentBtn]'(evt, tmpl) {
        alert("해당 기능은 구현되지 않았습니다.");
    }
});


Template.commentList.onCreated(function () {
});

Template.commentList.onRendered(function () {

});

Template.commentList.onDestroyed(function () {

});