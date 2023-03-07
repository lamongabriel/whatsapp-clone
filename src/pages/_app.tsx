import 'regenerator-runtime/runtime';
import type { AppProps } from 'next/app';

import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
