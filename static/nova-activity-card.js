import 'https://cdn.skypack.dev/@brightspace-ui/core/components/card/card';
import 'https://cdn.skypack.dev/@brightspace-ui/core/components/card/card-content-meta';
import 'https://cdn.skypack.dev/@brightspace-ui/core/components/colors/colors';
import 'https://cdn.skypack.dev/@brightspace-ui/core/components/icons/icon';
import 'https://cdn.skypack.dev/@brightspace-ui/core/components/loading-spinner/loading-spinner';

import { bodySmallStyles, heading4Styles } from 'https://cdn.skypack.dev/@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'https://cdn.skypack.dev/lit';
import { classMap } from 'https://cdn.skypack.dev/lit-html/directives/class-map';

class ActivityCardComponent extends LitElement {

  static get properties() {
    return {
      activity: { type: Object },
    };
  }

  static get styles() {
    return [
      bodySmallStyles,
      heading4Styles,
      css`
        :host {
          display: inline-block;
          width: 260px;
          min-width: 230px;
          max-width: 300px;
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
          transition: width 0.5s;
        }

        :host([hover]:not([skeleton])) {
          box-shadow: rgb(0 0 0 / 6%) 0 2px 14px 1px;
          transform: translateY(-4px);
        }

        :host([hover]:not([skeleton])) .activity-title-wrapper {
          color: var(--d2l-color-celestine);
          text-decoration: underline;
        }

        :host([skeleton]) .course-image,
        :host([skeleton]) .provider-logo {
          visibility: hidden;
        }

        d2l-card {
          width: 100%;
          height: 100%;
        }

        .course-image-wrapper {
          display: flex;
        }

        .course-image {
          width: 100%;
          height: 120px;
          object-fit: cover;
          object-position: left top;
          transition: height 0.5s;
        }

        div[slot="content"] {
          margin: -0.6rem -0.2rem;
        }

        div[slot="footer"] {
          margin: -0.6rem -0.2rem 0 -0.2rem;
        }

        .provider-logo-wrapper {
          display: flex;
        }

        .provider-logo {
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: 30px;
        }

        .meta-content-wrapper {
          margin-bottom: 0.4rem;
          color: var(--d2l-color-ferrite);
        }

        .meta-header {
          font-weight: bold;
        }

        [class^='meta-tag-']:not(:first-of-type)::before {
          content: "• ";
        }

        .activity-title-wrapper {
          position: relative;
          width: 100%;
          height: 2.4rem;
          margin: 0.2rem 0;
        }

        .activity-title {
          position: absolute;
          top: 50%;
          display: -webkit-box;
          margin: 0;
          overflow: hidden;
          white-space: normal;
          overflow-wrap: anywhere;
          transform: translateY(-50%);
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        @media (max-width: 767px) {
          :host {
            width: 140px;
            min-width: 140px;
            max-width: 160px;
          }

          .course-image {
            height: 60px;
          }

          .provider-logo {
            max-width: 80%;
            max-height: 20px;
          }

          .activity-title-wrapper {
            height: 1.8rem;
          }

          .activity-title {
            font-size: 0.7rem;
            line-height: 0.9rem;
          }

          .meta-content-wrapper {
            margin-bottom: 0.4rem;
            font-size: 0.6rem;
            line-height: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :host {
            transition: none;
          }
        }
    `];
  }

  constructor() {
    super();
    this.activity = null;
  }

  render() {
    return html`
      <d2l-card class="activity-card" title="${this.activity.name}" text="${this.activity.name}">
        <div slot="header" class="course-image-wrapper d2l-skeletize">
          <img alt="" class="course-image" src=${this.activity.course_url}>
        </div>
        <div slot="content">
          ${this._contentTemplate}
        </div>
      </d2l-card>
    `;
  }

  get _activityTitleClasses() {
    return {
      'd2l-heading-4': true,
      'd2l-skeletize': true,
      'd2l-skeletize-80': true,
      'activity-title': true,
    };
  }

  get _contentTemplate() {
    return html`
      <div class="provider-logo-wrapper d2l-skeletize d2l-skeletize-40">
        <img class="provider-logo" alt="${this.activity.provider}" src="${this.activity.provider_url}">
      </div>
      <div class="activity-title-wrapper">
        <h4 class=${classMap(this._activityTitleClasses)}>${this.activity.name}</h4>
      </div>
      <d2l-card-content-meta class="meta-content-wrapper">
        ${this._metaContentTemplate}
      </d2l-card-content-meta>
    `;
  }

  get _metaContentTemplate() {
    return html`
      <div class="meta-header d2l-skeletize d2l-skeletize-60">${this.activity.delivery}</div>
    `;
  }

}

window.customElements.define('nova-activity-card', ActivityCardComponent);
