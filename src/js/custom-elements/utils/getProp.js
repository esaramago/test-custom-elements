export default function getProp(customElement, property) {

  if (!customElement || !property) return null

  var value = customElement.getAttribute(property.name || attribute)
  const type = attribute.type

  if (value === null) {
    value = ''
  } else if (value === '' || value === 'true') {
    value = true
  }

  if (type === 'string') {
    if (!value) {
      value = ''
    }
  }

  return value
}