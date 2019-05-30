import {Template} from "meteor/templating";


Template.proposeCreatorModal.helpers({
    career() {
        return OnlyMini.findOne({key: "career"});
    }
});


Template.proposeCreatorModal.events({
    "click button[name=submitBtn]" : async function(evt,tmpl){
        let job = tmpl.find('input[name=job]').value;
        let desc = tmpl.find('textarea[name=desc]').value;
        let careerList = OnlyMini.findOne({key: "career"}).careerList;

        let thumbnail = $('#userThumbnail')[0].files[0];


        if (!job) {
            alert("직업을 입력하세요.");
            return;
        }
        if (!desc) {
            alert("자기소개를 입력하세요.");
            return;
        }
        if (!careerList) {
            alert("경력사항을 입력하세요.");
            return;
        }

        const thumbnailBinary = await readFileAsync(thumbnail);

        let param = {
            job: job,
            desc: desc,
            careerList: careerList,
            name: Meteor.user().profile.name,
            creatorThumbnail: thumbnailBinary,
            klaytnAddress: Meteor.user().profile.klaytnAddress
        }

        console.log();


        Meteor.call("addCreator", param ,(err,data)=> {
            if(err){
                console.log(err);
                alert('서버에러 => ' + err.error);
            }else{

                alert("제작자가 되신걸 축하힙니다.");
            }
        })

        $('#proposeCreatorModal').modal('hide');
    },

    "click button[name=careerBtn]" (evt,tmpl){
        let career = tmpl.find('input[name=career]').value;
        let careerObj = OnlyMini.findOne({key: "career"});

        if (!careerObj) {
            OnlyMini.insert({key: "career", careerList: [career]});

        } else {
            careerObj.careerList.push(career);
            let set = {};

            set.careerList = careerObj.careerList;

            OnlyMini.update({key: "career"},{$set: set})
        }

        $('input[name=career]').val("").focus();

    }

});


Template.proposeCreatorModal.onCreated(function () {

});

Template.proposeCreatorModal.onRendered(function () {

});

Template.proposeCreatorModal.onDestroyed(function () {

});

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