import { renderHook, act } from "@testing-library/react";
import useGeoLocation from "./useGeolocation";

const LATITUDE = 40.7128;
const LONGITUDE = -74.006;
const ERROR = "Some error";

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

describe("useGeolocation", () => {
  beforeAll(() => {
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets location on success", async () => {
    const mockPosition = {
      coords: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (successCallback: PositionCallback) => {
        successCallback(mockPosition as GeolocationPosition);
      }
    );

    const { result } = renderHook(() => useGeoLocation());

    await act(() => Promise.resolve());

    expect(result.current.location).toEqual({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("loading is true immediately after hook runs", () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(() => {
      // Do nothing — simulate pending
    });

    const { result } = renderHook(() => useGeoLocation());

    expect(result.current.loading).toBe(true);
    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets error when geolocation fails", async () => {
    const mockError = { message: ERROR };

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_success: PositionCallback, error: PositionErrorCallback) => {
        error(mockError as GeolocationPositionError);
      }
    );

    const { result } = renderHook(() => useGeoLocation());

    await act(() => Promise.resolve());

    expect(result.current.error).toBe(ERROR);
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
