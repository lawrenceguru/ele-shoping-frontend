export const required = (value: any) => (value ? undefined : 'must be filled');
export const titleRequired = (value: any) => {
  if (!value) {
    return 'must be filled'
  } else if (value.length < 10) {
    return 'must be at least 10 characters'
  } else {
    return undefined
  }
}
export const priceRequired = (value: any) => {
  if (!value) {
    return 'must be filled'
  } else if (value < 0 || value > 999999) {
    return 'must be greater than 0 and less than 999999'
  } else {
    return undefined
  }
}