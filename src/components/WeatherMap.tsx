import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const TAMIL_NADU_CENTER = {
  lat: 11.1271,
  lng: 78.6569,
};

export default function WeatherMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;

      setOptions({
        key: API_KEY,
        v: "weekly",
      });

      const { Map } = await importLibrary("maps");

      new Map(mapRef.current, {
        center: TAMIL_NADU_CENTER,
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
    };

    initializeMap();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}