import { css, CSSResult, customElement, html, LitElement, property, PropertyValues, TemplateResult } from 'lit-element';

import { hasConfigOrEntityChanged, HomeAssistant } from 'custom-card-helpers';

import { heaterModeLabels, QubinoFlushWirePilotConfig, QubinoFlushWirePilotConfigType } from './types';

import { pipe } from 'fp-ts/lib/pipeable';
import * as EI from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { failure } from 'io-ts/lib/PathReporter';
import { HassEntity } from 'home-assistant-js-websocket';
import { getHeaterMode } from './utils';

@customElement('qubino-flush-pilot-wire')
export class QubinoFlushPilotWireCard extends LitElement {
  @property()
  private hass!: HomeAssistant;

  @property()
  private _config!: QubinoFlushWirePilotConfig;

  public setConfig(config: QubinoFlushWirePilotConfig): void {
    const result = QubinoFlushWirePilotConfigType.decode(config);

    if (EI.isLeft(result)) {
      throw new Error(`Invalid configuration : ${failure(result.left)}`);
    } else {
      this._config = result.right;
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  private getEntity(): O.Option<HassEntity> {
    return O.fromNullable(this.hass.states[this._config.entity]);
  }

  private renderEntity(entity: HassEntity): TemplateResult {
    console.log(entity);

    return html`
      <ha-card>
        <div class="qubino-container">${entity.attributes.friendly_name}</div>
        <div>${heaterModeLabels[getHeaterMode(entity)]}</div>
      </ha-card>
    `;
  }

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
        padding: 15px;
      }
    `;
  }
}
