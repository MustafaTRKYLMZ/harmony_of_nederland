import { GetStaticProps } from 'next';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Stack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { getStrapi } from '@/utils/strapi';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NextLink from 'next/link';

interface SponsorsProps {
  sponsors: Array<{
    id: number;
    attributes: {
      name: string;
      organization: string;
      description: string;
      tier: 'bronze' | 'silver' | 'gold';
      website: string;
      logo: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  }>;
}

export default function Sponsors({ sponsors }: SponsorsProps) {
  const { t } = useTranslation('common');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.300');

  const tierOrder = {
    gold: 1,
    silver: 2,
    bronze: 3,
  };

  const sortedSponsors = [...sponsors].sort((a, b) => 
    tierOrder[a.attributes.tier as keyof typeof tierOrder] - 
    tierOrder[b.attributes.tier as keyof typeof tierOrder]
  );

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" pt={{ base: 24, md: 32 }}>
        <Stack spacing={8}>
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" mb={4} color={textColor}>
              Our Sponsors
            </Heading>
            <Text fontSize="xl" color={mutedTextColor}>
              Thank you to all our sponsors for their generous support
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {sortedSponsors.map((sponsor) => (
              <NextLink
                key={sponsor.id}
                href={sponsor.attributes.website || "#"}
                passHref
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  bg={boxBg}
                  p={6}
                  borderRadius="lg"
                  shadow="base"
                  textAlign="center"
                >
                  <Stack spacing={4}>
                    <Box height="120px" position="relative">
                      <Image
                        src={sponsor.attributes.logo.data.attributes.url}
                        alt={sponsor.attributes.name}
                        maxH="120px"
                        objectFit="contain"
                        mx="auto"
                      />
                    </Box>
                    <Badge
                      colorScheme={sponsor.attributes.tier}
                      p={2}
                      borderRadius="md"
                    >
                      {sponsor.attributes.tier.toUpperCase()} SPONSOR
                    </Badge>
                    <Heading as="h3" size="md" color={textColor}>
                      {sponsor.attributes.name}
                    </Heading>
                    <Text color={mutedTextColor}>{sponsor.attributes.organization}</Text>
                    <Text noOfLines={3} color={textColor}>{sponsor.attributes.description}</Text>
                    {sponsor.attributes.website && (
                      <NextLink
                        href={sponsor.attributes.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        Visit Website
                      </NextLink>
                    )}
                  </Stack>
                </Box>
              </NextLink>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const response = await getStrapi('/sponsors', {
      populate: ['logo'],
      filters: {
        status: 'active',
      },
    });

    return {
      props: {
        sponsors: response.data,
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return {
      props: {
        sponsors: [],
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
      revalidate: 60,
    };
  }
};
