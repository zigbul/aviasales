interface IRequiredParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  adults: string;
}

export type SearchedParams = IRequiredParams & Record<string, string | boolean>;

export interface ITicketData {
  id: string;
  price: { total: string; currency: string };
  itineraries: IItinerary[];
  validatingAirlineCodes: string[];
}

interface IItinerary {
  duration: string;
  segments: ISegment[];
}

interface ISegment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  carrierCode: string;
  duration: string;
  numberOfStops: number;
}
