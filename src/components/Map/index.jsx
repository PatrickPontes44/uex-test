import {
    Map,
    NavigationControl,
    FullscreenControl,
    Marker,
} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';

import { useRef, useEffect  } from 'react';

// base style for the map.
const BASEMAP_STYLE = {
    "version": 8,
    "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    "sources": {
      "osm": {
        "type": "raster",
        "tiles": [
          "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ],
        "tileSize": 256,
        "attribution": "&copy; OpenStreetMap Contributors",
        "maxzoom": 19
      }
    },
    "layers": [
      {
        "id": "osm",
        "type": "raster",
        "source": "osm"
      }
    ]
  };

export default function CustomMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = -50.57;
    const lat =-25.0;
    const zoom = 5;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new Map({
            container: mapContainer.current,
            style: BASEMAP_STYLE,
            center: [lng, lat],
            zoom: zoom,
            maxZoom: 20,
            minZoom: 5,
            maplibreLogo: false,
            pitch: 0,
            bearing: 0,
            attributionControl: false,
            preserveDrawingBuffer: true,
        });
        
        // Add controls to the map
        map.current.addControl(
            new FullscreenControl({
              container: document.querySelector(`.map`),
            }),
            "top-left",
        );
        map.current.addControl(
            new NavigationControl({
                visualizePitch: true,
            }),
            "top-left",
        );
    
    }, [lng, lat, zoom]);

    // Add a marker to the map
    function addMarker(lngLat, content) {
        const el = document.createElement("div");
        el.className = "marker";
        el.key = Math.random();
        el.innerHTML = content;
    
        new Marker({ element: el }).setLngLat(lngLat).addTo(map.value);
    }

    return (
        <div className="map-container">
            <div ref={mapContainer} className="map">

            </div>
        </div>
    )
}
