import {Template} from "meteor/templating";


Template.assetList.helpers({
    title() {
        return "에셋 목록"
    }
});


Template.assetList.onRendered(function() {

    // Sparkline
    console.log("에셋리스트 안녕");
})

// Template.assetList.events({
//     // 'click button'(event, instance) {
//     //   // increment the counter when button is clicked
//     //   instance.counter.set(instance.counter.get() + 1);
//     // },
// });


Template.assetList.onCreated(function () {
    console.log("에셋");

});

Template.assetList.onRendered(function () {

});

Template.assetList.onDestroyed(function () {

});