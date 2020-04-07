import fetch from 'node-fetch'

const fetchFileContent = (url: string): Promise<string> => (
  new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        resolve(res.text())
      })
  })
)

export default fetchFileContent
