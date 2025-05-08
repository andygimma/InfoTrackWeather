import React from "react";
import { render, screen } from "@testing-library/react";
import GeolocationDisplay from "./GeolocationDisplay";

describe("GeocodeDisplayWithStates", () => {
  it("shows loading state when loading is true", () => {
    render(
      <GeolocationDisplay
        loading={true}
        error={null}
        location={null}
        loadingMessage="Loading"
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error state when error is provided", () => {
    render(
      <GeolocationDisplay
        loading={false}
        error="Failed to get location"
        location={null}
      />
    );
    expect(screen.getByText(/failed to get location/i)).toBeInTheDocument();
  });

  it("shows coordinates when not loading or error", () => {
    const location = { latitude: 40.7128, longitude: -74.006 };
    render(
      <GeolocationDisplay
        loadingMessage="Loading"
        loading={false}
        error={null}
        location={location}
      />
    );
    expect(screen.getByText(/40.71.*-74.01/i)).toBeInTheDocument();
  });
});
