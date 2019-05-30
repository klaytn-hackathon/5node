import {Meteor} from "meteor/meteor";

Meteor.methods({
    getContentById(content_id){
        if(!content_id){
            throw new Meteor.Error("입력값이 없습니다");
        }

        return Content.findOne({_id: content_id});
    },
    insertContentProposal(proposal) {
        if (!proposal) {
            throw new Meteor.Error("업로드할 데이터가 없습니다.");
        }

        const USAGE_FEE = 3;

        proposal.investedStock = 0;
        proposal.investedKlay = 0;
        proposal.contentInvestorCnt = 0;
        proposal.purchaceModuleAddr = "";
        proposal.investModuleAddr = "";
        proposal.distributeModuleAddr = "";

        return Content.insert(proposal)
    }
});

