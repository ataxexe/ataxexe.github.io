full_engine = lunr(function () {
  this.field('title', { boost: 4 })
  this.field('tags', { boost: 2 })
  this.field('category')
  this.field('date')
  this.field('language')
  this.ref('url')
});

index_loaded = false
search_entries = null

load_index = function (callback) {
  if (!index_loaded) {
    input = $(this)
    input.attr("placeholder", "Loading...")
    $("#search-input").attr("disabled", "disabled")

    $.getJSON("/search.json", function (data) {
      search_entries = data
      $.each(search_entries, function () {
        full_engine.add(this)
      })
      index_loaded = true
      input.attr("placeholder", "Search...")
      $("#btn-search, #search-input").removeAttr("disabled")
      if (callback) {
        callback()
      }
    })
  }
}
search = function (term, engine, callback) {
  if (index_loaded) {
    finish(engine.search(term), callback)
  } else {
    load_index(function () {
      search(term, engine, callback)
    })
  }
}
search_posts = function (term, callback) {
  search(term, full_engine, callback)
}

finish = function (result, callback) {
  $("#search-result").empty()
  if (result.length == 0) {
    $("<div class='alert alert-danger'>" +
        "<strong>No post was found!</strong>" +
        "</div>").appendTo("#search-result")
  }
  $.each(result, function () {
    index = this['ref']
    entry = search_entries[index]
    title = $("<h3 class='list-group-item-heading result-title'>" + entry['title'] + "</h3>")
    info = $("<ul class='post-info'><li><span><i class='fa fa-calendar'></i> " + entry['date'] +
      " </span></li>" + "<li><span><i class='fa fa-caret-right'></i> " + entry['category'] +
      "</span></li>" + "<li><img src=\"/assets/images/lang/" + entry['language'] + ".svg\"></li>" +
      "</ul>")
    $("<a href='" + entry['url'] + "' class='list-group-item'>")
        .append(title, info)
        .appendTo("#search-result")
  })
  $("#search-result").show("slow")
  $("#content").hide("slow")
  $("#btn-clear-search").show()
  if (callback) {
    callback()
  }
}
cancel_search = function () {
  $("#search-result").hide("slow")
  $("#content").show("slow")
  $(this).hide()
}
scroll_up = function () {
  $("html, body").animate({ scrollTop: 0 }, 1000)
}

$("#btn-search").attr("disabled", "disabled")
$("#btn-clear-search").click(cancel_search)
$("#btn-search").click(function () {
  term = $("#search-input").val()
  search_posts(term)
})
$("#search-input").keydown(function (event) {
  var ENTER = 13
  if (event.keyCode == ENTER) {
    term = $(this).val()
    search_posts(term)
  }
}).focus(load_index)
