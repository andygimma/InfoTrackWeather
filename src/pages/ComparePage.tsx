import { useMemo } from "react";
import { useParams } from "react-router";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import GeolocationDisplay from "../components/GeolocationDisplay/GeolocationDisplay";
import GeocodeDisplay from "../components/Loading/GeocodeDisplay";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";

function ComparePage() {
  const params = useParams<{
    lat1: string;
    long1: string;
    lat2: string;
    long2: string;
  }>();

  const location1 = useMemo(
    () => ({
      latitude: parseFloat(params.lat1 || "0"),
      longitude: parseFloat(params.long1 || "0"),
    }),
    [params.lat1, params.long1]
  );

  const location2 = useMemo(
    () => ({
      latitude: parseFloat(params.lat2 || "0"),
      longitude: parseFloat(params.long2 || "0"),
    }),
    [params.lat2, params.long2]
  );

  const {
    error: geocodeError1,
    loading: geocodeLoading1,
    address: address1,
  } = useReverseGeocode(location1);

  const {
    error: geocodeError2,
    loading: geocodeLoading2,
    address: address2,
  } = useReverseGeocode(location2);

  return (
    <>
      <section className="px-10 py-10 flex flex-col items-center justify-center">
        <GeolocationDisplay
          loading={false}
          loadingMessage="Loading Geolocation..."
          error={null}
          location={location1}
        />
        <GeocodeDisplay
          loading={geocodeLoading1}
          loadingMessage="Loading Address..."
          error={geocodeError1}
          address={address1}
        />

        <WeatherDisplay location={location1} />
      </section>
      <section className="px-10 py-10 flex flex-col items-center justify-center">
        <GeolocationDisplay
          loading={false}
          loadingMessage="Loading Geolocation..."
          error={null}
          location={location2}
        />
        <GeocodeDisplay
          loading={geocodeLoading2}
          loadingMessage="Loading Address..."
          error={geocodeError2}
          address={address2}
        />

        <WeatherDisplay location={location2} />
      </section>
    </>
  );
}

export default ComparePage;
