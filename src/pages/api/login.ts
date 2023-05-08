import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
import crypto from 'crypto';
import withSession from '@/pages/api/session';
import { Session } from 'next-iron-session';

interface CustomApiRequest extends NextApiRequest {
  session: Session;
}
export default withSession(async function login(
  req: CustomApiRequest,
  res: NextApiResponse,
) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } = process.env;

  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
  ];

  const state = crypto.randomBytes(16).toString('hex');
  const showDialog = true;
  const queryParams = qs.stringify({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: scopes.join(' '),
    state,
    show_dialog: showDialog,
  });

  const spotifyAuthorizeUrl = `https://accounts.spotify.com/authorize?${queryParams}`;

  res.redirect(spotifyAuthorizeUrl);
});
