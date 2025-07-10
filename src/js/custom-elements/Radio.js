import {render, renderUpdate} from './utils/wc-utils.js'

class Radio extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  properties = {
    value: {
      type: 'boolean'
    },
    disabled: false,
    title: {
      type: 'string',
      default: 'Default title'
    },
    label: 'Hello!'
  }

  styles = /* css */`
    .radio {

    }
    .radio--disabled {
      pointer-events: none;
    }
    input {
      height: 40px;
    }
  `

  template() { return /* html */`
    <div class="radio">
      <h2>${this.title}</h2>
      <label type="radio">
        ${this.label}
        <input type="text" value="${this.value}" name="test" ${this.disabled ? 'disabled' : ''}>
      </label>
      <button>Enviar</button>
    </div>
  `}

  connectedCallback() {
    render(this)

    this.shadowRoot.addEventListener('input', (event) => {
      this.value = event.target.value
      console.log(this.value)
    })
  }

  static observedAttributes = ["value", "disabled", "title"]

  attributeChangedCallback(attribute, oldValue, newValue) {
    renderUpdate(this, attribute, oldValue, newValue)
  }


}

customElements.define('es-radio', Radio)