import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ lat, lng }) => {
  const position = { lat, lng };

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hWVF1Exq7juawljZ0j8M"
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
      />
      <Marker position={position}>
        <div className="bg-blue-500 text-white text-xs p-1 rounded">Clinic Location</div>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
