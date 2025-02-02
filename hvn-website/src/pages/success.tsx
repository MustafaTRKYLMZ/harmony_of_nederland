import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const SuccessPage: NextPage = () => {
  const { t } = useTranslation('common');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Container maxW="container.md" py={16}>
      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        textAlign="center"
      >
        <VStack spacing={6}>
          <CheckCircleIcon w={16} h={16} color="green.500" />
          <Heading size="xl">Thank you for your purchase!</Heading>
          <Text fontSize="lg">
            Your ticket has been confirmed and will be sent to your email address.
          </Text>
          <NextLink href="/events" style={{ textDecoration: 'none' }}>
            <Button colorScheme="blue" size="lg">
              View More Events
            </Button>
          </NextLink>
        </VStack>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'nl', ['common'])),
    },
  };
};

export default SuccessPage;
