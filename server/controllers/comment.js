const { Router } = require('express')
const router = Router()
const CommentService = require('../services/comment')

router.get('/archivecomments/:id', async (req, res)=>{
  console.log("req.params.id",req.params.id)
  const archivecomments = await CommentService.getComments(req.params.id)
  res.send(archivecomments)
})
module.exports = router
