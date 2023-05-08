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
