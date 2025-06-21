// src/components/Map.jsx
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Re-center map on city search
const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView([coords.lat, coords.lon], 10);
  return null;
};

const MapComponent = ({ location }) => {
  const coords = location || { lat: 20.5937, lon: 78.9629 }; // default: India

  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={5}
      scrollWheelZoom={true}
      className="leaflet-container" // using class instead of style
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lon]}>
        <Popup>{`City Location`}</Popup>
      </Marker>
      {location && <ChangeMapView coords={location} />}
    </MapContainer>
  );
};

export default MapComponent;

