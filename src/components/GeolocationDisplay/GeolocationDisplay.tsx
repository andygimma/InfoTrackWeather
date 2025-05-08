import withLoadingAndError from "../../hocs/WithLoadingAndError";

type GeoLocation = {
  latitude: number;
  longitude: number;
} | null;

type Props = {
  location: GeoLocation;
};

const GeocodeDisplay = ({ location }: Props) => {
  return (
    <div>
      Current latitude and longitude: {location?.latitude.toFixed(2)},{" "}
      {location?.longitude.toFixed(2)}
    </div>
  );
};

const GeocodeDisplayWithStates = withLoadingAndError(GeocodeDisplay);

export default GeocodeDisplayWithStates;
