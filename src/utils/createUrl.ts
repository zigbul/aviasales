function createUrl(params: Record<string, string>): URL {
  const url = new URL('https://test.api.amadeus.com/v2/shopping/flight-offers');

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return url;
}

export default createUrl;
