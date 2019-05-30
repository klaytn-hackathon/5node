import {Template} from "meteor/templating";


Template.investList.helpers({
	investList(){
		let userId = sessionStorage.getItem("userId");

		return Invest.find({investorId:userId})
	},
});

Template.investItem.helpers({
	checkUpload(contentId, score) {
		let content = Content.findOne({_id: contentId},{});

		return (score == 0 && !!content.ProdFinishDay) ? true : false;
		// return true;
	}
})


Template.investItem.events({
    'click [name="rating"]': function (evt, tmpl) {

    	let score = tmpl.find('input[name=scoreInput_'+this._id+']').value;

		if (score > 10) {
			alert("평점은 10점을 넘을 수 없습니다.");
			return;
		}
		if (score < 3) {
			alert("평점은 최소 3점 이상은 되어야 합니다.");
			return;
		}

		let param = {
			investId: this._id,
			score: score,
		}

		/**
		 [중요]
		 평점을 준 만큼 최종 지분을 가지게 되고,
		 클레이를 돌려받는다.

		 중앙화 시스템에서는 돌아가게 해놨으나,
		 블록체인 쪽에도 내역을 남겨야 한다.

		 */

		Meteor.call('updateToInvestScore', param ,(err,data)=>{
			if(err){
				console.log(err);
				alert('서버에러 => ' + err.error);
			}else{
				console.log(data);
			}
		});

        return undefined;
    }
});


Template.investList.onCreated(function () {
	this.subscribe("InvestList");

});

Template.investList.onRendered(function() {
})


Template.investList.onDestroyed(function () {

});