// 页面渲染完成后执行js
window.onload = () => {
  // 后退按钮实例
  const prev = document.getElementById('prev')

  // 前进按钮实例
  const next = document.getElementById('next')

  // 轮播图实例
  const slides = document.getElementsByClassName('slide-item')

  let currentIndex = 0

  // 轮播切换时间
  let interval = 5000
  // 是否开启自动播放
  let autoPlay = true
  // 图片切换方向 true 下一张 false 上一张
  let forward = true
  // 是否切换过图片，用于防止点击后立马自动切换
  let switchFlag = false

  next.addEventListener('click', () => {
    switchFlag = true
    handleNext()
  })
  prev.addEventListener('click', () => {
    switchFlag = true
    handlePrev()
  })

  // 定时切换
  function autoSwith () {
    if (autoPlay) {
      setInterval(() => {
        if (!switchFlag) {
          forward ? handleNext() : handlePrev()
        }
        switchFlag = false
      }, interval)
    }
  }
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

  // 执行自动播放
  autoSwith()
}
