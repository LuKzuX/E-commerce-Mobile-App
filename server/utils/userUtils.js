export const addressObject = (
  countryName = "",
  areaCodeInput = "",
  stateInput = "",
  cityInput = "",
  streetInput = ""
) => {
  let object = {
    country: countryName,
    state: stateInput,
    city: cityInput,
    street: streetInput,
    areaCode: areaCodeInput,
  };
  return object;
};


export const checkAreaCodeFormat = (countryName, areaCodeInput = "") => {
  switch (countryName) {
    case "brazil":
      if (areaCodeInput.length != 9) {
        throw new Error("area code format incorrect for brazil");
      }
      break;
    case "united_states":
      if (areaCodeInput.length != 5) {
        throw new Error("area code format incorrect for usa");
      }
      break;
    default:
      return areaCodeInput
  }
  return areaCodeInput
}