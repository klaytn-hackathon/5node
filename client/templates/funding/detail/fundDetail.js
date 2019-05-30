import {Template} from "meteor/templating";
import {provider, caver} from "../../caver";
import {ethers} from "ethers";
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
//해당 투자 모듈에 투자해야한다.
Template.fundDetail.events({
    "click button[name=investBtn]" (evt,tmpl){

        // [블록체인 연결 부분 잠시 주석]
        // let provider = new ethers.providers.JsonRpcProvider('https://api.baobab.klaytn.net:8651');
        //사용자의 PK 삽입
        // let wallet = new ethers.Wallet("0x1dde70afec54d1616f7ea4cd8af161ac3745b1f04d022c592dacf5234bc8aed4", provider);
        //DB상의 해당 프로덕트의 투자 모듈 가져오기 
        let investModuleAddr = "0xf78546a6fc64ef2cd9f84b71f5f0ec662c16277c";
        let klayVal = parseInt(tmpl.find('input[name=investVal]').value);
        let stockVal = parseInt(tmpl.find('input[name=stockVal]').value);
        let content = Content.findOne({_id: Session.get("CurrentContentId")},{});

        // [블록체인 연결 부분 잠시 주석]
        // let transaction = {
        //     to: investModuleAddr,
        //     value: ethers.utils.parseEther(klayVal)
        // };

        if (klayVal == "" || klayVal == 0) {
            alert("투자할 클레이를 입력해 주세요");
            return;
        }

        if (content.contentTotalSupply <
            content.investedStock + stockVal) {

            alert("더이상 투자를 하실 수 없습니다.");
            return;
        }

        // [블록체인 연결 부분 잠시 주석]
        // // Send the transaction
        // let sendTransactionPromise = wallet.sendTransaction(transaction);
        //
        // sendTransactionPromise.then((tx) => {
        //    console.log("get result : ",tx);
        // })
        // .once('receipt', (receipt) => {
        //     alert(
        //         'status : ', receipt.status, 'link : ', receipt.transactionHash
        //     );
        // })
        // .once('error', (error) => {
        //     alert(
        //         'status : error / messsages : ', error.toString()
        //     );
        // });
        
        
        let param = {
            contentId: content._id,
            investorId: sessionStorage.getItem("userId"),
            investorWalletAddr: sessionStorage.getItem("userId"),
            contentName: content.contentName,
            parValue: content.contentParValue,
            shareNum: stockVal,
            klayVal: klayVal,
            score: 0,
        }

        Meteor.call('investToContent', param ,(err,data)=>{
            if(err){
                console.log(err);
                alert('서버에러 => ' + err.error);
            }else{
                if (data > 0) {
                    alert("투자한 KLAY 수 - " + klayVal + "/n" +
                            "보유하게 된 STOCK 수 " + stockVal);
                }
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