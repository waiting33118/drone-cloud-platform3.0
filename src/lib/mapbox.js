import mapboxgl from 'mapbox-gl'
import { geolocation } from './geolocation'

const MAPBOX = {
  STYLE: 'mapbox://styles/waiting33118/ckdfkx3t10k9w1irkp8anuy39',
  TOKEN:
    'pk.eyJ1Ijoid2FpdGluZzMzMTE4IiwiYSI6ImNrZDVlZWp6MjFxcXQyeHF2bW0xenU4YXoifQ.iGfojLdouAjsovJuRxjYVA'
}

export default class CustomMap {
  constructor() {
    this.map = null
  }

  async initMapbox() {
    this.map = new mapboxgl.Map({
      style: MAPBOX.STYLE,
      center: (await geolocation) || [0, 0],
      zoom: 17,
      pitch: 0,
      bearing: 0,
      antialias: false,
      container: 'map',
      accessToken: MAPBOX.TOKEN
    })

    this.map.on('load', () => {
      this._loadBuildingLayer()
      this._addMapControls()
    })
  }

  _loadBuildingLayer() {
    // Get label layer ID
    const layers = this.map.getStyle().layers
    let labelLayerId
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id
        break
      }
    }

    // Add 3D building layer
    this.map.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 17,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
    )
  }

  _addMapControls() {
    this.map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
      }),
      'top-right'
    )
    this.map.addControl(
      new mapboxgl.ScaleControl({ maxWidth: 100, unit: 'metric' }),
      'bottom-left'
    )
  }

  addRealTimeTracePath() {
    this.map.addSource('trace', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    })
    this.map.addLayer({
      id: 'trace',
      type: 'line',
      source: 'trace',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'yellow',
        'line-opacity': 0.75,
        'line-width': 5
      }
    })
  }

  createMarker({ color = 'blue', scale = '1', longitude, latitude, map }) {
    return new mapboxgl.Marker({
      color,
      scale
    })
      .setLngLat([longitude, latitude])
      .addTo(map)
  }

  flyTo(lngLat) {
    this.map.flyTo({ center: lngLat, zoom: 17 })
  }
}