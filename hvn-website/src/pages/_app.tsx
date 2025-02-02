import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from '@/theme';
import Layout from '@/components/Layout';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Layout>
          <Box flex="1">
            <Component {...pageProps} />
          </Box>
        </Layout>
      </Box>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
