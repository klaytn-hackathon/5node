import {Meteor} from "meteor/meteor";

Meteor.methods({
    useContent(row){
        if(!row){
            throw new Meteor.Error("입력값이 없습니다");
        }

        let usageRow =  Usage.findOne({userId: row.userId, contentName: row.contentName});

        if(usageRow) {
            throw new Meteor.Error("이미 사용한 내역이 있습니다.");
        }

        // 사용내역 입력
        Usage.insert(row);

        let content =  Content.findOne({_id: row.contentId});

        let set = {};
        set.contentReturn = parseInt(content.contentReturn) + parseInt(row.usedKlay);

        // 컨텐츠에 투자수익 입력
        return Content.update({_id: row.contentId}, {$set:set});
    },
});