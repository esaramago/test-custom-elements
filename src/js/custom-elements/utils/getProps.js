import {getPropValue} from './wc-utils.js'

export default function getProps(customElement) {

  if (!customElement) return

  const properties = customElement.properties

  Object.keys(properties).forEach(key => {
    const property = properties[key]
    const attribute = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
    const defaultValue = typeof property === 'object' ? property.default : property

    const value = customElement.getAttribute(attribute)

    customElement[key] = getPropValue({
      value: value === null ? defaultValue : value,
      type: property.type,
    })
  })
}