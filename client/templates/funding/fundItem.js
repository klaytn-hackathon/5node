import {Template} from "meteor/templating";

Template.fundItem.helpers({
    dDay() {
        let content = Content.findOne({_id: this._id},{})

        let countDownDate = new Date(content.FundingFinishDay).getTime();
        let now = new Date().getTime();
        let distance = countDownDate - now;

        return Math.floor(distance / (1000 * 60 * 60 * 24));
    },
    fundPercent(investedStock, contentTotalSupply) {
        let percent = Math.floor(investedStock / contentTotalSupply * 100)

        return isNaN(percent) ? 0 : percent;
    },
});


Template.fundItem.events({
    'click div[name=fund-card]' (evt,tmpl){

        Session.set("CurrentContentId",this._id);
        FlowRouter.go("/fundDetailPage");
    },

});

Template.fundItem.onCreated(function () {
    this.subscribe("contentList");

});

Template.fundItem.onRendered(function() {

})

Template.fundItem.onDestroyed(function () {

});
