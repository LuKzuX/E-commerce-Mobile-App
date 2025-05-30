export const prettierPrice = (price) => {
  let priceStr = price.toString()
  let newStr = ''
  let count = 0
  for (let i = priceStr.length - 1; i >= 0; i--) {
    newStr = priceStr[i] + newStr
    count++
    if ((count % 3 == 0) || count == priceStr.length - (priceStr.length - 2)) {
      newStr = '.' + newStr
    }
  }

  return newStr
}
