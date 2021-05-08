$(document).ready(
    $("#normalViewButton").click(
        function (event){
            event.preventDefault(); // important, keeps on the same page

            $.post(
                $("#normalView").attr("action"),
                "normalView",
                function (info){
                    $("#bookDiv").html(
                        info
                    ); // add result to the span with id result
                }
            )
        }
    )
);

$(document).ready(
    $("#groupedViewButton").click(
        function (event){
            event.preventDefault();

            $.post(
                $("#groupedView").attr("action"),
                "groupedView",
                function (info){
                    $("#bookDiv").html(
                        info
                    ); // add result to the span with id result
                }
            )
        }
    )
);