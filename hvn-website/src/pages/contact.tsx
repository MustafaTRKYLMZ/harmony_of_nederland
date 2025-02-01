import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Text,
  useToast,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { EmailIcon, PhoneIcon, TimeIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: NextPage = () => {
  const { t } = useTranslation(['contact', 'common']);
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Burada form verilerini API'ye gönderme işlemi yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı

      toast({
        title: t('contact:success.title'),
        description: t('contact:success.message'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: t('contact:error.title'),
        description: t('contact:error.message'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Box bg={bgColor} py={20}>
        <Container maxW="container.xl">
          <Heading as="h1" size="2xl" mb={8} color={headingColor}>
            {t('contact:title')}
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {/* Contact Form */}
            <VStack as="form" onSubmit={handleSubmit} spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel color={headingColor}>{t('contact:form.name')}</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact:form.namePlaceholder')}
                  bg={bgColor}
                  borderColor="gray.300"
                  _hover={{ borderColor: 'brand.300' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
                  color={textColor}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={headingColor}>{t('contact:form.email')}</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact:form.emailPlaceholder')}
                  bg={bgColor}
                  borderColor="gray.300"
                  _hover={{ borderColor: 'brand.300' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
                  color={textColor}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={headingColor}>{t('contact:form.subject')}</FormLabel>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact:form.subjectPlaceholder')}
                  bg={bgColor}
                  borderColor="gray.300"
                  _hover={{ borderColor: 'brand.300' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
                  color={textColor}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={headingColor}>{t('contact:form.message')}</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact:form.messagePlaceholder')}
                  rows={6}
                  bg={bgColor}
                  borderColor="gray.300"
                  _hover={{ borderColor: 'brand.300' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}
                  color={textColor}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={isSubmitting}
              >
                {t('contact:form.submit')}
              </Button>
            </VStack>

            {/* Contact Information */}
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading as="h3" size="md" mb={4} color={headingColor}>
                  {t('contact:info.title')}
                </Heading>
                <VStack spacing={4} align="start">
                  <Box display="flex" alignItems="center">
                    <Icon as={FaMapMarkerAlt} mr={2} />
                    <Text color={textColor}>Amsterdam, Netherlands</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <EmailIcon mr={2} />
                    <Text color={textColor}>info@harmonievannederland.com</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <PhoneIcon mr={2} />
                    <Text color={textColor}>+31 20 123 4567</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <TimeIcon mr={2} />
                    <Text color={textColor}>{t('contact:info.hours')}</Text>
                  </Box>
                </VStack>
              </Box>

              <Box>
                <Heading as="h3" size="md" mb={4} color={headingColor}>
                  {t('contact:social.title')}
                </Heading>
                <VStack spacing={2} align="start">
                  <Button variant="link" colorScheme="blue">Facebook</Button>
                  <Button variant="link" colorScheme="blue">Instagram</Button>
                  <Button variant="link" colorScheme="blue">LinkedIn</Button>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'nl', ['contact', 'common'])),
    },
  };
};

export default ContactPage;
