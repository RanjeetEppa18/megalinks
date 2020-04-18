const { Router } = require('express')
const router = Router()
const ArchiveService = require('../services/archive')

router.get('/archives/:searchterm', async (req, res) => {
  const searchTerm = req.params.searchterm
  const allArchives = await ArchiveService.read(searchTerm)
  res.send(allArchives)
})
module.exports = router
