import { css, CSSResult, html, LitElement, PropertyValues, TemplateResult } from 'lit';

import { customElement, property, state } from 'lit/decorators.js';

import { hasConfigOrEntityChanged, type HomeAssistant } from 'custom-card-helpers';

import { HeaterMode, heaterModeLabels, heaterModes, type QubinoFlushWirePilotConfig } from './types';

import { HassEntity } from 'home-assistant-js-websocket';
import { getHeaterMode, isHeaterOn, validateConfig } from './utils';

@customElement('qubino-flush-pilot-wire')
export class QubinoFlushPilotWireCard extends LitElement {
  @property({ attribute: false })
  private hass!: HomeAssistant;

  @state()
  private config!: QubinoFlushWirePilotConfig;

  public setConfig(config: QubinoFlushWirePilotConfig): void {
    this.config = validateConfig(config);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  private getEntity(): HassEntity | null | undefined {
    return this.hass.states[this.config.entity];
  }

  private handleChangeMode = (mode: HeaterMode) => (): void => {
    if (mode === HeaterMode.OFF) {
      this.hass.callService('light', 'turn_off', {
        entity_id: this.config.entity,
      });
    } else {
      this.hass.callService('light', 'turn_on', {
        entity_id: this.config.entity,
        brightness: mode,
      });
    }
  };

  private renderEntity = (entity: HassEntity): TemplateResult => {
    const currentMode = getHeaterMode(entity);

    const isOn = isHeaterOn(entity);

    return html`
      <ha-card>
        <div class="qubino-container">
          <p class="header">${entity.attributes.friendly_name}</p>
          <ha-icon icon=${isOn ? 'mdi:radiator' : 'mdi:radiator-off'} style=${`opacity: ${isOn ? '0.9' : '0.6'}`}>
          </ha-icon>
          <div class="buttons-container">
            ${heaterModes.map(
              mode => html`
                <ha-button ?disabled=${mode === currentMode} @click=${this.handleChangeMode(mode)}
                  >${heaterModeLabels[mode]}</ha-button
                >
              `,
            )}
          </div>
        </div>
      </ha-card>
    `;
  };

  protected render(): TemplateResult {
    const heaterEntity = this.getEntity();

    if (heaterEntity) {
      return this.renderEntity(heaterEntity);
    } else {
      return html`
        <ha-card>
          <div class="qubino-container">Entity not found</div>
        </ha-card>
      `;
    }
  }

  static get styles(): CSSResult {
    return css`
      .qubino-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 15px;
        gap: 20px;
      }

      .qubino-container p {
        margin: 0;
        padding: 0;
      }

      .qubino-container p.header {
        font-size: 18px;
      }

      .qubino-container ha-icon {
        --mdc-icon-size: 36px;
      }

      .qubino-container .buttons-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        padding: 0 20px 5px;
      }
    `;
  }
}
