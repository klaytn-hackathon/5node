import {Template} from "meteor/templating";


// Template.fundingList.helpers({
//     // counter() {
//     //   return Template.instance().counter.get();
//     // },
// });
//
// Template.fundingList.events({
//     // 'click button'(event, instance) {
//     //   // increment the counter when button is clicked
//     //   instance.counter.set(instance.counter.get() + 1);
//     // },
// });


Template.fundingList.onRendered(function() {

    // Sparkline
    console.log("펀딩리스트 안녕");
})



Template.fundingList.onCreated(function () {
    console.log("펀딩");

});

Template.fundingList.onRendered(function () {

});

Template.fundingList.onDestroyed(function () {

});