// app.js
const { login } = require('./actions/mina/user')

App({
  onLaunch() {
    this.login()
  },

  login() {
    // check token
    if (this.globalData.accessToken) return

    // 登录
    wx.login({
      success: async ({code}) => {
        const { errMsg, data } = await login({ code })
        if (errMsg !== 'request:ok') return wx.showToast({
          title: errMsg,
        })

        if (data.errMsg !== 'SUCCESS') return wx.showToast({
          title: data.errMsg,
        })

        // keep the token for global use
        this.globalData.accessToken = data.data
      }
    })
  },

  globalData: {
    accessToken: null,
    userInfo: null,
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
  }
})
