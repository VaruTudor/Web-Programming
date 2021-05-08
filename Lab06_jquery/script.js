(() => {
    // set colors
    let colors = [
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#2ab7ca',
        '#fed766',
        '#f6abb6',
        '#e7eff6',
        '#009688',
        '#63ace5',
        '#65c3ba',
        '#fdf498',
        '#bbbbbb'
    ];
    document.querySelectorAll(".slide").forEach(
        (item) => {
            let random_color = colors[Math.floor(Math.random() * colors.length)];
            item.style.color = random_color;
        }
    )
})()


$(".slide").each(function(i) {
    // loop through all slides (divs of class slide)
    let currentSlide = $(this);
    let itemClone = currentSlide.clone();  // create a clone for each div
    currentSlide.data("clone", itemClone); // attach data to the parent div
    let currentSlidePosition = currentSlide.position(); // take the position in the current slide
    itemClone
        .css({
            left: currentSlidePosition.left,
            top: currentSlidePosition.top,
            visibility: "hidden"
        })  // make itemClone stay on the same position as currentSlide
        .attr("data-pos", i+1); // set data-pos value to i+1

    $("#cloned-slides").append(itemClone);  // we add all the clone *as a child) to the div (class cloned-slides)
});

$(".all-slides").sortable({
    // we initiate the sortable method on the div holding actual slides (divs of class slide)
    axis: "y",
    revert: true,
    scroll: false,
    placeholder: "sortable-placeholder",
    cursor: "move",

    start: function(e, ui) {
        ui.helper.addClass("exclude-me");   // we add the class exclude-me to the helper so that we don't hide it
        // the helper is a clone of ui.item which fills the void left when dragging
        $(".all-slides .slide:not(.exclude-me)")
            .css("visibility", "hidden");   // hide all slides (but the helper)
        ui.helper.data("clone").hide(); // hide the matching elements
        $(".cloned-slides .slide").css("visibility", "visible");    // we make the clones visible
    },

    stop: function(e, ui) {
        $(".all-slides .slide.exclude-me").each(function() {
            let currentSlide = $(this);
            let clone = currentSlide.data("clone"); // take the clone
            let position = currentSlide.position(); // take the it's position when we remove the click


            clone.css("left", position.left);
            clone.css("top", position.top);
            clone.show();

            currentSlide.removeClass("exclude-me"); // remove exclude-me from the slides
        });

        $(".all-slides .slide").each(function() {
            let currentSlide = $(this);
            let clone = currentSlide.data("clone"); // take the clone

            clone.attr("data-pos", currentSlide.index());   // change data-pos attribute so clones
            // have the same index as the slide
        });

        // swap the visibility (clones->hidden, slides->visible)
        $(".all-slides .slide").css("visibility", "visible");
        $(".cloned-slides .slide").css("visibility", "hidden");
    },

    // here's where the magic happens
    change: function(e, ui) {
        $(".all-slides .slide:not(.exclude-me)").each(function() {
            let currentSlide = $(this);
            let clone = currentSlide.data("clone");  // take the clone
            clone.stop(true, false);
            let position = currentSlide.position(); // take the current position

            // transition the clone
            clone.animate({
                left: position.left,
                top: position.top
            }, 200);
        });
    }

});