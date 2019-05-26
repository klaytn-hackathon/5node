Meteor.publish('ContentList', function () {
    return Content.find({});
});

Meteor.publish('CreatedList', function () {
    return Content.find({});
});