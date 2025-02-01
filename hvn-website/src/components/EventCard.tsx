import {
  Box,
  Text,
  Stack,
  Heading,
  Button,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { Event } from '@/types/event';
import NextLink from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { nl, enUS } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { getImageUrl } from '@/utils/media';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dateLocale = locale === 'nl' ? nl : enUS;

  const isUpcomingEvent = () => {
    const eventDate = new Date(event.startDate);
    const now = new Date();
    return eventDate > now;
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      <Box position="relative" height="200px">
        <Image
          src={getImageUrl(event.heroImage)}
          alt={event.heroImage?.alternativeText || event.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 384px"
          priority={false}
        />
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme={isUpcomingEvent() ? 'green' : 'gray'}
        >
          {isUpcomingEvent() ? t('events.upcoming') : t('events.past')}
        </Badge>
      </Box>

      <Box p={6}>
        <Box>
          <Heading size="md" mb={2}>
            {event.title}
          </Heading>

          <Stack direction="row" spacing={4} align="center">
            <Box>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize="sm"
                fontWeight="bold"
              >
                {event.startDate &&
                  format(new Date(event.startDate), 'PPP', {
                    locale: dateLocale,
                  })}
              </Text>
              <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize="sm">
                {event.location}
              </Text>

              <NextLink href={`/events/${event.slug}`} style={{ textDecoration: 'none', width: '100%', display: 'block', marginTop: '1rem' }}>
                <Button
                  variant="solid"
                  colorScheme={isUpcomingEvent() ? 'brand' : 'gray'}
                  size="sm"
                  width="full"
                >
                  {t('events.details')}
                </Button>
              </NextLink>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
