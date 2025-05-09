import { useState, useEffect } from "react";

type GeoLocation = {
  latitude: number;
  longitude: number;
} | null;

type GeoLocationError = string | null;

type Address = {
  city: string;
  state: string;
} | null;

export default function useReverseGeocode(location: GeoLocation) {
  const [address, setAddress] = useState<Address>(null);
  const [error, setError] = useState<GeoLocationError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (location === null) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAddress = async () => {
      setLoading(true);
      setError(null);
      setAddress(null);

      try {
        const apiKey = process.env.REACT_APP_REVERSE_GEOCODE_API_KEY;
        if (!apiKey) throw new Error("Missing API key");

        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${apiKey}`;

        const response = await fetch(url, { method: "GET", signal });
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result = await response.json();

        const city = result.features?.[0]?.properties?.city || "";
        const state = result.features?.[0]?.properties?.state || "";

        setAddress({ city, state });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();

    return () => {
      controller.abort(); // cancel fetch if location changes or component unmounts
    };
  }, [location?.latitude, location?.longitude]);

  return { address, error, loading };
}
