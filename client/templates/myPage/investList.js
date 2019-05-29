import {Template} from "meteor/templating";


Template.investList.helpers({
	investList(){
		// let userId = sessionStorage.getItem("userId");
		let userId = "charles@gmail.com";

		return Invest.find({investorId:userId})
	},
	checkUpload(contentId, score) {
		let content = Content.findOne({_id: contentId}, {});

		// return !content.ProdFinishDay && score == 0 ? true : false;
		return true;
	}
});


Template.investList.events({
    'click [name="rating"]': function (evt, tmpl) {

    	let score = tmpl.find('input[name=scoreInput]').value;

		//if() 기존과 동일한 별점 return false;

        // get 별점 (별점 10 점만점)e.target.value

		console.log("check - ", score);
		console.log("this._id - ", this._id);

		let param = {
			investId: this._id,
			score: score,
		}

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

Template.investList.onRendered(function() {
	this.subscribe("InvestList");
})


Template.investList.onCreated(function () {
});

Template.investList.onRendered(function () {

});

Template.investList.onDestroyed(function () {

});