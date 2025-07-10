import {getProps, getPropValue} from './wc-utils.js'

export default function render(customElement, changed) {

  if (!customElement || !customElement.shadowRoot) return

  if (changed) {
    const property = changed.attribute.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
    customElement[property] = getPropValue({
      value: changed.newValue,
      type: customElement[property].type,
    })
  } else {
    getProps(customElement)
  }

  customElement.shadowRoot.innerHTML = `
    ${
      customElement.style ? `<style>${customElement.styles}</style>` : ""
    }
    ${customElement.template()}
  `
}
