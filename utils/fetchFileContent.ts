import fetch from 'node-fetch'

const fetchFileContent = (url: string): Promise<string> => (
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

export default fetchFileContent
