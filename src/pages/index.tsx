import { useEffect, useState } from 'react';
import { fetchUserInfo } from '@/lib/spotify';

interface User {
  display_name: string;
  images: {
    url: string;
  }[];
}
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/getAccessToken');
        const { accessToken } = await response.json();
        console.log(accessToken);
        const userInfo = await fetchUserInfo(accessToken);
        console.log(userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    let expiresIn = 3600;
    const refreshAccessToken = async () => {
      try {
        const response = await fetch('/api/refreshAccessToken');
        const { access_token, expires_in } = await response.json();
        console.log(access_token);
        expiresIn = expires_in;
        const userInfo = await fetchUserInfo(access_token);
        console.log(userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to refresh access token index :', error);
      }
    };

    const expirationTimeMs = Date.now() + expiresIn * 1000; // Add expires_in to calculate expiration time

    const tokenRefreshTimeout = setTimeout(
      refreshAccessToken,
      expirationTimeMs,
    );
    return () => clearTimeout(tokenRefreshTimeout);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-5 gap-2 p-2">
      {/* Left column */}
      <div className="col-span-1 flex flex-col">
        <div className="h-32 bg-primary rounded-lg flex items-center">
          {user && (
            <div className="flex">
              <div className="flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.images[0].url}
                  width="70"
                  height="70"
                  alt="User Profile"
                  className="rounded-full"
                />
              </div>
              <div className="flex-col">
                <p className="text-white text-center font-bold">
                  Hello, {user.display_name}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="h-32 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Middle column */}
      <div className="col-span-3 flex flex-col">
        <div className="h-32 bg-primary rounded-lg"></div>
        <div className="h-32 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Right column */}
      <div className="col-span-1 flex flex-col">
        <div className="h-64 bg-primary rounded-lg"></div>
        <div className="h-72 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Bottom column */}
      <div className="col-span-5 rounded-lg bg-primary"></div>
    </div>
  );
}
