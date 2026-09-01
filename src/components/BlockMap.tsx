import { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { BLOCKS } from '@/data/mockData';

interface Props {
  selectedId?: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MADURAI_CENTER = {
  lat: 9.9252,
  lng: 78.1198,
};

const BLOCK_COORDINATES: Record<string, { lat: number; lng: number }> = {
  thirupparankundram: {
    lat: 9.8816,
    lng: 78.0722,
  },
  melur: {
    lat: 10.0324,
    lng: 78.3397,
  },
  usilampatti: {
    lat: 9.9697,
    lng: 77.7877,
  },
  vadipatti: {
    lat: 10.0845,
    lng: 77.9611,
  },
  perungudi: {
    lat: 9.8711,
    lng: 78.0912,
  },
};

setOptions({
        key: API_KEY,
        v: 'weekly',
      });

export function BlockMap({ compact = false }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;


      const { Map } = await importLibrary('maps');
      const { AdvancedMarkerElement } = await importLibrary('marker');

      const map = new Map(mapRef.current, {
        center: MADURAI_CENTER,
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        mapId: 'DEMO_MAP_ID',
      });

      BLOCKS.forEach((block) => {
        const position = BLOCK_COORDINATES[block.id];

        if (!position) return;

        new AdvancedMarkerElement({
          map,
          position,
          title: block.name,
        });
      });
    };

    initializeMap();
  }, []);

  return (
    <div
      ref={mapRef}
      className={`w-full rounded-2xl border border-leaf-200/70 overflow-hidden ${
        compact ? 'aspect-[4/3]' : 'aspect-[16/10]'
      }`}
    />
  );
}