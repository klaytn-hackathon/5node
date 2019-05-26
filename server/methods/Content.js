import {Meteor} from "meteor/meteor";

Meteor.methods({
    getContentById(content_id){
        if(!content_id){
            throw new Meteor.Error("입력값이 없습니다");
        }

        return Content.findOne({_id: content_id});
    },
});

