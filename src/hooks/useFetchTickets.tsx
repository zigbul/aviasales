import { useState, useEffect } from 'react';

import fetchAccessToken from '../utils/fetchAccessToken.ts';
import addSearchParams from '../utils/addSearchParams.ts';
import { SearchedParams } from '../types/types';

const useFetchTickets = (params: SearchedParams) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const accessToken = await fetchAccessToken();
        const header = `Bearer ${accessToken}`;
        const url = addSearchParams(params);

        const response = await fetch(url, {
          headers: {
            Authorization: header,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setTickets(data);
      } catch (e) {
        console.log('Error fetching tickets:', e);
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [params]);

  return { tickets, loading, error };
};

export default useFetchTickets;
