const convertObjectToStringParameters = (objectValue: object): string => (
  Object.entries(objectValue).map(([key, value]) => {
    let stringVal = value
    if (Array.isArray(value)) {
      stringVal = value.join(',')
    } else if (typeof value === 'object') {
      stringVal = JSON.stringify(value)
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(stringVal)}`
  }).join('&')
)

export default convertObjectToStringParameters
