import { render, screen, fireEvent } from "@testing-library/react";
import HourlyWeather from "./HourlyWeather";

HTMLCanvasElement.prototype.getContext = jest.fn();

describe("HourlyWeather", () => {
  it("Shows a loading message when there isn't any data", () => {
    render(<HourlyWeather label="Hourly Weather" hourlyWeather={[]} />);
    const loadingSection = screen.getByTestId("hourly-weather-loading-section");
    expect(loadingSection).toBeInTheDocument();
    expect(loadingSection).toHaveTextContent("Loading hourly weather...");
  });

  //   it("Shows the weather section when there is data", () => {
  //     render(
  //       <HourlyWeather
  //         label="Hourly Weather"
  //         hourlyWeather={[
  //           {
  //             temperature: 80,
  //             startTime: new Date(),
  //             probabilityOfPrecipitation: { value: 10 },
  //             number: 10,
  //             name: "Name",
  //           },
  //         ]}
  //       />
  //     );
  //     const loadingSection = screen.getByTestId("hourly-weather-section");
  //     expect(loadingSection).toBeInTheDocument();
  //   });
});
