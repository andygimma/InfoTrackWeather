import withLoadingAndError from "../../hocs/WithLoadingAndError";

type GeocodeDisplayProps = {
  address: {
    city: string;
    state: string;
  } | null;
};

const GeocodeDisplay = ({ address }: GeocodeDisplayProps) => {
  if (address === null) {
    return <div className="min-h-[24px]"></div>;
  }

  return (
    <p>
      {address?.city}, {address?.state}
    </p>
  );
};

const GeocodeDisplayWithStates = withLoadingAndError(GeocodeDisplay);

export default GeocodeDisplayWithStates;
