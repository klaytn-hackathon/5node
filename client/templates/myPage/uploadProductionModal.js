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
    'submit form[data-production="form"]': async (e,t) => {
        e.preventDefault();
		const thumbnail = $('#productionThumbnail')[0].files[0];
		const thumbnailreader = new FileReader();
		var thumbnailBinary = [];
		var subimageBinary = [];
		thumbnailreader.onload = await function (e){
			thumbnailBinary.push(thumbnailreader.result)
		};
		await thumbnailreader.readAsDataURL(thumbnail);
		subFileList.forEach(element => {
			const subimagereader = new FileReader();
			subimagereader.onload = function(e){
				subimageBinary.push(subimagereader.result)
			}
			subimagereader.readAsDataURL(element)
		});
		console.log(thumbnailBinary)
		console.log(subimageBinary);
	}
});


Template.uploadProductionModal.onRendered(function() {

})


Template.uploadProductionModal.onCreated(function () {

});

Template.uploadProductionModal.onRendered(function () {

});

Template.uploadProductionModal.onDestroyed(function () {

});