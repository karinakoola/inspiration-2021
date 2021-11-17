import { html, LitElement } from 'https://cdn.skypack.dev/lit';
import { nothing } from 'https://cdn.skypack.dev/lit-html';
import { repeat } from 'https://cdn.skypack.dev/lit-html/directives/repeat';

import 'https://cdn.skypack.dev/@brightspace-ui/core/components/button/button';
import './nova-activity-card';

export class App extends LitElement {

  static get properties() {
    return {
      _activities: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return [
      css`
      .activity-carousel {
        display: inline-grid;
        grid-template-columns: repeat(3, minmax(230px, 1fr));
        gap: clamp(3px, 0.6vw, 6px);
        width: 100%;
      }
      `
    ];
  }

  get _activityTemplate() {
    this._activities.length > 0 ? 
      repeat(this._activities,
        activity => activity.id,
        activity => html`<nova-activity-card
            class="activity-card"
            .activity=${activity}>
          </nova-activity-card>`)
    : nothing;
  }

  render() {
    const fetchCourses = async () => {
      try {
        let res = await fetch('/courses');
  
        if (res.ok) {
          const output = await res.json();
          this._activities = output.body.map(b => b.value);
          console.log('The result is Okay!!');
        }
      } catch(e) {
        console.log('ALERT: Something is wrong', e);
      }
    };

    return html`
      <p>Hello, World :) This is my Inspiration project for 2021</p>
      <d2l-button primary @click=${fetchCourses}>Retrieve courses</d2l-button>
      <div role="region" aria-live="polite" class="activity-carousel" id="activity-carousel">
        ${this._activityTemplate}
      </div>
    `;
  }
}

window.customElements.define('app-inspiration', App);