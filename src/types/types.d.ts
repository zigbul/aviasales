interface IRequiredParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: string;
}

export type SearchedParams = IRequiredParams & Record<string, string>;
