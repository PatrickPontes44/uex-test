import {
    Map,
    NavigationControl,
    FullscreenControl,
    Marker,
} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef, useEffect, useState  } from 'react';
import PropTypes from 'prop-types'

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

CustomMap.propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    markersToDisplay: PropTypes.object,
}

export default function CustomMap({center, zoom, markersToDisplay}) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [markers, setMarkers] = useState({});

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new Map({
            container: mapContainer.current,
            style: BASEMAP_STYLE,
            center: center,
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
    
    }, [center, zoom]);

    useEffect(() => {
        if(!markersToDisplay) return;
        function addMarker(lngLat, id) {
            const el = document.createElement("div");
            el.className = "marker";
            el.key = getRamdonId();
    
            el.style.backgroundImage = `url('/marker.png')`;
            el.style.backgroundSize = 'contain';
            el.style.width = '50px';
            el.style.height = '50px';
        
            let marker = new Marker({ element: el }).setLngLat(lngLat).addTo(map.current);
            setMarkers({...markers, [id]: marker});
        }
    
        function removeMarker(id) {
            markers[id].remove();
            delete markers[id];
        }


        if(markersToDisplay?.method == 'add') {
            addMarker(markersToDisplay.lngLat, markersToDisplay.id);
        } else if(markersToDisplay?.method == 'remove') {
            removeMarker(markersToDisplay.id);
        }
    
    }, [markersToDisplay]);

    // generates a random id
    function getRamdonId(size = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < size; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


    return (
        <div className="map-container">
            <div ref={mapContainer} className="map">

            </div>
        </div>
    )
}
