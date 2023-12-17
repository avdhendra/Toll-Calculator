import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { markerProps } from '../defs/def'
import { Icon, LeafletMouseEvent } from 'leaflet'
import MarkerIcon from "../utils/marker.svg"
type Props = {
    markers: markerProps[],
    handleMapClick:(e: LeafletMouseEvent,markerId: number)=>void
    
}

export default function Map({markers,handleMapClick}: Props) {
    const customIcon = new Icon({
  
  iconUrl: MarkerIcon,
 
});
    return (
      <div className='flex w-full h-[500px]'>
    <MapContainer style={{ width: "100%", height: "100%" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
                 {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.position[0], marker.position[1]]}
                         eventHandlers={{ click: (e) => handleMapClick(e, marker.id) }}
                         icon={customIcon}
        >
          <Popup>
            Marker {marker.id} <br /> Latitude: {marker.position[0]} <br /> Longitude: {marker.position[1]}
          </Popup>
        </Marker>
      ))}
</MapContainer>
            
      </div>
  )
}