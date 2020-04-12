const { Router } = require('express')
const router = Router()
const UserService = require('../services/user')

router.post('/saveUser', async ({ body }, res, next) => {
  try {
    const user = await UserService.save(body)
    if (user) {
      res.json(user)
      return
    } else {
      throw new Error('User exists!')
    }
  } catch (error) {
    console.log('ERROR')
    next(error)
  }
})

router.post('/login', async ({ body }, res, next) => {
  try {
    const user = await UserService.login(body)
    if (user) {
      console.log('USER')
      res.json(user)
    } else {
      throw new Error('User doesnt exists!')
    }
    return
  } catch (error) {
    console.log('ERROR')
    next(error)
  }
})

module.exports = router
