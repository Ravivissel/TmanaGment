$(document).on('click', "#taskPage", function () {

    getAllTasks(getAllTasksCB, getAllTasksError);

    //// Swipe to remove list item
    //$(document).on("swipeleft swiperight", "#list li", function (event) {
    //    var listitem = $(this),
    //        // These are the classnames used for the CSS transition
    //        dir = event.type === "swipeleft" ? "left" : "right",
    //        // Check if the browser supports the transform (3D) CSS transition
    //        transition = $.support.cssTransform3d ? dir : false;
    //    confirmAndDelete(listitem, transition);
    //});
    //// If it's not a touch device...
    //if (!$.mobile.support.touch) {
    //    // Remove the class that is used to hide the delete button on touch devices
    //    $("#list").removeClass("touch");
    //    // Click delete split-button to remove list item
    //    $(".delete").on("click", function () {
    //        var listitem = $(this).parent("li");
    //        confirmAndDelete(listitem);
    //    });
    //}
    //function confirmAndDelete(listitem, transition) {
    //    // Highlight the list item that will be removed
    //    listitem.children(".ui-btn").addClass("ui-btn-active");
    //    // Inject topic in confirmation popup after removing any previous injected topics
    //    $("#confirm .topic").remove();
    //    listitem.find(".topic").clone().insertAfter("#question");
    //    // Show the confirmation popup
    //    $("#confirm").popup("open");
    //    // Proceed when the user confirms
    //    $("#confirm #yes").on("click", function () {
    //        // Remove with a transition
    //        if (transition) {
    //            listitem
    //                // Add the class for the transition direction
    //                .addClass(transition)
    //                // When the transition is done...
    //                .on("webkitTransitionEnd transitionend otransitionend", function () {
    //                    // ...the list item will be removed
    //                    listitem.remove();
    //                    // ...the list will be refreshed and the temporary class for border styling removed
    //                    $("#list").listview("refresh").find(".border-bottom").removeClass("border-bottom");
    //                })
    //                // During the transition the previous button gets bottom border
    //                .prev("li").children("a").addClass("border-bottom")
    //                // Remove the highlight
    //                .end().end().children(".ui-btn").removeClass("ui-btn-active");
    //        }
    //        // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
    //        else {
    //            listitem.remove();
    //            $("#list").listview("refresh");
    //        }
    //    });
    //    // Remove active state and unbind when the cancel button is clicked
    //    $("#confirm #cancel").on("click", function () {
    //        listitem.children(".ui-btn").removeClass("ui-btn-active");
    //        $("#confirm #yes").off();
    //    });
    //}

});

function renderTasks(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $("#list").empty();
    $.each(results, function (i, row) {
        dynamicLi =
            '<li class="ui-li-has-alt">' +
            '<a href="" data-id="' + row.Id + '">' +
            '<h3>' + row.Title + '</h3>' +
            '<p class="topic"><strong>' + row.Created_by.First_name + '>אלי</strong></p>' +
            '<p>' + row.Start_date + '</p>' +
            '<p class="ui-li-aside"><strong>' + row.End_date + '</strong></p>' +
            '</a>' +
            '</li>';
        $('#list').append(dynamicLi);
        //$('#list').listview('refresh');
    });
}

function getAllTasksCB(results) {

    renderTasks(results);

}

function getAllTasksError(error) {

    console.log(error);
}

//DatePicker end_date
jQuery('#end_date').datepicker({
    toggleActive: true,
    clearBtn: true,
    autoclose: true,
    format: 'dd/mm/yyyy'
});