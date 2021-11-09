import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const styleMap = { "width": "100%", "height": "60vh" }

function MapView() { 
    return (
      <MapContainer
        style={styleMap}
        center={[37.885963680860755, -4.774589538574219,]}
        zoom={12}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      </MapContainer>
    )
}

export default MapView;