const getComments = (Comment) => async (id) => {
  try {
    const comments = await Comment.find({ submission: id }).sort({ score: -1 })
    return comments
  } catch (error) {
    console.log('ERROR', error)
  }
}

module.exports = (Comment) => {
  return {
    getComments: getComments(Comment),
  }
}
