  // Thanks to https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/
  // https://codepen.io/chriscoyier/pen/VvRoWy
function resize () {

//    const windowWidth = window.innerWidth
//    var contentMaxWidth = windowWidth <= 600 ? 100 : ()
  

  var contents = document.getElementsByClassName('content')
  if (contents.length == 0) return; // return if there's no contents yet
  // const defaultContentWidth = 333.33 // Pixels value of .content width % multiplied by .main max-width
  const defaultContentWidth = 323
  const contentWidth = contents[0].offsetWidth
  console.log('width: ' + contentWidth)
  const scale = contentWidth / defaultContentWidth

  var elems1 = document.getElementsByClassName('resizer')
  for (var i in elems1) {
    //if (elems1[i].style) elems1[i].style.transform = 'scale(' + scale + ')'
    //console.log(elems1[i])
    //console.log(elems1[i].style)
    console.log('dancc')
  }
  console.log('scaling: ' + scale)
    //document.getElementById(INPUT_DIV).style.transform = 'translate(-50%, -50%) ' + 'scale(' + scale + ')'
    //document.getElementById(TOP_DIV).style.transform = 'scale(' + scale + ')'
}



window.addEventListener('resize', resize)
window.addEventListener('load', resize)
