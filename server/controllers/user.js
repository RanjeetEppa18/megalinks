const { Router } = require('express')
const router = Router()
const UserService = require('../services/user')

router.post('/user', async (req, res) => {
  const user = await UserService.save()
  res.send(user)
})

module.exports = router
