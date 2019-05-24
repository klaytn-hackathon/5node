import {Template} from "meteor/templating";


Template.funding.helpers({
    title() {
        return "펀딩"
    }
});
//
// Template.funding.events({
//     // 'click button'(event, instance) {
//     //   // increment the counter when button is clicked
//     //   instance.counter.set(instance.counter.get() + 1);
//     // },
// });

Template.funding.onRendered(function() {

    // Sparkline
    console.log("펀딩페이지 안녕");
})


Template.funding.onCreated(function () {
    console.log("펀딩");

});

Template.funding.onRendered(function () {

});

Template.funding.onDestroyed(function () {

});