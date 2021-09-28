import React, { useEffect } from 'react';
import L from 'leaflet';
import { Placeholder, PlaceholderImage } from 'semantic-ui-react';
import { ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import styles from './styles.module.scss';

export interface IMapProps {
  lat: number;
  lon: number;
  loading?: boolean;
  currentBuildingSpaces?: ISpaceWithAvailability[];
  currentBuildingName: string;
}

const Map: React.FC<IMapProps> = (
  { lat, lon, loading = false, currentBuildingSpaces = [], currentBuildingName }
) => {
  useEffect(() => {
    if (!loading && lat !== undefined && lon !== undefined) {
      const foundSpaces = currentBuildingSpaces.filter(sp => sp.amountAvailable > 0)
        .sort((sp, sp1) => sp.pricePerDay - sp1.pricePerDay)
        .find(() => true);

      let text;
      if (foundSpaces) {
        text = `$${foundSpaces.pricePerDay} ${currentBuildingName}`;
      } else {
        text = currentBuildingName;
      }

      const map = L.map('map').setView([lat, lon], 16);
      L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | '
          + `<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}">Google Maps</a>`
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup(text).openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, loading, currentBuildingName]);

  return (
    <>
      {loading && (
        <Placeholder>
          <PlaceholderImage className={styles.container} />
        </Placeholder>
      )}
      {loading || (
        <div id="map" className={styles.container} />
      )}
    </>
  );
};

export default Map;
