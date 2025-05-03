import { useState, useEffect } from "react";

type GeoLocation = {
  latitude: number;
  longitude: number;
} | null;

type GeoLocationError = string | null;

export default function useGeoLocation() {
  const [location, setLocation] = useState<GeoLocation>(null);
  const [error, setError] = useState<GeoLocationError>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = () => {
    setLocation(null);
    setError(null);
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  function handleSuccess(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    setLoading(false);
  }

  function handleError(error: GeolocationPositionError) {
    setError(error.message);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return { location, error, loading, refresh };
}
