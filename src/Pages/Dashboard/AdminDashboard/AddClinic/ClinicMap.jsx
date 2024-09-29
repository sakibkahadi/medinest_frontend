import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios'; // For making HTTP requests

const ClinicMap = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [locationData, setLocationData] = useState(null);

  // Function to reverse geocode the coordinates to get street, city, state, etc.
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const address = response.data.address;

      // Format the location data including street address
      const locationDetails = {
        street: address.road || address.pedestrian || address.house_number || '',
        city: address.city || address.town || address.village || '',
        state: address.state || '',
        postalCode: address.postcode || '',
        country: address.country || '',
        coordinates: {
          latitude: lat,
          longitude: lon,
        },
      };
      
      setLocationData(locationDetails); // Store the location details in state
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
    }
  };

  // This component will listen for clicks on the map
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng); // Set the clicked position

        // Reverse geocode the coordinates to get the address
        reverseGeocode(lat, lng);
      },
    });

    // Render the marker if a position is set (after the user clicks)
    return position === null ? null : <Marker position={position}></Marker>;
  };

  // Function to handle confirmation
  const handleConfirm = () => {
    if (locationData) {
      onLocationSelect(locationData); // Pass location data to parent via prop
    } else {
      console.log('No location selected!');
    }
  };

  return (
    <div>
      <MapContainer
        center={[23.8103, 90.4125]} // Initial map center (Dhaka, Bangladesh in this case)
        zoom={12} // Initial zoom level
        style={{ height: '400px', width: '100%' }} // Map size
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=hWVF1Exq7juawljZ0j8M"
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
        />

        {/* LocationMarker component that listens for map clicks and renders a marker */}
        <LocationMarker />
      </MapContainer>

      {/* Show confirm button only when a location is selected */}
      {locationData && (
        <button type='button' className='btn btn-primary' onClick={handleConfirm} style={{ marginTop: '20px' }}>
          Confirm Location
        </button>
      )}
    </div>
  );
};

export default ClinicMap;
