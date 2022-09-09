export const serialize = (obj: any) => {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export type DayWeatherDataType = Partial<{
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: string[] | null;
  snow: number | null;
  snowdepth: number | null;
  windgust: number | null;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number | null;
  solarenergy: number | null;
  uvindex: number | null;
  severerisk: number | null;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations: string[] | null;
  source: string;
  normal: Normal;
}>;
export interface Normal {
  tempmax?: number[] | null;
  tempmin?: number[] | null;
  feelslike?: number[] | null;
  precip?: number[] | null;
  humidity?: number[] | null;
  snowdepth?: null[] | null;
  windspeed?: number[] | null;
  windgust?: (number | null)[] | null;
  winddir?: number[] | null;
  cloudcover?: number[] | null;
}
