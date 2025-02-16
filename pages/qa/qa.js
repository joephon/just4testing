// logs.js
const { sleep } = require('../../utils/util.js')

const qa = [
  { key: '经常去哪玩？', value: '', tips: '写商圈吧，或者什么滑雪场都行（如三里屯、南山滑雪场）', type: 'gps' /* text, gps */ },
  { key: '在哪块工作？', value: '', tips: '比如某个写字楼，某个地铁站附近', type: 'gps'},
  { key: '住在哪块？', value: '', tips: '考虑女生安全，不用写得太具体；男生自便', type: 'gps'},
  { key: '你的性别', value: '', tips: '', type: 'text'},  // male, female
  { key: '哪年出生呢？', value: '', tips: '', type: 'text'},
  { key: '你的身高', value: '', tips: '单位：厘米', type: 'text'},
  { key: '你的体重', value: '', tips: '单位：公斤', type: 'text'},
  { key: '老家哪呢？', value: '', tips: '写省/市/区县都可以', type: 'text'},
  { key: '工作行业', value: '', tips: '如：金融、时尚、待业、学生等', type: 'text'},
  { key: 'MBTI', value: '', tips: '不知道填星座也行', type: 'text'},
  { key: '吸烟与否', value: '', tips: '烟民之间，优先匹配', type: 'text'}, // 吸烟，不吸烟
  { key: '喝咖啡频率', value: '', tips: '咖友之间，优先匹配', type: 'text'}, // 每天（经常）， 偶尔， 从不
  { key: '吃辣情况', value: '', tips: '辣党之间，优先匹配', type: 'text'}, // 无辣不欢，一般般，我服了！一点都吃不了！！！
]

Page({
  data: {
    qa,
    logo: getApp().globalData.defaultAvatarUrl,
    currentIndex: 0,
    currentTip: '',
    current: null,
    canClick: false,
  },

  onLoad() {
    this.play()
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
    wx.showToast({
      title: '模拟拿到gps定位，真实接口需要申请',
      icon: 'none',
      duration: 3000
    })


    // wx.getLocation({
    //   type: 'gcj02',
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
    if (currentIndex >= qa.length) {
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
