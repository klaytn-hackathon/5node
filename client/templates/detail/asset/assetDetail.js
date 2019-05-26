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
		console.log(content.contentTag)
		return content.contentTag
	}
});


Template.assetDetail.events({
	'click #use-asset': () => {
		console.log('button clicked!')
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