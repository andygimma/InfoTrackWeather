import React from "react";

type WithLoadingAndErrorProps = {
  loading: boolean;
  error: string | null;
};

function withLoadingAndError<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return (props: P & WithLoadingAndErrorProps) => {
    const { loading, error, ...rest } = props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div style={{ color: "red" }}>Error: {error}</div>;
    }

    return <WrappedComponent {...(rest as P)} />;
  };
}

export default withLoadingAndError;
