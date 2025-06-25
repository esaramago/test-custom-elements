class Card extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})

    const author = this.getAttribute('author')

    const style = `
      :host {
        display: block;
        border: 1px solid #ccc;
        padding: 16px;
        border-radius: 8px;
        font-family: sans-serif;
      }

      .card-title {
        font-size: 1.5em;
        margin-bottom: 8px;
        color: purple;
      }

      .card-content {
        font-size: 1em;
        line-height: 1.5;
      }
    `

    const template = `
      <div class="card-title" part="card-header">
        <slot name="title"></slot>
      </div>
      <div class="card-content" part="card-body">
        <slot></slot>
        <p class="card-author" part="card-author">${author ? `Author: ${author}` : 'No author specified'}</p>
      </div>
    `

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${template}
    `
  }


}

customElements.define('ta-card', Card)