import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'qs';
import withSession from './session';
import { Session } from 'next-iron-session';

interface CustomApiRequest extends NextApiRequest {
  session: Session;
}
export default withSession(async function callback(
  req: CustomApiRequest,
  res: NextApiResponse,
) {
  const { code, error } = req.query;

  if (error) {
    // Handle authorization error
    res.status(400).json({ error: 'Authorization error' });
    return;
  }

  if (!code) {
    // Handle missing authorization code
    res.status(400).json({ error: 'Missing authorization code' });
    return;
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
    process.env;

  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const authHeader = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64');

  try {
    const response = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Store the tokens in the session
    req.session.set('access_token', access_token);
    req.session.set('refresh_token', refresh_token);
    req.session.set('expires_in', expires_in);
    await req.session.save();

    res.redirect('/');
  } catch (error) {
    // Handle token retrieval error
    res.status(500).json({ error: 'Failed to retrieve access token' });
  }
});
