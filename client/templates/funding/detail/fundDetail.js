import {Template} from "meteor/templating";
// import memont from "moment";


Template.fundDetail.helpers({
    content() {
        return Content.findOne({_id: Session.get("CurrentContentId")},{});
    },
    fundPercent() {
        let content = Content.findOne({_id: Session.get("CurrentContentId")},{});
        let percent = Math.floor(content.investedStock / content.contentTotalSupply * 100)

        return isNaN(percent) ? 0 : percent;
    },
    creator() {
        let id = Session.get("CurrentContentId");
        let creatorId = Content.findOne({_id: id},{}).contentCreator.userId;

        return User.findOne({userId: creatorId})
    },
    topThreeContentList() {
        let id = Session.get("CurrentContentId");
        let creatorId = Content.findOne({_id: id},{}).contentCreator.userId;

        return Content.find({"contentCreator.userId": creatorId, contentStatus:"완료"},{limit:3});
    },

});

Template.topThreeTmpl.helpers({
    dateSet(timestamp) {
        return moment(timestamp).fromNow();
    }
})

//invest-btn
Template.fundDetail.events({
    "click button[name=investBtn]" (evt,tmpl){

        let klayVal = parseInt(tmpl.find('input[name=investVal]').value);
        let stockVal = parseInt(tmpl.find('input[name=stockVal]').value);
        let content = Content.findOne({_id: Session.get("CurrentContentId")},{});


        if (klayVal == "" || klayVal == 0) {
            alert("투자할 클레이를 입력해 주세요");
            return;
        }

        if (content.contentTotalSupply <
            content.investedKlay + klayVal) {

            console.log(content.contentTotalSupply);
            console.log(content.investedKlay + klayVal);

            alert("더이상 투자를 하실 수 없습니다.");
            return;
        }

        let param = {
            contentId: content._id,
            investorId: sessionStorage.getItem("userId"),
            investorWalletAddr: sessionStorage.getItem("userId"),
            contentName: content.contentName,
            parValue: content.contentParValue,
            shareNum: stockVal,
            klayVal: klayVal,
            sharePer: Math.floor(stockVal / content.contentTotalSupply * 100),
        }

        Meteor.call('investToContent', param ,(err,data)=>{
            if(err){
                console.log(err);
                alert('서버에러 => ' + err.error);
            }else{
                console.log(data);
            }
        });
    },
    "keyup input[name=stockVal]" (evt,tmpl) {
        let content = Content.findOne({_id: Session.get("CurrentContentId")},{});

        if (evt.currentTarget.value < 0) {
            alert("최소 1주는 신청하셔야 합니다.");
            return;
        }

        $('input[name="investVal"]').val(evt.currentTarget.value * content.contentParValue);
    }
});


Template.fundDetail.onCreated(function () {

    let instance = this;

    instance.subscribe("ContentById");
});

Template.fundDetail.onRendered(function() {

})

Template.fundDetail.onDestroyed(function () {

});