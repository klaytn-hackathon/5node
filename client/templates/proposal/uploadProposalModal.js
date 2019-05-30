import {Template} from "meteor/templating";
import {provider} from "../caver";
import {ethers} from "ethers";
import {BigNumber} from "bignumber.js";
import regigstryABI from "../../contracts/ABI/SigStockRegistryABI.json";
import config from "../../contracts/config.json";
const inputElem = '<input type="text" class="form-control" placeholder=""/>';
const inputArr = [Spacebars.SafeString(inputElem)];
let hashTagCount = 1;
let hashTagList = [];

let sigStockReigstry = new ethers.Contract(config.SigStockRegistry, regigstryABI, provider);
let depPK ="0x84ecb3a575cc6d50170b71fb6d6d76c9ad6e1de402a7adb5f5243ef92c2e5e2c";
let wallet = new ethers.Wallet(depPK, provider);
 
console.log(1, sigStockReigstry);
let contractWithSigner = sigStockReigstry.connect(wallet);
    
    console.log(contractWithSigner); 
    let n = new BigNumber(1e+18);
    n = n * 1200;
    contractWithSigner.createProduct("모나리자","눈썹없는그림",n,n).then((err,res)=>{
        console.log(321, res);
    })

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
    'submit #proposalForm': async function (e) {
        e.preventDefault();
		const thumbnail = $('#proposalThumbnail')[0].files[0];
		const thumbnailreader = new FileReader();
		function readFileAsync(file) {
			return new Promise((resolve, reject) => {
			  let reader = new FileReader();

			  reader.onload = () => {
				resolve(reader.result);
			  };

			  reader.onerror = reject;

			  reader.readAsDataURL(file);
			})
		  }
		const thumbnailBinary = await readFileAsync(thumbnail);
        const title = $('input[name="title"]')[0].value;
        const issuePrice = $('input[name="issuePrice"]')[0].value;
        const issueCount = $('input[name="issueCount"]')[0].value;
		const description = $('textarea[name="description"]')[0].value;
		const userId = sessionStorage.getItem("userId");

        const data = {
			contentStatus: '진행중',
            contentTag: hashTagList,
            contentThumbnail: thumbnailBinary,
            contentName:title,
            contentParValue: issuePrice,
            contentTotalSupply: issueCount,
			contentDesc: description,
			contentCreater:{
				userId: userId
			}
		}
		Content.insert(data);
		alert('업로드 되었습니다!')
		location.reload();
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