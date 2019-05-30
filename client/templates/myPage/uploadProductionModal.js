import {Template} from "meteor/templating";
const subFileList = [];


Template.uploadProductionModal.helpers({
    hashTagsCount : [{}]
});


Template.uploadProductionModal.events({

    //썸네일 파일 업로드
    'change input[data-production="thumbnail"]' : (e,t) => {
        const filename = e.target.value;

        $(e.target).next('.custom-file-label').html(filename);
    },
    //서브이미지 여러개 파일 업로드
    'change input[data-production="subImage"]' : (e,t) => {
        const filename = e.target.value;
        //$(e.target).value = '';

        subFileList.push($(e.target)[0].files[0]);

        // e.target.files = null;
        console.dir(subFileList);


        for (var i = 0, str = ''; i < subFileList.length; i++) {
            str = str + `<li>${subFileList[i].name}</li>`;
        }
        $('.sub-files').html(str);
    },
    'submit form[data-production="form"]': async(e,t) => {
		e.preventDefault();
		const thumbnail = $('#productionThumbnail')[0].files[0];
		var thumbnailBinary = [];
		var subimageBinary = [];
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
		thumbnailBinary = await readFileAsync(thumbnail)
		for (var i =0; i < subFileList.length; i++){
			var bin = await readFileAsync(subFileList[i])
			subimageBinary.push(bin)
		}
		result = {$set:{contentStatus: '완료',contentThumbnail: thumbnailBinary, contentResourceList: subimageBinary,ProdFinishDay: new Date()}}
		Content.update({_id: Session.get("uploadItem")}, result)
		location.reload()
	}
});



Template.uploadProductionModal.onCreated(function () {

});

Template.uploadProductionModal.onRendered(function () {

});

Template.uploadProductionModal.onDestroyed(function () {

});