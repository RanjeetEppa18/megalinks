const { Router } = require('express')
const router = Router()
const user = require('./user')
const archive = require('./archive')
const comment = require('./comment')

router.use(user)
router.use(archive)
router.use(comment)

router.use((req, res, next) => {
  res.status(404).json({ error: 'not found' })
})

router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

module.exports = router
