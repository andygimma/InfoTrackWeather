import withLoadingAndError from "../../hocs/WithLoadingAndError";

type GeoLocation = {
  latitude: number;
  longitude: number;
} | null;

type Props = {
  location: GeoLocation;
};

const GeocodeDisplay = ({ location }: Props) => {
  if (location === null) {
    return <div className="min-h-[24px]"></div>;
  }

  return (
    <p>
      Current latitude and longitude: {location?.latitude.toFixed(2)}{" "}
      {location?.longitude.toFixed(2)}
    </p>
  );
};

const GeocodeDisplayWithStates = withLoadingAndError(GeocodeDisplay);

export default GeocodeDisplayWithStates;
