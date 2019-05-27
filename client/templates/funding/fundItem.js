import {Template} from "meteor/templating";

Template.fundItem.helpers({

});


Template.fundItem.events({
    'click div[name=fund-card]' (evt,tmpl){

        // CurrentContent.insert({
        //     FundingFinishDay: this.FundingFinishDay,
        //     ProdFinishDay: this.ProdFinishDay,
        //     contentCreatorId: this.contentCreatorId,
        //     contentDesc: this.contentDesc,
        //     contentFundingFinishDay: this.contentFundingFinishDay,
        //     contentId: this.contentId,
        //     contentInvestKlay: this.contentInvestKlay,
        //     contentInvestorCnt: this.contentInvestorCnt,
        //     contentName: this.contentName,
        //     contentParValue: this.contentParValue,
        //     contentProdCost: this.contentProdCost,
        //     contentReplyList: this.contentReplyList,
        //     contentResourceList: this.contentResourceList,
        //     contentReturn: this.contentReturn,
        //     contentScore: this.contentScore,
        //     contentThumbnail: this.contentThumbnail,
        //     contentTotalSupply: this.contentTotalSupply,
        //     contentUsingCost: this.contentUsingCost,
        //     _id: this._id
        // }, (err) => {
        //     console.log("Mini MongoDb insert fail - "+err);
        //
        // })

        Session.set("CurrentContentId",this._id);
        FlowRouter.go("/fundDetailPage");


        // window.location.href = "/fundDetailPage";

    },

});


Template.fundItem.onRendered(function() {

})


Template.fundItem.onCreated(function () {

});

Template.fundItem.onDestroyed(function () {

});