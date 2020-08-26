// 数组去重
function unique(arr) {
  const obj = {}
  return arr.filter(function(item, index, arr) {
    if (typeof item === 'object') {
      const key = JSON.stringify(item)
      return obj.hasOwnProperty(typeof item + key) ? false : (obj[typeof item + key] = true)
    }
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}
// 取 1 ~ 1000 中的质数
function isPrime(num) {
  if ((num >= 2) && (num % 2 === 0)) {
    return false
  }
  const max = Math.sqrt(num) + 1
  for (let i = 3; i <= max; i+=2) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}
function getPrime(sum) {
  let count = 0
  for (let i = 2; i <= sum; i++) {
    if (isPrime(i)) {
      console.log(i + '是质数')
      count++
    }
  }
  console.log('一共有' + count + '个质数')
}
// 冒泡排序
function bubbleSort (arr) {
  let flag = false
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 -i; j++) {
      if (arr[j] > arr[j + 1]) {
        // ES6 解构赋值
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        flag = true
      }
    }
    console.log(`第${i + 1}轮排序完成${flag ? '' : ',排序完成'}`)
    if (!flag) {
      break
    } else {
      flag = false
    }
  }
  console.log(arr)
  return arr
}