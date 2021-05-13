const contextPath = document.querySelector("script").getAttribute("contextPath");
console.log(contextPath)
// const puzzleUrl = contextPath + '/puzzle';
const puzzleUrl = '/Lab09/puzzle';

$(document).ready(function(){
    let prevId = null;
    $('.puzzle_piece').click(function() {
        let id = $(this).attr("id");
        if(prevId == null) {
            prevId = id;
        }
        else {
            $.ajax({
                url: puzzleUrl,
                type: "PUT",
                data: {
                    "id1": id,
                    "id2": prevId
                },
                success: function() {
                    window.location = window.location.pathname;
                }
            });
            prevId = null;
        }
    });

});
