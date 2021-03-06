import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Imagem do mapa" />

          <h2>Escolha um orfanato</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Sapucaia do Sul</strong>
          <span>Rio Grande do Sul</span>
        </footer>        
      </aside>

      <Map 
      center={[-29.8116027,-51.1625621]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => {
          return (
          <Marker
            key={orphanage.id}
            icon={happyMapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
          >
              <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </ Marker>
          )
        })}
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
      <FiPlus size={32} color="#fff" />
    </Link>
    </div>
  )
}
