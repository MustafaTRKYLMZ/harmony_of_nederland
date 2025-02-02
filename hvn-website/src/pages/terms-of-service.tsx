import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import type { GetStaticProps } from 'next';

export default function TermsOfService() {
  const { t } = useTranslation('common');
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <>
      <Head>
        <title>Terms of Service | HvN</title>
      </Head>

      <Box bg={bg} minH="100vh" py={20}>
        <Container maxW="container.md">
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="2xl" mb={8}>
              Terms of Service
            </Heading>

            <VStack spacing={6} align="stretch">
              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  1. Acceptance of Terms
                </Heading>
                <Text color={textColor}>
                  By accessing and using the Hollanda ve Nizamı (HvN) website and attending our events, you agree to be bound by these Terms of Service.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  2. Intellectual Property Rights
                </Heading>
                <Text color={textColor} mb={4}>
                  All intellectual property rights related to our events and content are protected. Specifically:
                </Text>
                <VStack spacing={2} pl={4} align="stretch">
                  <Text color={textColor}>• All songs performed at our events are considered donated to our organization for its use.</Text>
                  <Text color={textColor}>• Copyright fees for songs, games, and other works used in our events have been paid to the relevant Dutch institutions.</Text>
                  <Text color={textColor}>• The content, logo, and materials on this website are owned by HvN.</Text>
                  <Text color={textColor}>• Unauthorized use, reproduction, or distribution is prohibited.</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  3. Event Participation
                </Heading>
                <Text color={textColor}>
                  When participating in our events:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Follow event rules and guidelines</Text>
                  <Text color={textColor}>• Respect other participants</Text>
                  <Text color={textColor}>• Comply with venue regulations</Text>
                  <Text color={textColor}>• Accept that photos and videos may be taken</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  4. Copyright and Performance Rights
                </Heading>
                <Text color={textColor} mb={4}>
                  Regarding performances and content at our events:
                </Text>
                <VStack spacing={2} pl={4} align="stretch">
                  <Text color={textColor} fontWeight="bold">• All songs performed at HvN events are considered donated to our organization.</Text>
                  <Text color={textColor} fontWeight="bold">• Copyright fees for all songs, games, and artistic works have been properly paid to relevant Dutch institutions.</Text>
                  <Text color={textColor}>• Performers grant HvN the right to record and use their performances.</Text>
                  <Text color={textColor}>• Recordings may be used for promotional and archival purposes.</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  5. User Responsibilities
                </Heading>
                <Text color={textColor}>
                  Users must:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Provide accurate information</Text>
                  <Text color={textColor}>• Not violate any laws or regulations</Text>
                  <Text color={textColor}>• Respect intellectual property rights</Text>
                  <Text color={textColor}>• Not engage in harmful behavior</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  6. Liability
                </Heading>
                <Text color={textColor}>
                  HvN is not liable for:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Personal injury during events</Text>
                  <Text color={textColor}>• Loss or damage of personal property</Text>
                  <Text color={textColor}>• Technical issues on the website</Text>
                  <Text color={textColor}>• Third-party content or links</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  7. Changes to Terms
                </Heading>
                <Text color={textColor}>
                  We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  8. Contact
                </Heading>
                <Text color={textColor}>
                  For questions about these terms, please contact us at info@harmonievannederland.com
                </Text>
              </Box>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
