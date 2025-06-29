export const formatedPrice = (str) => {
  let cleaned = ''
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i]) && str[i] !== ' ') {
      cleaned += str[i]
    }
  }
  let result = ''
  let count = 0
  if (str[str.length - 3] !== '.') {
    cleaned += '00'
  }
  for (let i = cleaned.length - 1; i >= 0; i--) {
    result = cleaned[i] + result
    count += 1
    if (count % 5 == 0 && i !== 0) {
      result = '.' + result
    }
    if (count == 2) {
      result = '.' + result
    }
  }
  return result
}
