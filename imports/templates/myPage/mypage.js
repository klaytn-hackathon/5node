import {Template} from "meteor/templating";


// Template.mypage.helpers({
//     title() {
//         return "마이페이지"
//     }
// });
//
// Template.mypage.events({
//     // 'click button'(event, instance) {
//     //   // increment the counter when button is clicked
//     //   instance.counter.set(instance.counter.get() + 1);
//     // },
// });


Template.mypage.onRendered(function() {

    console.log("마이페이지 안녕");
})


Template.mypage.onCreated(function () {
    console.log("마이페이지");
});

Template.mypage.onRendered(function () {

});

Template.mypage.onDestroyed(function () {

});