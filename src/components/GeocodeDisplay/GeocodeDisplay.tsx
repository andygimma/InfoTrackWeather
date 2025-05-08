type Props = {
  loading: boolean;
  error: string | null;
  address: {
    city: string;
    state: string;
  } | null;
};

function GeocodeDisplay(props: Props) {
  if (props.loading) {
    return <p>Loading...</p>;
  }

  if (props.error) {
    return <p>{props.error}</p>;
  }
  return (
    <div>
      {props.address?.city}, {props.address?.state}
    </div>
  );
}

export default GeocodeDisplay;
