// logs.js
const { sleep } = require('../../utils/util')
const { getQa } = require('../../actions/mina/user')

Page({
  data: {
    qa: [],
    logo: getApp().globalData.defaultAvatarUrl,
    currentIndex: 0,
    currentTip: '',
    current: null,
    canClick: false,
  },

  onLoad() {
    this.getQa().then(() => this.play())
  },

  async getQa() {
    try {
      const { errMsg, data } = await getQa()
      if (errMsg !== 'request:ok') return wx.showToast({
        title: errMsg,
      })
      if (data.errMsg !== 'SUCCESS') return wx.showToast({
        title: data.errMsg,
      })

      this.setData({ qa: data.data.result })
      console.log(this.data.qa[0])
    } catch (error) {
      console.log(error)
      wx.showToast({
        title: error,
      })
    }
  },

  async play() {
    const current = this.data.qa[this.data.currentIndex]
    if (!current) return

    this.setData({ current, canClick: false })
    await this.say(current.key)
    if (current.tips) {
      await sleep(1000)
      await this.say('<br><br>')
      await this.say(current.tips)
    }
    await sleep(1000)
    this.setData({ canClick: true })
  },

  async say(text, period = 50) {
    const textArr = text.split('')
    await Promise.all(
      textArr.map(async (i, k) => {
        await sleep(period * k)
        this.setData({ currentTip: this.data.currentTip + i })
      })
    )
  },

  async getGps() {
    // mock
    const { currentIndex, qa } = this.data
    // 北京大致纬度范围：39.4°N - 41.6°N
    let latitude = (Math.random() * 2.2) + 39.4;
    // 北京大致经度范围：115.7°E - 117.4°E
    let longitude = (Math.random() * 1.7) + 115.7;
    qa[currentIndex].value = [latitude, longitude]
    this.setData({ qa })

    wx.showToast({
      title: '模拟拿到gps定位，真实接口需要申请',
      icon: 'none',
      duration: 3000
    })

    // wx.getLocation({
    //   kind: 'gcj02',
    //   success (res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 18
    //     })
    //   }
    //  })

     await sleep(2000)
     this.next()
  },

  onInputChange(e) {
    const value = e.detail.value
    const { currentIndex, qa } = this.data
    qa[currentIndex].value = value
    this.setData({ qa })
  },

  async next() {
    const currentIndex = this.data.currentIndex + 1 
    if (currentIndex >= this.data.qa.length) {
      return console.log(this.data.qa)
      wx.showLoading({
        title: '开始匹配',
      })

      await sleep(2000)
      wx.hideLoading()
      wx.showToast({
        title: '匹配成功！',
        icon: 'success'
      })

      await sleep(1000)
      wx.navigateTo({
        url: '../room/room',
      })

      return
    }
    this.setData({ currentIndex, currentTip: '', canClick: false })
    this.play()
  }

})
