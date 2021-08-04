import base64 from 'react-native-base64';

/**
 * This is a method to get a general access token via client credentials.
 * 
 * @return A general token that can access basic spotify web api functions.
 */
export default async () => {

  const apiPrefix = 'https://accounts.spotify.com/api';
  const client_id = '715a7736d82c4216be65be4772890fa4';
  const client_secret = '8ef4b2ac68334d7ea6f65e1b56cdf40f';
  const base64credentials = base64.encode(client_id + ':' + client_secret);

  const res = await fetch(`${apiPrefix}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const json = await res.json();
  const newToken = json.access_token;
  //console.log('token is: ' + newToken);
  return newToken;
};
