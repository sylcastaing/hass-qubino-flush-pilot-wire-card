![GitHub](https://img.shields.io/github/license/sylcastaing/hass-qubino-flush-pilot-wire-card)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/sylcastaing/hass-qubino-flush-pilot-wire-card)

# Home assistant Qubino flush wire pilot control card

A beautiful lovelace card to control your heater!

![Card](/images/screenshot.png?raw=true "Card")
![Qubino](/images/qubino.jpg?raw=true "Qubino")

## Setup

You can see [custom cards documentation](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card) for more details.

- Download latest [zip version](https://github.com/sylcastaing/hass-qubino-flush-pilot-wire-card/releases) and extract qubino-flush-wire-pilot.js file
- Add it to the www folder of your Home Assistant config. You can use [file editor add-on](https://github.com/home-assistant/addons/tree/master/configurator) for this
- Register the js file as a resource by going to settings -> dashboard -> three dots on top -> resources and add the following url: `/local/qubino-flush-wire-pilot.js?v=1.2.0` (add a ?v parameter to invalid cache in case of update)
- Add the card to your dashboard by adding a manual card and insert the following code

```yaml
type: custom:qubino-flush-pilot-wire
entity: light.chauffage_salon
```

> `light.chauffage_salon` is the entity of your Qubino`

- The card will appear!

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

On your Home Assistant you can change the resource file by your computer url to test on the fly!

### Lint code

```bash
npm run lint
```

### Build file

```bash
npm run build
```

A **dist** folder is created with your **qubino-flush-wire-pilot.js**
