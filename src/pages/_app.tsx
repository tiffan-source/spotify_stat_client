import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const rubikFont = localFont({
  variable: '--rubik-font',
  display: 'swap',
  src: [
    {
      path: 'fonts/Rubik-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/Rubik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/Rubik-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/Rubik-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: 'fonts/Rubik-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/Rubik-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/Rubik-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${rubikFont.variable}`}>
      <div className="noise">
        <div className="w-embed"></div>
        <div className="noise-inner"></div>
      </div>
      <Component {...pageProps} />
    </main>
  );
}
