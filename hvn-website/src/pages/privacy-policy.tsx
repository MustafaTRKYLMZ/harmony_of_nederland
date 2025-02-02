import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import type { GetStaticProps } from 'next';

export default function PrivacyPolicy() {
  const { t } = useTranslation('common');
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <>
      <Head>
        <title>Privacy Policy | HvN</title>
      </Head>

      <Box bg={bg} minH="100vh" py={20}>
        <Container maxW="container.md">
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="2xl" mb={8}>
              Privacy Policy
            </Heading>

            <VStack spacing={6} align="stretch">
              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  1. Introduction
                </Heading>
                <Text color={textColor}>
                  This Privacy Policy explains how Hollanda ve Nizamı (HvN) collects, uses, and protects your personal information. By using our website and attending our events, you agree to this policy.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  2. Information We Collect
                </Heading>
                <Text color={textColor}>
                  We collect information that you provide directly to us, including:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Name and contact information</Text>
                  <Text color={textColor}>• Event registration details</Text>
                  <Text color={textColor}>• Payment information</Text>
                  <Text color={textColor}>• Photos and videos from events</Text>
                  <Text color={textColor}>• Communication preferences</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  3. How We Use Your Information
                </Heading>
                <Text color={textColor}>
                  We use your information to:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Process event registrations</Text>
                  <Text color={textColor}>• Send event updates and newsletters</Text>
                  <Text color={textColor}>• Improve our services</Text>
                  <Text color={textColor}>• Comply with legal obligations</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  4. Media and Content Rights
                </Heading>
                <Text color={textColor}>
                  By attending our events, you acknowledge that:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Photos and videos may be taken during events</Text>
                  <Text color={textColor}>• We may use these materials for promotional purposes</Text>
                  <Text color={textColor}>• You can request removal of your image by contacting us</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  5. Data Security
                </Heading>
                <Text color={textColor}>
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  6. Your Rights
                </Heading>
                <Text color={textColor}>
                  You have the right to:
                </Text>
                <VStack spacing={2} pl={4} mt={2} align="stretch">
                  <Text color={textColor}>• Access your personal data</Text>
                  <Text color={textColor}>• Correct inaccurate data</Text>
                  <Text color={textColor}>• Request deletion of your data</Text>
                  <Text color={textColor}>• Opt-out of marketing communications</Text>
                </VStack>
              </Box>

              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  7. Contact Us
                </Heading>
                <Text color={textColor}>
                  For any privacy-related questions or concerns, please contact us at info@harmonievannederland.com
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
