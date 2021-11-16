import { html, LitElement } from 'https://cdn.skypack.dev/lit';

export class App extends LitElement {

  render() {
    const fetchCourses = async () => {
      try {
        let res = await fetch('/courses');
  
        if (res.ok) {
          const output = await res.json();
          this.shadowRoot.getElementById('course-list').innerHTML = JSON.stringify(output.body);
        }
      } catch(e) {
        console.log('ALERT: Something is wrong', e);
      }
    };

    return html`
      <p>Hello, World :)</p>
      <button @click=${fetchCourses}>Retrieve courses</button>
      <div id="course-list"></div>
    `;
  }
}

window.customElements.define('app-inspiration', App);