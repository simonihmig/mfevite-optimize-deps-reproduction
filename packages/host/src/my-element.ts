import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './host-counter.ts';
import './index.css';

@customElement('host-app')
export class HostApp extends LitElement {
  @state()
  private remoteError: string | null = null;

  async firstUpdated(): Promise<void> {
    try {
      // @ts-ignore
      const { mountRemoteApp } = await import('remote/remote-app');
      const container = this.renderRoot.querySelector<HTMLElement>('#remote-slot');

      if (!container) {
        this.remoteError = 'Remote slot missing';
        return;
      }

      mountRemoteApp(container);
    } catch (error) {
      this.remoteError = error instanceof Error ? error.message : 'Remote failed to load';
    }
  }

  render() {
    return html`
      <div class="host">
        <div class="card">
          <div class="icon">
            <svg
              enable-background="new 0 0 512 512"
              height="512px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="512px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M316.01,199.02L256.134,14.817L196.239,199.02H1.134l158.102,113.324L98.53,496.487l157.604-114.232  l157.585,114.232l-60.687-184.143L511.134,199.02H316.01z M335.084,318.257l42.407,128.63L267.22,366.963l-11.086-8.033  l-11.086,8.033l-110.291,79.923l42.408-128.63l4.353-13.18l-11.289-8.08L59.903,217.909h136.336h13.724l4.242-13.051l41.929-128.957  l41.91,128.957l4.242,13.051h13.724h136.336l-110.327,79.088l-11.27,8.08L335.084,318.257z"
              />
            </svg>
          </div>
          <div class="title">I'm the host app</div>
          <host-counter label="Host counter"></host-counter>
        </div>
      </div>

      ${this.remoteError
        ? html`
            <div class="host">
              <div class="card">
                <div class="title">Remote failed</div>
                <div class="badge">${this.remoteError}</div>
              </div>
            </div>
          `
        : null}

      <div id="remote-slot"></div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
    }

    .host .card {
      background: #3178c6;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
      border-radius: 5px;
      margin: 20px;
      width: 250px;
      padding: 20px;
      text-align: center;
      color: white;
      float: left;
    }

    .title {
      margin-top: 10px;
      font-size: 25px;
    }

    svg {
      width: 100px;
      height: 100px;
    }

    path {
      fill: #f6b352;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 11px;
      border-radius: 999px;
      margin-top: 12px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.78);
      backdrop-filter: blur(8px);
    }
  `;
}
