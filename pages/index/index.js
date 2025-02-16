// index.js
const { sleep } = require('../../utils/util')
const TXT1 = '你好呀，我是你的AI助手比翼，我希望有一个机会可以让北京的男生女生，在安全的情况下，快速见面互动~（提供一键报警+免费法律援助服务）'
const TXT2 = '请先填写一下交友问卷，我会定期推荐异性给你，希望你们在72小时内见面。超过72小时未见，就会自动解除匹配哈，有任何需要请直接@我~'
const TIP = '你好，Ta 想看你的头像&昵称'

Page({
  data: {
    logo: getApp().globalData.defaultAvatarUrl,
    hi: '',
    userInfo: {
      avatarUrl: getApp().globalData.defaultAvatarUrl,
      nickName: '',
    },
    showQABtn: false,
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },

  onLoad() {
    this.play()
  },

  async play() {
    await this.say(TXT1)
    await sleep(1000)
    await this.say('<br><br>')
    await this.say(TXT2)
    await sleep(1000)
    this.setData({ showQABtn: true })
  },

  async say(text, period = 50) {
    const textArr = text.split('')
    await Promise.all(
      textArr.map(async (i, k) => {
        await sleep(period * k)
        this.setData({ hi: this.data.hi + i })
      })
    )
  },
  

  bindViewTap() {
    wx.navigateTo({
      url: '../qa/qa'
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
