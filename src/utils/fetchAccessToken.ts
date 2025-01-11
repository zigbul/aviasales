async function fetchAccessToken() {
  const url = new URL('https://test.api.amadeus.com/v1/security/oauth2/token');

  const formData = new URLSearchParams();
  formData.append('grant_type', 'client_credentials');
  formData.append('client_id', import.meta.env.VITE_AMADEUS_CLIENT_ID);
  formData.append('client_secret', import.meta.env.VITE_AMADEUS_CLIENT_SECRET);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const { access_token }: Record<string, string> = await response.json();

    return access_token;
  } catch (e) {
    console.log('Error in fetchAccessToken:', e);
  }
}

export default fetchAccessToken;
