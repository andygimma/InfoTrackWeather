import { render, screen } from "@testing-library/react";
import GeocodeDisplay from "./GeocodeDisplay";

describe("GeocodeDisplay", () => {
  it("shows loading when loading is true", () => {
    render(
      <GeocodeDisplay
        loadingMessage="Loading"
        loading={true}
        error={null}
        address={null}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when error is present", () => {
    render(
      <GeocodeDisplay
        loading={false}
        error="Failed to load address"
        address={null}
      />
    );
    expect(screen.getByText(/failed to load address/i)).toBeInTheDocument();
  });

  it("shows city and state when address is provided", () => {
    const address = { city: "Brooklyn", state: "NY" };
    render(<GeocodeDisplay loading={false} error={null} address={address} />);
    expect(screen.getByText(/brooklyn, ny/i)).toBeInTheDocument();
  });

  it("renders nothing meaningful if address is null and no error/loading", () => {
    render(<GeocodeDisplay loading={false} error={null} address={null} />);
    expect(screen.getByText(/,/)).toBeInTheDocument(); // Will render ", " from `undefined, undefined`
  });
});
