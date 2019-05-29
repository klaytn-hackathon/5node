Meteor.publish('ContentList', function () {
    return Content.find({});
});

Meteor.publish('ContentById', function () {
    return Content.findOne({_id: this._id});
});

Meteor.publish('CreatedList', function () {
    return Content.find({});
});