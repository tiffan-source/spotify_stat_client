import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/login').then((r) => console.log(r));
  };
  return (
    <div>
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
/*

export const getServerSideProps = withSession(async ({ req }: any) => {
  // Here, you can perform your authorization check
  const userToken = req.session.get('access_token');

  if (userToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { userToken },
  };
});
*/
