const save = (User) => async (user) => {
  try {
    const userExists = await User.findOne(user)
    if (userExists) {
      console.log('userExists', userExists)
      return
    }
    const savedUser = await User.insertMany([user])
    console.log('savedUser', savedUser)
    return savedUser[0].email
  } catch (error) {
    console.log('ERROR', error)
    return
  }
}

const login = (User) => async (user) => {
  try {
    const logInDetails = await User.findOne(user)
    if (logInDetails) {
      if (logInDetails) {
        console.log('logInDetails', logInDetails)
        return logInDetails.email
      } else {
        return
      }
    }
  } catch (error) {
    console.log('ERROR', error)
    return
  }
}

module.exports = (User) => {
  return {
    save: save(User),
    login: login(User),
  }
}
