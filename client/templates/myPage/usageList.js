import {Template} from "meteor/templating";


Template.usageList.helpers({

});

Template.usageList.events({

});


Template.usageList.onRendered(function() {

})


Template.usageList.onCreated(function () {
});

Template.usageList.onRendered(function () {

});

Template.usageList.onDestroyed(function () {

});



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