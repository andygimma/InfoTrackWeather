import { renderHook, act, waitFor } from "@testing-library/react";
import useWeatherApi from "./useWeatherApi"; // adjust import path as needed

// Import the actual module so we can access the mock
import weatherApi from "../../services/api/weatherApi";

// Mock the weatherApi module
jest.mock("../../services/api/weatherApi");

describe("useWeatherApi", () => {
  const mockLocation = { latitude: 40.7128, longitude: -74.006 };
  const mockHourlyData = [
    { hour: 1, temp: 72 },
    { hour: 2, temp: 74 },
  ];
  const mockDailyData = [
    { day: "Monday", temp: 75 },
    { day: "Tuesday", temp: 80 },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Reset the implementation to avoid test interference
    (weatherApi as jest.Mock).mockReset();
  });

  test("should return initial state", () => {
    const { result } = renderHook(() => useWeatherApi(null));

    expect(result.current.hourlyWeather).toEqual([]);
    expect(result.current.dailyWeather).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("should fetch weather data when location is provided", async () => {
    // Setup mock response
    (weatherApi as jest.Mock).mockImplementation(() =>
      Promise.resolve([mockHourlyData, mockDailyData])
    );

    // Render the hook with a location
    const { result } = renderHook(() => useWeatherApi(mockLocation));

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for the state to update after the API call resolves
    await waitFor(() => expect(result.current.loading).toBe(false));

    // After API call, data should be updated
    expect(result.current.hourlyWeather).toEqual(mockHourlyData);
    expect(result.current.dailyWeather).toEqual(mockDailyData);
    expect(result.current.error).toBe(null);

    // Verify that the API was called with correct params
    expect(weatherApi).toHaveBeenCalledWith(
      mockLocation.latitude,
      mockLocation.longitude
    );
    expect(weatherApi).toHaveBeenCalledTimes(1);
  });

  test("should handle API errors", async () => {
    // Setup mock to reject with an error
    const mockError = new Error("API failure");
    (weatherApi as jest.Mock).mockImplementation(() =>
      Promise.reject(mockError)
    );

    // Render the hook with a location
    const { result } = renderHook(() => useWeatherApi(mockLocation));

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for the error state to be set
    await waitFor(() => expect(result.current.loading).toBe(false));

    // After API call fails, error should be set
    expect(result.current.error).toBe(mockError);
    expect(result.current.hourlyWeather).toEqual([]);
    expect(result.current.dailyWeather).toEqual([]);
  });

  test("should update when location changes", async () => {
    // Setup for first and second API calls
    (weatherApi as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve([mockHourlyData, mockDailyData])
      )
      .mockImplementationOnce(() => {
        const newMockHourlyData = [
          { hour: 1, temp: 65 },
          { hour: 2, temp: 67 },
        ];
        const newMockDailyData = [
          { day: "Monday", temp: 66 },
          { day: "Tuesday", temp: 68 },
        ];
        return Promise.resolve([newMockHourlyData, newMockDailyData]);
      });

    // Initially render with first location
    const { result, rerender } = renderHook((props) => useWeatherApi(props), {
      initialProps: mockLocation,
    });

    // Wait for first API call to resolve
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Verify first data set loaded
    expect(result.current.hourlyWeather).toEqual(mockHourlyData);
    expect(result.current.dailyWeather).toEqual(mockDailyData);

    // Change the location
    const newLocation = { latitude: 34.0522, longitude: -118.2437 };
    rerender(newLocation);

    // Should be loading again
    expect(result.current.loading).toBe(true);

    // Wait for second API call to resolve
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Get the most recent state
    const newHourlyData = result.current.hourlyWeather;
    const newDailyData = result.current.dailyWeather;

    // Expect the data to have changed
    expect(newHourlyData).not.toEqual(mockHourlyData);
    expect(newDailyData).not.toEqual(mockDailyData);

    // API should have been called twice with different params
    expect(weatherApi).toHaveBeenCalledTimes(2);
    expect(weatherApi).toHaveBeenNthCalledWith(
      1,
      mockLocation.latitude,
      mockLocation.longitude
    );
    expect(weatherApi).toHaveBeenNthCalledWith(
      2,
      newLocation.latitude,
      newLocation.longitude
    );
  });

  test("should not fetch data when location is null", () => {
    renderHook(() => useWeatherApi(null));

    // API should not be called when location is null
    expect(weatherApi).not.toHaveBeenCalled();
  });
});
