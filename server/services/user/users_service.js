const save = User => async user => {
  try {
    const user = await User.insertOne(user)
    return user
  } catch (error) {
    console.log('ERROR', error)
  }
}

module.exports = User => {
  save: save(User)
}
