// withLoadingAndError.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import withLoadingAndError from "./WithLoadingAndError";

const DummyComponent = ({ message }: { message: string }) => (
  <div>{message}</div>
);

const WrappedComponent = withLoadingAndError(DummyComponent);

describe("withLoadingAndError HOC", () => {
  it("shows loading state", () => {
    render(
      <WrappedComponent
        loading={true}
        error={null}
        loadingMessage="Loading"
        message="Loaded"
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    render(
      <WrappedComponent
        loading={false}
        error="Something went wrong"
        message="Hello"
        loadingMessage="Hello"
      />
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows wrapped component when no loading or error", () => {
    render(
      <WrappedComponent
        loading={false}
        error={null}
        message="Hello"
        loadingMessage="Loading"
      />
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
