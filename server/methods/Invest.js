import {Meteor} from "meteor/meteor";

Meteor.methods({
    investToContent(row){
        if(!row){
            throw new Meteor.Error("입력값이 없습니다");
        }

        let investedRow =  Invest.findOne({investorId: row.investorId});

        // 투자내역 입력
        Invest.insert(row);

        let content =  Content.findOne({_id: row.contentId});
        let investorCnt = content.contentInvestorCnt;
        let investedKlay = parseInt(content.investedKlay);
        let InvestedStock = parseInt(content.InvestedStock);
        let boughtStock = parseInt(row.shareNum);
        let addedKlay = parseInt(row.klayVal);

        let set = {};
        set.investedKlay = investedKlay + addedKlay;
        set.InvestedStock = InvestedStock + boughtStock;

        if (investedRow.investorId !== row.investorId) {
            investorCnt++
            set.contentInvestorCnt = investorCnt;
        }

        // 컨텐츠에 투자자 수 입력
        return Content.update({_id: row.contentId}, {$set:set});
    },
    updateToInvestScore(row) {
        if(!row){
            throw new Meteor.Error("입력값이 없습니다");
        }
        let set = {};
        set.score = row.score

        return Invest.update({_id: row.investId}, {$set:set});

    }
});