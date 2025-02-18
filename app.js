// app.js
const { login } = require('./actions/mina/user')

App({
  onLaunch() {

    // 登录
    wx.login({
      success: async ({code}) => {
        const res = await login({ code })
        console.log(111, code, res)

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
  }
})
