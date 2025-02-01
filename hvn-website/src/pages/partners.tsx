import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Image,
  useColorModeValue,
  Badge
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: {
    url: string;
  };
  website: string;
  organization: string;
  partnershipType: 'cultural' | 'educational' | 'commercial' | 'nonprofit';
}

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {
  const { t } = useTranslation(['common', 'partners']);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const typeColors = {
    cultural: 'purple',
    educational: 'blue',
    commercial: 'green',
    nonprofit: 'orange',
  };

  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box
        position="relative"
        height="500px"
        backgroundImage="url('/images/partners-hero.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
      />
      {/* Partners Grid */}
      <Box bg={bgColor} py={20}>
        <Container maxW="container.xl">
          <Stack spacing={8} as={Container} maxW="3xl" textAlign="center" mb={16}>
            <Heading>{t('partners:title')}</Heading>
            <Text color={textColor}>
              {t('partners:subtitle')}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {partners.map((partner) => (
              <NextLink
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  bg={boxBg}
                  p={6}
                  rounded="lg"
                  shadow="md"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)' }}
                >
                  <Box
                    height="100px"
                    position="relative"
                    mb={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src={partner.logo.url}
                      alt={partner.name}
                      maxH="100%"
                      objectFit="contain"
                    />
                  </Box>
                  <Stack spacing={3}>
                    <Heading size="md">{partner.name}</Heading>
                    <Text fontSize="sm" color={textColor}>
                      {partner.organization}
                    </Text>
                    <Badge colorScheme={typeColors[partner.partnershipType]} alignSelf="start">
                      {t(`partners:types.${partner.partnershipType}`)}
                    </Badge>
                    <Text noOfLines={3}>{partner.description}</Text>
                  </Stack>
                </Box>
              </NextLink>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/partners?locale=${locale}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch partners');
    }

    const data = await response.json();
    const partners = data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
      logo: item.attributes.logo.data ? {
        url: item.attributes.logo.data.attributes.url,
      } : null,
    }));

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'partners'])),
        partners,
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching partners:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'partners'])),
        partners: [],
      },
      revalidate: 60 * 60,
    };
  }
};
