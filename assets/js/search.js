full_engine = lunr(function () {
  this.field('title', { boost: 10 })
  this.field('tags', { boost: 8 })
  this.field('excerpt', { boost: 5 })
  this.field('category')
  this.field('date')
  this.ref('url')
});

tag_engine = lunr(function () {
  this.field('tags')
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
        tag_engine.add(this)
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
full_search = function (term, callback) {
  search(term, full_engine, callback)
}
tag_search = function (tag, callback) {
  search(tag, tag_engine, callback)
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
    info = $("<ul class='post-info'><li><span><i class='fa fa-calendar'></i> " + entry['date'] + " </span></li>" +
      "<li><span><i class='fa fa-caret-right'></i> " + entry['category'] + "</span></li></ul>")
    p = $("<p class='list-group-item-text result-excerpt'>" + entry['excerpt'] + "</p>")
    $("<a href='" + entry['url'] + "' class='list-group-item'>")
        .append(title, info, p)
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
  full_search(term)
})
$("#search-input").keydown(function (event) {
  var ENTER = 13
  if (event.keyCode == ENTER) {
    term = $(this).val()
    full_search(term)
  }
}).focus(load_index)

$(".post-tag").click(function () {
  tag_search($(this).text(), scroll_up)
})
