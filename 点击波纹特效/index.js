// 默认颜色
const DEFAULT_COLOR = 'rgba(0, 152, 255, 0.78)'


// document.getElementById('ripple').onclick
function clickRipple (event, color) {
  console.log(event, color)
  const el = event.toElement
  // const target = event.target
  const top = event.layerY || event.offsetY
  const left = event.layerX || event.offsetX

  // console.log(top, left)

  const ripple = document.createElement('div')
  ripple.setAttribute('class', 'ripple-animation')
  ripple.style.left = left + 'px'
  ripple.style.top = top + 'px'
  ripple.style.backgroundColor = color || DEFAULT_COLOR
  // console.log(ripple.style.top)

  el.appendChild(ripple)

  setTimeout(() => {
    el.removeChild(ripple)
  }, 400)
}
