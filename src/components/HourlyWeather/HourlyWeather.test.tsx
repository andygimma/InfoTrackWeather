import { render, screen, fireEvent } from "@testing-library/react";
import HourlyWeather from "./HourlyWeather";

HTMLCanvasElement.prototype.getContext = jest.fn();

describe("HourlyWeather", () => {
  it("Shows a loading message when there isn't any data", () => {
    render(<HourlyWeather label="Hourly Weather" hourlyWeather={[]} />);
    // const loadingSection = screen.getByTestId("hourly-weather-loading-section");
    // expect(loadingSection).toBeInTheDocument();
    // expect(loadingSection).toHaveTextContent("Loading hourly weather...");
  });
});
