import {Meteor} from "meteor/meteor";

Meteor.methods({
    investToContent(row){
        if(!row){
            throw new Meteor.Error("입력값이 없습니다");
        }

        let investedRow =  Invest.findOne({investorId: row.investorId});

        let content =  Content.findOne({_id: row.contentId});
        let investorCnt = content.contentInvestorCnt;
        let investedKlay = parseInt(content.investedKlay);
        let investedStock = parseInt(content.investedStock);
        let boughtStock = parseInt(row.shareNum);
        let addedKlay = parseInt(row.klayVal);

        // 컨텐츠 데이터 최신화 (투자받은 Klay, 투자된 주식 수)
        let set = {};
        set.investedKlay = investedKlay + addedKlay;
        set.investedStock = investedStock + boughtStock;


        if (!investedRow) {
            // 기존 투자 내역 없음
            investorCnt++;
            set.contentInvestorCnt = investorCnt;
        }

        // 투자내역 입력
        Invest.insert(row);

        // 컨텐츠에 투자자 수 입력
        return Content.update({_id: row.contentId}, {$set:set});
    },
    updateToInvestScore(row) {
        if(!row){
            throw new Meteor.Error("입력값이 없습니다");
        }
        if(row.score > 10) {
            throw new Meteor.Error("평점은 10점 이상을 넘으실 수 없습니다.");
        }
        if(row.score < 3) {
            throw new Meteor.Error("평점은 최소 3점 이상을 주셔야 합니다.");
        }

        // sharePer: Math.floor(stockVal / content.contentTotalSupply * 100),

        let investRow = Invest.findOne({_id: row.investId});

        const FINAL_REMAIN_PERCENT = row.score / 10;
        let finalShareNum = Math.floor(investRow.shareNum * FINAL_REMAIN_PERCENT);
        let finalKlayVal = Math.floor(investRow.klayVal * FINAL_REMAIN_PERCENT);


        let set = {};
        set.score = row.score;
        set.shareNum = finalShareNum;
        set.klayVal = finalKlayVal;

        return Invest.update({_id: row.investId}, {$set:set});

    }
});