Meteor.publish('ContentList', function () {
    return Content.find({});
});