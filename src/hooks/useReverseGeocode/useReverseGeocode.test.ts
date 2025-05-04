import { renderHook, waitFor } from "@testing-library/react";
import useReverseGeocode from "./useReverseGeocode";

const mockSuccessResponse = {
  features: [
    {
      properties: {
        city: "Brooklyn",
        state: "New York",
      },
    },
  ],
};

describe("useReverseGeocode", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, REACT_APP_REVERSE_GEOCODE_API_KEY: "fake-key" };
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  it("should fetch and return address data on valid location", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      })
    ) as jest.Mock;

    const { result } = renderHook(() =>
      useReverseGeocode({ latitude: 40.6782, longitude: -73.9442 })
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.address).toEqual({
      city: "Brooklyn",
      state: "New York",
    });
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors gracefully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as jest.Mock;

    const { result } = renderHook(() =>
      useReverseGeocode({ latitude: 0, longitude: 0 })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.address).toBeNull();
    expect(result.current.error).toMatch(/HTTP error/);
  });

  it("should not fetch if location is null", () => {
    const { result } = renderHook(() => useReverseGeocode(null));

    expect(result.current.address).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should set error if API key is missing", async () => {
    delete process.env.REACT_APP_REVERSE_GEOCODE_API_KEY;

    const { result } = renderHook(() =>
      useReverseGeocode({ latitude: 1, longitude: 1 })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toMatch(/Missing API key/);
    expect(result.current.address).toBeNull();
  });
});
