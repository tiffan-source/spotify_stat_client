import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Session } from 'next-iron-session';
import withSession from '@/pages/api/session';

interface CustomApiRequest extends NextApiRequest {
  session: Session;
}
export default withSession(async function getAccessToken(
  req: CustomApiRequest,
  res: NextApiResponse,
) {
  try {
    const refreshToken = req.session.get('refresh_token');
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const authHeader = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');

    const response = await axios.post(
      tokenEndpoint,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    const { access_token, refresh_token, expires_in } = response.data;
    console.log('Access token refreshed');

    res.status(200).json({ access_token, refresh_token, expires_in });
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    res.status(500).json({ error: 'Failed to refresh access token' });
  }
});
