import { SearchedParams } from '../types/types';

function createUrl(params: SearchedParams): URL {
  const url = new URL('https://test.api.amadeus.com/v2/shopping/flight-offers');

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key] as string);
  });

  return url;
}

export default createUrl;
