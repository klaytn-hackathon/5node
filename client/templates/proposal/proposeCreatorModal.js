import {Template} from "meteor/templating";


Template.proposeCreatorModal.helpers({
    career() {
        return OnlyMini.findOne({key: "career"});
    }
});


Template.proposeCreatorModal.events({
    "click button[name=submitBtn]" (evt,tmpl){
        let job = tmpl.find('input[name=job]').value;
        let desc = tmpl.find('textarea[name=desc]').value;
        let careerList = OnlyMini.findOne({key: "career"}).careerList;

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

        let param = {
            job: job,
            desc: desc,
            careerList: careerList,
            creatorName: Meteor.user().profile.name
        }


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

        tmpl.find('input[name=career]').text("");

    }

});


Template.proposeCreatorModal.onCreated(function () {

});

Template.proposeCreatorModal.onRendered(function () {

});

Template.proposeCreatorModal.onDestroyed(function () {

});