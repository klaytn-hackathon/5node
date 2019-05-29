import {Template} from "meteor/templating";
import "/imports/collections";//추가

var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};

Template.assetDetail.helpers({
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
		let userId = "charles@gmail.com";

		let param = {
			contentId: content._id,
			userId: userId,
			contentName: content.contentName,
			usedKlay: 3,
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