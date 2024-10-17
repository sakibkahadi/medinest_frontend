/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const ClinicMap = ({ onLocationSelect, initialLat, initialLng }) => {
  const [position, setPosition] = useState(initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null);
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("");
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const address = response.data.address;

      const locationDetails = {
        street: address.road || address.pedestrian || address.house_number || '',
        city: address.city || address.town || address.village || '',
        state: address.state || '',
        postalCode: address.postcode || '',
        country: address.country || '',
        latitude: lat,
        longitude: lon,
      };

      setLocationData(locationDetails);

      if (address.city === "Dhaka") {
        setError("");
        setPosition({ lat, lng: lon });
        setIsLocationConfirmed(false);
      } else {
        setError("Please select a location within Dhaka City.");
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        reverseGeocode(lat, lng);
      },
    });

    return position ? (
      <Marker position={position}>
        <div className="bg-blue-500 text-white text-xs p-1 rounded">Selected Location</div>
      </Marker>
    ) : null;
  };

  const handleConfirm = () => {
    if (locationData) {
      onLocationSelect(locationData);
      setIsLocationConfirmed(true);
    } else {
      console.log('No location selected!');
    }
  };

  const handleCancel = () => {
    setPosition(null);
    setLocationData(null);
    setIsLocationConfirmed(false);
  };

  useEffect(() => {
    if (initialLat && initialLng) {
      setPosition({ lat: initialLat, lng: initialLng });
    }
  }, [initialLat, initialLng]);

  return (
    <div>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={12}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hWVF1Exq7juawljZ0j8M"
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
        />
        <LocationMarker />
      </MapContainer>

      {error && <p className="text-red-600">{error}</p>}

      {!isLocationConfirmed && locationData && (
        <div style={{ marginTop: '20px' }}>
          <button type="button" className='btn btn-primary' onClick={handleConfirm}>
            Save Location
          </button>
        </div>
      )}

      {isLocationConfirmed && (
        <div style={{ marginTop: '20px' }}>
          <button type="button" className='btn btn-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ClinicMap;
