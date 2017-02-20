THEMES = {
  'dark' : '/assets/css/bootstrap-dark.css',
  'light' : '/assets/css/bootstrap-light.css'
}

set_theme = function(theme) {
  cssFile = THEMES[theme]
  if(cssFile) {
    localStorage.setItem("theme", theme)
    var css = document.createElement('link')
    css.setAttribute('rel', 'stylesheet')
    css.setAttribute('href', cssFile)
    css.setAttribute('type', 'text/css')
    document.head.appendChild(css)
    return true
  }
  return false
}

if(!set_theme(localStorage.getItem("theme"))) {
  set_theme('dark')
}
