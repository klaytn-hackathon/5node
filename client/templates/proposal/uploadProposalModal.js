import {Template} from "meteor/templating";

const inputElem = '<input type="text" class="form-control" placeholder=""/>';
const inputArr = [Spacebars.SafeString(inputElem)];
let hashtagCount = 1;

Template.uploadProposalModal.helpers({
    hashTagsCount : []
});


Template.uploadProposalModal.events({
    'click .hashtag-add-btn' (e, d) {
        hashtagCount++;
        //추가버튼 누르면 input element 추가되개ㅔ 처리 필요.
        for (var i = 0, str = ''; i < hashtagCount; i++) {
            str = str + `<input type="text" class="hashtag form-control" placeholder=""/>`;
        }
        $('.hashtags-wrapper').html(str);
    },
    'submit #proposalForm' (e) {
        e.preventDefault();

    },


    //파일 업로드 value 구현

    'change input[data-proposal="thumbnail"]' : (e,t) => {
        const filename = e.target.value;

        $(e.target).next('.custom-file-label').html(filename);
    }

});


Template.uploadProposalModal.onRendered(function() {

})


Template.uploadProposalModal.onCreated(function () {

});

Template.uploadProposalModal.onRendered(function () {

});

Template.uploadProposalModal.onDestroyed(function () {

});