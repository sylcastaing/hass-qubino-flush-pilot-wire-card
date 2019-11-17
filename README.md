# Home assistant Qubino flush wire pilot control card

A beautiful lovelace card for your Qubino heater control !

![Card](/images/screenshot.png?raw=true "Card")
![Qubino](/images/qubino.jpg?raw=true "Qubino")

## Setup

You can see [Lovelace custom cards documentation](https://developers.home-assistant.io/docs/en/lovelace_custom_card.html) for more detail.

- Download latest [zip version](https://github.com/sylcastaing/hass-qubino-flush-pilot-wire-card/releases) and extract qubino-flush-wire-pilot.js file
- Add it to the www folder of your Home Assistant config

- Add custom module in your lovelace configuration

```yaml
#ui-lovelace.yaml

resources:
  # add ?v parameter to invalid cache in case of update
  - url: /local/qubino-flush-wire-pilot.js?v=1.0.0
    type: module
```

- Add this card in your ui with the light entity of your Qubino

```yaml
#ui-lovelace.yaml
cards:
  - type: "custom:qubino-flush-pilot-wire"
    entity: light.qubino_goap_zmnhjd1_flush_dimmer_pilot_wire_level

```

- The card will appear !

## Development

The custom card development stack is based on [custom-cards/boilerplate-card](https://github.com/custom-cards/boilerplate-card).

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm start
```

On your Home Assistant installation you can can change the resource file by your computer url to test on the fly !

```yaml
#ui-lovelace.yaml
resources:
  - url: http://${IP_ADDRESS}:5000/qubino-flush-wire-pilot.js
    type: module

```

### Lint code

```bash
npm run lint
```

### Build file

```bash
npm run build
```

A **dist** folder is created with your **qubino-flush-wire-pilot.js**
