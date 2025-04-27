export const prettierPrice = (price) => {
  let priceStr = price.toString()
  for (let i = 0; i == priceStr.length; i++) {
    if (i % 3 == 0) {
      priceStr += '.'
    }
  }
  return priceStr 
}
