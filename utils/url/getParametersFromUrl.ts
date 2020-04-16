const getParametersFromUrl = (stringValue: string): { [key: string]: string } => {
  const parametersObject: { [key: string]: string } = {}
  stringValue.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    parametersObject[key] = decodeURIComponent(value)
    return ''
  })
  return parametersObject
}

export default getParametersFromUrl
