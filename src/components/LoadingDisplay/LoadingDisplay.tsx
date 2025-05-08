type Props = {
  loading: boolean;
  error: string | null;
  children: React.ReactElement;
};

function GeocodeDisplay(props: Props) {
  if (props.loading) {
    return <p>Loading...</p>;
  }

  if (props.error) {
    return <p>{props.error}</p>;
  }
  return props.children;
}

export default GeocodeDisplay;
