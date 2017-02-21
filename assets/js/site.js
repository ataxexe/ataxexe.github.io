$(document).ready(function() {
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
    setTimeout(function() {
        $("#alert").css('visibility','visible').hide().fadeIn()
    }, 1000)
});
