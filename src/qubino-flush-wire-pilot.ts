import { css, CSSResult, customElement, html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';

import { hasConfigOrEntityChanged, HomeAssistant } from 'custom-card-helpers';

import { HeaterMode, heaterModeLabels, heaterModes, QubinoFlushWirePilotConfig } from './types';

import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import { HassEntity } from 'home-assistant-js-websocket';
import { getHeaterMode, isHeaterOn, validateConfig } from './utils';

@customElement('qubino-flush-pilot-wire')
export class QubinoFlushPilotWireCard extends LitElement {
  @property()
  private hass!: HomeAssistant;

  @property()
  private _config!: QubinoFlushWirePilotConfig;

  public setConfig(config: QubinoFlushWirePilotConfig): void {
    this._config = validateConfig(config);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  private getEntity(): O.Option<HassEntity> {
    return O.fromNullable(this.hass.states[this._config.entity]);
  }

  private handleChangeMode = (mode: HeaterMode) => (): void => {
    if (mode === HeaterMode.OFF) {
      this.hass.callService('light', 'turn_off', {
        entity_id: this._config.entity,
      });
    } else {
      this.hass.callService('light', 'turn_on', {
        entity_id: this._config.entity,
        brightness: mode,
      });
    }
  };

  private renderEntity = (entity: HassEntity): TemplateResult => {
    const currentMode = getHeaterMode(entity);

    return html`
      <ha-card>
        <div class="qubino-container">
          <p class="header">${entity.attributes.friendly_name}</p>
          <ha-icon icon=${isHeaterOn(entity) ? 'mdi:radiator' : 'mdi:radiator-off'}></ha-icon>
          <p class="mode">${heaterModeLabels[currentMode]}</p>
          <div class="buttons-container">
            ${heaterModes.map(
              mode => html`
                <mwc-button
                  raised
                  label=${heaterModeLabels[mode]}
                  ?disabled=${mode === currentMode}
                  @click=${this.handleChangeMode(mode)}
                ></mwc-button>
              `,
            )}
          </div>
        </div>
      </ha-card>
    `;
  };

  protected render(): TemplateResult {
    return pipe(
      this.getEntity(),
      O.fold(
        () => html`
          <ha-card>
            <div class="qubino-container">Entity not found</div>
          </ha-card>
        `,
        this.renderEntity,
      ),
    );
  }

  static get styles(): CSSResult {
    return css`
      .qubino-container {
        text-align: center;
        padding: 15px;
      }

      .qubino-container p.header {
        font-size: 20px;
        padding-bottom: 15px;
      }

      ha-icon {
        width: 60px;
        height: 60px;
      }

      .qubino-container p.mode {
        font-size: 18px;
        padding: 15px 0;
      }

      .buttons-container mwc-button {
        padding: 10px 5px;
      }
    `;
  }
}
