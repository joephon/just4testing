// pages/room.js

const TXT = '你好呀有风！发现一位三里屯"钉子户"金金小姐姐，和你在宇宙中心完美重叠！她每天靠咖啡续命的样子像极了在乐成大厦加班的你，科技+金融的组合堪称脑力值双A搭档。INTJ和ENTJ的理性CP连MBTI都写着般配，虽然她吃辣能力能秒杀你的安徽基因，但毕竟爱情需要点反差萌嘛~同城1小时生活圈已就位，咖啡因CP不考虑面基解锁新地图？'
const { sleep } = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: TXT,
    pic: '../images/girl.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  bindtap() {
    wx.showModal({
      title: '后面就是聊天界面拉',
      content: 'To be continued ....',
      complete: async (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          wx.showToast({
            title: '2s 后即将重载...',
            icon: 'none',
            duration: 2000,
          })
          await sleep(2000)
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    })
  }
})