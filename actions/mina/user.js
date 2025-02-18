const { req } = require('../../utils/util')

async function login(obj) {
  const res = await req('/login', {
    method: 'post',
    data: obj,
  }, false)
  return res
}

async function getQa(obj) {
  const res = await req('/qa', {
    method: 'post',
    data: obj,
  })
  return res
}

module.exports = {
  login, getQa,
}