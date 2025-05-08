import { render, screen, fireEvent } from "@testing-library/react";
import DailyWeather from "./DailyWeather";

HTMLCanvasElement.prototype.getContext = jest.fn();

describe("DailyWeather", () => {
  it("Shows a loading message when there isn't any data", () => {
    render(<DailyWeather label="Daily Weather" dailyWeather={[]} />);
    const loadingSection = screen.getByTestId("daily-weather-loading-section");
    expect(loadingSection).toBeInTheDocument();
    expect(loadingSection).toHaveTextContent("Loading daily weather...");
  });

  //   it("Shows the weather section when there is data", () => {
  //     render(
  //       <DailyWeather
  //         label="Daily Weather"
  //         dailyWeather={[
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
  //     const loadingSection = screen.getByTestId("daily-weather-section");
  //     expect(loadingSection).toBeInTheDocument();
  //   });
});
