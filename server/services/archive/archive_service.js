let allArchives = []
const read = (Archive) => async (searchTerm) => {
  try {
    // const archives = allArchives //await getArchives(Archive)
    const filteredArchives = allArchives.filter((archive) => {
      let spreadedArchiveTitle = [...archive.title.toLowerCase()]
      const spreadedSearchTerm = [...searchTerm]
      return spreadedSearchTerm.every((sT) => {
        const ind = spreadedArchiveTitle.indexOf(sT.toLowerCase())
        if (ind >= 0) {
          spreadedArchiveTitle = spreadedArchiveTitle.splice(
            ind + 1,
            spreadedArchiveTitle.length - 1
          )
          return true
        } else {
          return false
        }
      })
    })
    return filteredArchives
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
