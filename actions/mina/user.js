const HOST = 'http://localhost:30000'
const MINA = '/api/mina'

function req(path, obj, auth = true) {
  const header = {
    'content-type': 'application/json'
  }

  if (auth) {
    try {
      const token = wx.getStorageSync('accessToken')
      header['Authorization'] = token
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

async function login(obj) {
  const res = await req('/login', {
    method: 'post',
    data: obj,
  }, false)
  return res
}

module.exports = {
  login,
}