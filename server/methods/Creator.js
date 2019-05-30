import {Meteor} from "meteor/meteor";

Meteor.methods({
    addCreator(param){
        if (!param){
            throw new Meteor.Error("입력값이 없습니다");
        }
        if (!param.job) {
            throw new Meteor.Error("직업을 입력하세요");
        }
        if (!param.desc) {
            throw new Meteor.Error("자기소개를 입력하세요");
        }
        if (!param.careerList) {
            throw new Meteor.Error("경력사항을 입력하세요");
        }


        return Meteor.users.update(Meteor.userId(), {$set: {profile: param}});
    },
});