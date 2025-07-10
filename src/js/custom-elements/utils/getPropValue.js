export default function validatePropValue(prop) {

  var value = prop.value || ''

  if (prop.type === 'string') {
    if (!prop.value) {
      prop.value = ''
    }
  } else if (prop.value === '' || prop.value === 'true') {
    prop.value = true
  }

  return value
}