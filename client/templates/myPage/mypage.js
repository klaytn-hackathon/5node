import {Template} from "meteor/templating";


// Template.mypage.helpers({
//     title() {
//         return "마이페이지"
//     }
// });
//
// Template.mypage.events({
//     // 'click button'(event, instance) {
//     //   // increment the counter when button is clicked
//     //   instance.counter.set(instance.counter.get() + 1);
//     // },
// });


Template.mypage.onRendered(function() {

    console.log("마이페이지 안녕");
})


Template.mypage.onCreated(function () {
    console.log("마이페이지");

    // Material Design example
    $(document).ready(function () {
        $('#dtMaterialDesignExample').DataTable();
        $('#dtMaterialDesignExample_wrapper').find('label').each(function () {
            $(this).parent().append($(this).children());
        });
        $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('input').each(function () {
            $('input').attr("placeholder", "Search");
            $('input').removeClass('form-control-sm');
        });
        $('#dtMaterialDesignExample_wrapper .dataTables_length').addClass('d-flex flex-row');
        $('#dtMaterialDesignExample_wrapper .dataTables_filter').addClass('md-form');
        $('#dtMaterialDesignExample_wrapper select').removeClass(
            'custom-select custom-select-sm form-control form-control-sm');
        $('#dtMaterialDesignExample_wrapper select').addClass('mdb-select');
        $('#dtMaterialDesignExample_wrapper .mdb-select').materialSelect();
        $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();
    });
});

Template.mypage.onRendered(function () {

});

Template.mypage.onDestroyed(function () {

});