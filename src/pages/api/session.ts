import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: 'your-password-at-least-32-characters-long',
    cookieName: 'tokens',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
