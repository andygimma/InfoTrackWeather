import { useMemo } from "react";
import { useParams } from "react-router";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import GeolocationDisplay from "../components/GeolocationDisplay/GeolocationDisplay";
import GeocodeDisplay from "../components/Loading/GeocodeDisplay";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import useWeatherApi from "../hooks/useWeatherApi/useWeatherApi";
import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";

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

  const {
    dailyWeather: dailyWeather1,
    error: error1,
    hourlyWeather: hourlyWeather1,
    loading: loading1,
  } = useWeatherApi(location1);

  const {
    dailyWeather: dailyWeather2,
    error: error2,
    hourlyWeather: hourlyWeather2,
    loading: loading2,
  } = useWeatherApi(location2);
  return (
    <div className="md:flex items-center justify-center">
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

        <HourlyWeather
          label="Hourly Temperature"
          hourlyWeather={hourlyWeather1}
        />
        <DailyWeather
          label="Daily Temperature"
          dailyWeather={dailyWeather1}
          full
        />
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

        <HourlyWeather
          label="Hourly Temperature"
          hourlyWeather={hourlyWeather2}
        />
        <DailyWeather
          label="Daily Temperature"
          dailyWeather={dailyWeather1}
          full
        />
      </section>
    </div>
  );
}

export default ComparePage;
