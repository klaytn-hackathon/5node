import {Template} from "meteor/templating";


Template.asset.helpers({
    title() {
        return "에셋"
    }
});
//
// Template.asset.events({
//     // 'click button'(event, instance) {
//     //   // increment the counter when button is clicked
//     //   instance.counter.set(instance.counter.get() + 1);
//     // },
// });

Template.asset.onRendered(function() {
})



Template.asset.onCreated(function () {
    this.subscribe("postList");

});

Template.asset.onRendered(function () {

});

Template.asset.onDestroyed(function () {

});