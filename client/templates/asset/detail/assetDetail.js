import {Template} from "meteor/templating";
import "/imports/collections";//추가
import {caver, provider} from "../../caver";
import config from "../../../contracts/config.json"; 
import {ethers} from "ethers";
var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};

Template.assetDetail.helpers({
	title(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		return content.contentName
	},
    resourceList(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
        return content.contentResourceList
	},
	thumbnail(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		return content.contentThumbnail
	},
	description(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		return content.contentDesc
	},
	publishedat(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		return content.ProdFinishDay.toDateString()
	},
	tags(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		return content.contentTag
	},
	score(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		var score = content.contentScore
		var out = ''
		for(var i = 0; i < 5; i++){
			if (score >= 20){
				out += '<span class="fa fa-star"></span>'
				score -= 20
			} else if (score >= 10) {
				out += '<span class="fa fa-star-half-o"></span>'
				score -= 10
			} else {
				out += '<span class="fa fa-star-o"></span>'
			}
		}
		return Spacebars.SafeString(out)
	},
	scoreNum(){
		var id = getQueryString('id')
		var content = Content.findOne({_id: id})
		return content.contentScore
	}
});


Template.assetDetail.events({
	'click button[name=assetUseBtn]': (evt, tmpl) => {

		let id = getQueryString('id')
		let content = Content.findOne({_id: id});
		// let userId = sessionStorage.getItem("userId");
		let userId = sessionStorage.getItem("userId");


		if (content.contentCreator.userId == userId) {
			alert("제작자는 자신의 작품의 사용하기 기능을 이용하실 수 없습니다.");
			return;
		}
		// let pk = sessionStorage.getItem("pk");
		// const walletInstance = caver.klay.accounts.privateKeyToAccount(pk);
        // caver.klay.accounts.wallet.add(pk);
		// let wallet = new ethers.Wallet(pk);
		
		// let amount = ethers.utils.parseEther('3.0');

		// caver.klay.sendTransaction({
		// 	type: 'VALUE_TRANSFER',
		// 	from: caver.klay.accounts.wallet[0].address,
		// 	to: config.BasicPurchaseModule,
		// 	gas: '300000',
		// 	value: caver.utils.toPeb('3', 'KLAY'),
		// });

		let param = {
			contentId: content._id,
			userId: userId,
			contentName: content.contentName,
			usedKlay: content.contentUsingCost,
			paidAt: new Date()
		}

		Meteor.call('useContent', param ,(err,data)=>{
			if(err){
				console.log(err);
				alert('서버에러 => ' + err.error);

			}else{
				console.log(data);
				if (data > 0) {
					alert("3 Klay를 소진하여 해당 컨텐츠를 구매완료 하셨습니다.");
				} else {
					alert("구매 완료 된 건이 없습니다.");
				}
			}
		});

	}
});


Template.assetDetail.onRendered(function() {
})


Template.assetDetail.onCreated(function () {
});

Template.assetDetail.onRendered(function () {

});

Template.assetDetail.onDestroyed(function () {

});