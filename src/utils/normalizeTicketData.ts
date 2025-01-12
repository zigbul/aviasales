import { ITicketData } from '../types/types';

function normalizeTicketData(ticketData: ITicketData[]): ITicketData[] {
  return ticketData.map((ticket) => {
    const segments = ticket.itineraries[0].segments.map((segment) => {
      return {
        departure: {
          iataCode: segment.departure.iataCode,
          at: segment.departure.at,
        },
        arrival: {
          iataCode: segment.arrival.iataCode,
          at: segment.arrival.at,
        },
        carrierCode: segment.carrierCode,
        duration: segment.duration,
        numberOfStops: segment.numberOfStops,
      };
    });

    return {
      id: ticket.id,
      price: {
        total: ticket.price.total,
        currency: ticket.price.currency,
      },
      itineraries: [
        {
          duration: ticket.itineraries[0].duration,
          segments,
        },
      ],
      validatingAirlineCodes: ticket.validatingAirlineCodes,
    };
  });
}

export default normalizeTicketData;
