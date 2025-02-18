const { HOST, MINA } = require('./constant')

function req(path, obj, auth = true) {
  const header = {
    'content-type': 'application/json'
  }

  if (auth) {
    try {
      const token = wx.getStorageSync('accessToken')
      header['authorization'] = token
    } catch (error) {
      console.log(error)
      return
    }
  }
   
  return new Promise((resove, reject) => {
    wx.request({
      url: `${HOST}${MINA}${path}`,
      header,
      success: res => resove(res),
      fail: err => reject(err),
      ...obj,
    })
  })
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}


module.exports = {
  formatTime, sleep, req
}
