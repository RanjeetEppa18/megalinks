const { Router } = require('express')
const router = Router()
const ArchiveService = require('../services/archive')

router.get('/archives', async (req, res) => {
  // console.log("test")
  const allArchives = await ArchiveService.read()
  res.send(allArchives)
})
module.exports = router
