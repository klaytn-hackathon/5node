import {Template} from "meteor/templating";

const inputElem = '<input type="text" class="form-control" placeholder=""/>';
const inputArr = [Spacebars.SafeString(inputElem)];
let hashTagCount = 1;
let hashTagList = [];

Template.uploadProposalModal.helpers({
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
});


Template.uploadProposalModal.events({

    //hashtag 저장
    'click .save_hastag' (e, t) {
        const $inputEle = $(e.target).prev('input')[0];
        const val = $inputEle.value;
        hashTagList.push(val);

        $('.hashtags-wrapper .created').append(`<span class="hashtag">#${val}</span>`);

        $inputEle.value = '';
    },

    //파일 업로드

    'change input[data-proposal="thumbnail"]' (e,t) {
        const filename = e.target.value;

        $(e.target).next('.custom-file-label').html(filename);
    },
    //submit
    'submit #proposalForm' (e) {
        e.preventDefault();
        const thumbnail = $('input[data-proposal="thumbnail"]')[0].files[0];
        const title = $('input[name="title"]')[0].value;
        const issuePrice = $('input[name="issuePrice"]')[0].value;
        const issueCount = $('input[name="issueCount"]')[0].value;
        const description = $('textarea[name="description"]')[0].value;

        const data = {
            hashTagList,
            thumbnail,
            title,
            issuePrice,
            issueCount,
            description
        }
        console.log(data);
    },


});


Template.uploadProposalModal.onRendered(function() {

})


Template.uploadProposalModal.onCreated(function () {

});

Template.uploadProposalModal.onRendered(function () {

});

Template.uploadProposalModal.onDestroyed(function () {

});