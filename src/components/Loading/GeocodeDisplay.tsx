import withLoadingAndError from "../../hocs/WithLoadingAndError";

type GeocodeDisplayProps = {
  address: {
    city: string;
    state: string;
  } | null;
};

const GeocodeDisplay = ({ address }: GeocodeDisplayProps) => {
  return (
    <div>
      {address?.city}, {address?.state}
    </div>
  );
};

const GeocodeDisplayWithStates = withLoadingAndError(GeocodeDisplay);

export default GeocodeDisplayWithStates;
