export class BoilerplateElement extends HTMLElement {
  constructor() {
    super()

    if (this.render) {
      this.attachShadow({mode: 'open'})
    }
  }

  // public properties
  isMounted = false
  properties = {}
  
  // public methods
  render() {
    // default render function must be overriden
  }
  mounted() {
    // mounted function is called when the element is mounted
  }
  updated(attribute, oldValue, newValue) {
    // updated function is called when an attribute is updated
  }

  connectedCallback() {
    this.#init()
  }

  /* 
    * Private methods
    */
  #init() {
    this.#setProps()

    if (this.render) {
      this.shadowRoot.innerHTML = this.render()
      this.#renderStyles()
    }

    this.isMounted = true

    if (this.mounted) {
      this.mounted()
    }
  }
  #setProps() {
    if (!this.properties) return

    const properties = {}

    Object.keys(this.properties).forEach((key) => {
    
      properties[key] = {
        enumerable: true,
        get() {
      
          const property = this.properties[key]
          const attribute = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
          const attributeValue = this.getAttribute(attribute)
          const defaultValue = property.value  

          const value = this.#validatePropValue({
            attribute,
            value: attributeValue === null || attributeValue === undefined ? defaultValue : attributeValue,
            type: property.type || property,
            required: property.required,
            validator: property.validator,
          })

          return value
        },
        set(value) {

          const property = this.properties[key]
          const attribute = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

          const newValue = this.#validatePropValue({
            attribute,
            value,
            type: property.type || property,
            required: property.required,
            validator: property.validator,
          })

          // update attribute
          if (newValue === false) {
              this.removeAttribute(attribute)
          } else {
            if (newValue === true) {
                this.setAttribute(attribute, "")
            } else {
                this.setAttribute(attribute, newValue)
            }
          }

          return newValue
        },
      }

    })

    Object.defineProperties(this, properties)

  }

  #renderStyles() {
    if (this.styles) {
      this.shadowRoot.insertBefore(document.createElement('style'), this.shadowRoot.firstChild)
      this.shadowRoot.querySelector('style').textContent = `
        :host {
          display: block;
        }
        ${this.styles()}
      `
    }
  }

  #validatePropValue(prop) {
    var value = prop.value
  
    if (prop.type === String) {
        if (!prop.value) {
            value = ""
        }
    } else if (prop.type === Boolean) {
        value = prop.value === "" || prop.value === "true" || prop.value === true
    } else if (prop.type === Number) {
        const number = Number(prop.value)
        const isNumber = !isNaN(number)
        value = isNumber ? number : null
    }
  
    const locationMessage = `in ${this.outerHTML}`
  
    if (prop.required && (value === null || value === "")) {
        console.error(`Attribute "${prop.attribute}" is required ${locationMessage}`)
    }
    if (prop.validator && prop.value) {
        const isStringValid = prop.validator(prop.value)
        if (!isStringValid) {
            console.error(
                `"${prop.value}" is not a valid value for the attribute "${prop.attribute}" ${locationMessage}`
            )
        }
    }
  
    return value
  }
  
  attributeChangedCallback(attribute, oldValue, newValue) {
    if (!this.isMounted) return

    if (oldValue !== newValue) {
      // update property
      const propertyName = attribute.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
      this[propertyName] = newValue
      
      if (this.updated) {
        this.updated(attribute, oldValue, newValue)
      }
    }
  }  

}
