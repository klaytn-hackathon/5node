import {Template} from "meteor/templating";


Template.investList.helpers({
	invests(){
		console.log(Invest.find({}).fetch())
		return Invest.find({})
	}
});

Template.investList.events({

});

Template.investList.events({
    'click [name="rating"]': function (e) {
        //if() 기존과 동일한 별점 return false;

        // get 별점 (별점 10 점만점)e.target.value

        return undefined;
    }
});

Template.investList.onRendered(function() {

})


Template.investList.onCreated(function () {
});

Template.investList.onRendered(function () {

});

Template.investList.onDestroyed(function () {

});