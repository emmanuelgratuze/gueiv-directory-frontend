import fetch from 'node-fetch'

const doFetch = (url: string): Promise<string> => (
  new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        resolve(res.text())
      })
      .catch((error) => {
        reject(error)
      })
  })
)

let lastNoSimultenousRequest: Promise<string> = new Promise((resolve) => { resolve() })

const fetchFileContent = (url: string, noSimultaneous = false): Promise<string> => {
  if (noSimultaneous) {
    lastNoSimultenousRequest = lastNoSimultenousRequest
      .then(() => (
        doFetch(url)
      ))
    return lastNoSimultenousRequest
  }

  return doFetch(url)
}

export default fetchFileContent
