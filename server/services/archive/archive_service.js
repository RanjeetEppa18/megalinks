let allArchives = []
const read = (Archive) => async () => {
  try {
    const archives = allArchives //await getArchives(Archive)
    return archives
  } catch (error) {
    console.log('ERROR', error)
  }
}

const getArchives = (Archive) => async () => {
  let allLinksAdded = false
  let addedLinks = 0
  const chunkSize = 1000
  try {
    while (!allLinksAdded) {
      const linksFound = await Archive.find(
        {},
        'idstr subreddit author title score selftext'
      )
        .skip(addedLinks)
        .limit(chunkSize)

      if (linksFound.length) allArchives.push(...linksFound)
      console.log('LINKS ADDED', allArchives.length)
      addedLinks += linksFound.length
      if (linksFound && !linksFound.length) allLinksAdded = true
    }
    return allArchives
  } catch (error) {
    console.log('ERROR', error)
  }
}

module.exports = (Archive) => {
  return {
    read: read(Archive),
    getArchives: getArchives(Archive),
  }
}
