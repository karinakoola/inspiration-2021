import { html, LitElement } from 'lit';

export class App extends LitElement {

  render() {
    return html`<p>Hello, World!</p>`;
  }
}

window.customElements.define('app-inspiration', App);