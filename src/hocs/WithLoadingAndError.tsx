import React from "react";

type WithLoadingAndErrorProps = {
  loading: boolean;
  loadingMessage?: string;
  error: string | null;
};

function withLoadingAndError<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return (props: P & WithLoadingAndErrorProps) => {
    const { loading, error, loadingMessage, ...rest } = props;

    if (loading) {
      return <div>{loadingMessage}</div>;
    }

    if (error) {
      return <div style={{ color: "red" }}>Error: {error}</div>;
    }

    return <WrappedComponent {...(rest as P)} />;
  };
}

export default withLoadingAndError;
