import {render} from './wc-utils.js'

export default function renderUpdate(customElement, attribute, oldValue, newValue) {
  if (oldValue !== newValue) {
    render(customElement, {attribute, newValue})
  }
}
