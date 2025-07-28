import { BoilerplateElement } from '../esElement/index.js'

class EsCard extends BoilerplateElement {

  properties = {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      value: 'Unknown',
      required: true
    },
    genre: {
      type: String,
      validator: (value) => value === 'fiction' || value === 'non-fiction'
    },
    year: {
      type: Number,
      value: 0,
      required: true,
      validator: (value) => value > 0
    },
    checked: {
      type: Boolean,
      value: false,
      reactive: true
    },
    checked2: {
      type: Boolean,
      value: false,
      reactive: true
    },
    quantity: {
      type: Number,
      value: 0,
      reactive: true
    }
  }

  static observedAttributes = ['checked', 'checked2', 'quantity']

  styles() {
    return /* css */`
      .book {
        display: block;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 8px;
        font-family: sans-serif;
      }
    `
  }

  render() {
    return /* html */`
      <div class="book">
        <h2>${this.title}</h2>
        <p>${this.author}</p>
        <p>${this.genre}</p>
        <p>${this.year}</p>
        <div part="checkbox">
          <input type="checkbox" ${this.checked ? 'checked' : ''} id="checked">
          <label for="checked">Checked</label>
        </div>
        <div part="checkbox">
          <input type="checkbox" ${this.checked2 ? 'checked' : ''} id="checked2">
          <label for="checked2">Checked2</label>
        </div>
        <div>
          <label for="quantity">Quantity</label>
          <input type="number" id="quantity" value="${this.quantity}">
        </div>
      </div>
    `
  }

  mounted() {

    this.checked2 = true

    this.shadowRoot.querySelector('#checked').addEventListener('change', (event) => {
      this.checked = event.target.checked
      console.log(this.checked)
    })

    this.shadowRoot.querySelector('#checked2').addEventListener('change', (event) => {
      this.checked2 = event.target.checked
      console.log(this.checked2)
    })
    
    this.shadowRoot.querySelector('#quantity').addEventListener('input', (event) => {
      this.quantity = event.target.value
      console.log(this.quantity)
    })
  }

  updated(attribute, oldValue, newValue) {
    console.log('updated', attribute, oldValue, newValue)
  }

}
customElements.define('es-card', EsCard)