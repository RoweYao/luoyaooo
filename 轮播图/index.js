// 后退按钮实例
const prev = document.getElementById('prev')

// 前进按钮实例
const next = document.getElementById('next')

// 轮播图实例
const slides = document.getElementsByClassName('slide-item')

let currentIndex = 0

next.addEventListener('click', handleNext)
prev.addEventListener('click', handlePrev)

// 下一张图片
function handleNext () {
  let current = slides[currentIndex]
  current.classList.remove('current')

  currentIndex++
  if (currentIndex >= slides.length) {
    currentIndex = 0
  }

  slides[currentIndex].classList.add('current')
}

// 上一张图片
function handlePrev () {
  let current = slides[currentIndex]
  current.classList.remove('current')

  currentIndex--
  if (currentIndex < 0) {
    currentIndex = slides.length - 1
  }

  slides[currentIndex].classList.add('current')
}