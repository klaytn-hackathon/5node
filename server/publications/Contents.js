Meteor.publish('Contents', function () {
    return Contents.find({});
});