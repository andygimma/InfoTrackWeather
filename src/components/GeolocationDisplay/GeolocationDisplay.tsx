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
      {location?.latitude}, {location?.longitude}
    </div>
  );
};

const GeocodeDisplayWithStates = withLoadingAndError(GeocodeDisplay);

export default GeocodeDisplayWithStates;
