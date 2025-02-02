import {
  Box,
  Container,
  Stack,
  Text,
  Button,
  Heading,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Event, EventsResponse } from '@/types/event';
import EventCard from '@/components/EventCard';
import { getAllEvents } from '@/lib/strapi';
import Link from 'next/link';
import Image from 'next/image';

interface EventsPageProps {
  events: Event[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export default function EventsPage({ events, pagination }: EventsPageProps) {
  const { t } = useTranslation('common');
  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <>
      <Head>
        <title>{t('events.upcoming')} | HvN</title>
      </Head>

      <Box bg={bg} minH="100vh">
        <Box position="relative" height="70vh" width="100%" mb={8}>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="hidden"
          >
            <Image
              src="/images/hero.jpg"
              alt="HvN Cultural Festival"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              priority
              quality={90}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-b, blackAlpha.200, blackAlpha.600)"
            />
          </Box>
        </Box>

        <Container maxW="container.xl" py={16}>
          {events.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              mb={8}
            >
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </SimpleGrid>
          ) : (
            <VStack
              spacing={8}
              justify="center"
              align="center"
              minH="50vh"
              bg={useColorModeValue('white', 'gray.800')}
              rounded="lg"
              p={8}
            >
              <Image
                src="/images/no-events.svg"
                alt="No Events"
                width={300}
                height={200}
              />
              <Heading size="lg" textAlign="center">
                {t('events.noEvents')}
              </Heading>
              <Text color="gray.500" textAlign="center">
                {t('events.checkBack')}
              </Text>
            </VStack>
          )}

          {events.length > 0 && pagination.pageCount > 1 && (
            <Stack direction="row" spacing={2} justify="center" mt={8}>
              {Array.from({ length: pagination.pageCount }).map((_, i) => (
                <Link
                  key={i}
                  href={{
                    pathname: "/events",
                    query: { page: i + 1 },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    size="sm"
                    variant={i + 1 === pagination.page ? 'solid' : 'outline'}
                    colorScheme="brand"
                  >
                    {i + 1}
                  </Button>
                </Link>
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  try {
    const page = Number(query.page) || 1;
    const pageSize = 9;

    const data = await getAllEvents(locale, page, pageSize);

    if (!data || !data.data) {
      throw new Error('Invalid events response');
    }

    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        events: data.data,
        pagination: data.meta.pagination,
      },
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common'])),
        events: [],
        pagination: {
          page: 1,
          pageSize: 9,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};
