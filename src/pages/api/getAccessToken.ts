import { NextApiRequest, NextApiResponse } from 'next';
import withSession from './session';
import { Session } from 'next-iron-session';

interface CustomApiRequest extends NextApiRequest {
  session: Session;
}
export default withSession(async function getAccessToken(
  req: CustomApiRequest,
  res: NextApiResponse,
) {
  try {
    const accessToken = req.session.get('access_token');
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve access token' });
  }
});
