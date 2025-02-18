const { req } = require('../../utils/util')

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