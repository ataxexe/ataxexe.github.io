phrases = [
    "Error occurred successfully",
    "Null is null or is not an object",
    "An internal error occurred while showing an internal error",
    "An error occurred while displaying the previous error",
    "No error occurred",
    "Keyboard error, press F1 to continue",
    "Catastrophic failure",
    "Failure while failing"
]

$(document).ready(function () {
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
    setTimeout(function () {
        $("#alert-description").text(phrases[Math.floor((Math.random() * phrases.length))])
        $("#alert").css('visibility', 'visible').hide().fadeIn()
    }, 1000)
});
