<template>
  <div id="map" class="basemap"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'BaseMap',
  props: {
    countryCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      coordinates: null,
      flag: '',
      countryName: '',
      accessToken:
        'pk.eyJ1IjoiaHVuZ3RlZGR5OTgiLCJhIjoiY2trMjBkczR1MGw1MjJucGIwZHhna2c1YyJ9.uNE8vWHPjWwR8PClA3Ot5g',
    };
  },

  computed: {
    // eslint-disable-next-line no-underscore-dangle
    _coordinates() {
      return [...this.coordinates].reverse();
    },
  },

  mounted() {
    fetch(`https://restcountries.eu/rest/v2/alpha/${this.countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        this.coordinates = data.latlng;
        this.flag = data.flag;
        this.countryName = data.name;

        mapboxgl.accessToken = this.accessToken;

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: this._coordinates,
          zoom: 1,
        });

        const size = 100;
        // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
        // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
        const pulsingDot = {
          width: size,
          height: size,
          data: new Uint8Array(size * size * 4),

          // get rendering context for the map canvas when layer is added to the map
          onAdd() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
          },

          // called once before every frame where the icon will be used
          render() {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const { context } = this;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(0, 0, this.width, this.height).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
          },
        };

        map.on('load', () => {
          map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

          map.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: this._coordinates,
                  },
                },
              ],
            },
          });
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'pulsing-dot',
            },
          });

          const nav = new mapboxgl.NavigationControl();
          map.addControl(nav, 'top-right');

          const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          });

          map.addControl(geolocate, 'top-right');

          // eslint-disable-next-line no-unused-vars
          const popup = new mapboxgl.Popup({ closeButton: false })
            .setLngLat(this._coordinates)
            .setHTML(
              `<div class="center-y">
                <img width="32" style="display: inline-block; border: 1px solid #eee;" src="${this.flag}" />
                <span class="ml-8">${this.countryName}</span> 
              </div>
              `,
            )
            .addTo(map);
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 300px;
}
</style>
