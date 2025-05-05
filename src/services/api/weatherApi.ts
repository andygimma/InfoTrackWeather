export default async function weatherApi(latitude: number, longitude: number) {
  const url = `https://api.weather.gov/points/${latitude},${longitude}`;

  const response = await fetch(url);
  const json = await response.json();
  const forecastAPI = json.properties.forecast;
  const forecasetHourlyAPI = json.properties.forecastHourly;

  const [daily, hourly] = await Promise.all([
    getJson(forecastAPI),
    getJson(forecasetHourlyAPI),
  ]);

  return [daily, hourly];
}

async function getJson(url: string) {
  const data = await fetch(url);
  const json = await data.json();
  return json.properties.periods;
}
