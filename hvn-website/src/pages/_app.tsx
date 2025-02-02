import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import { useRouter } from 'next/router';
import i18next from 'i18next';
import theme from '@/theme';
import Layout from '@/components/Layout';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Initialize i18next instance
  if (!i18next.isInitialized) {
    i18next.init({
      lng: router.locale || 'nl',
      fallbackLng: 'nl',
      interpolation: { escapeValue: false },
      resources: pageProps._nextI18Next?.initialI18nStore,
    });
  }

  return (
    <I18nextProvider i18n={i18next}>
      <ChakraProvider theme={theme}>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Layout>
            <Box flex="1">
              <Component {...pageProps} />
            </Box>
          </Layout>
        </Box>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default appWithTranslation(App);
