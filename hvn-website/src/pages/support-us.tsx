import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  List,
  ListItem,
  ListIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FaHandHoldingHeart, FaUsers, FaHandshake } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SupportUsPage = () => {
  const { t } = useTranslation('support');
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'donate' | 'volunteer' | 'partner' | 'sponsor'>('donate');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    amount: '',
    sponsorshipTier: '',
    availability: '',
    skills: '',
    organization: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDonateClick = () => {
    setModalType('donate');
    onOpen();
  };

  const handleVolunteerClick = () => {
    setModalType('volunteer');
    onOpen();
  };

  const handlePartnerClick = () => {
    setModalType('partner');
    onOpen();
  };

  const handleSponsorClick = (tier: string) => {
    setModalType('sponsor');
    setFormData(prev => ({ ...prev, sponsorshipTier: tier }));
    onOpen();
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: modalType, ...formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast({
        title: t('form.success'),
        description: t('form.successMessage'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        amount: '',
        sponsorshipTier: '',
        availability: '',
        skills: '',
        organization: '',
      });
    } catch (error) {
      toast({
        title: t('form.error'),
        description: t('form.errorMessage'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('festival.500', 'festival.300');

  const sponsorshipTiers = [
    {
      name: t('sponsorship.bronze.name'),
      price: '€500',
      benefits: [
        t('sponsorship.bronze.benefit1'),
        t('sponsorship.bronze.benefit2'),
        t('sponsorship.bronze.benefit3'),
      ],
      color: 'orange.400',
    },
    {
      name: t('sponsorship.silver.name'),
      price: '€1000',
      benefits: [
        t('sponsorship.silver.benefit1'),
        t('sponsorship.silver.benefit2'),
        t('sponsorship.silver.benefit3'),
        t('sponsorship.silver.benefit4'),
      ],
      color: 'gray.400',
    },
    {
      name: t('sponsorship.gold.name'),
      price: '€2500',
      benefits: [
        t('sponsorship.gold.benefit1'),
        t('sponsorship.gold.benefit2'),
        t('sponsorship.gold.benefit3'),
        t('sponsorship.gold.benefit4'),
        t('sponsorship.gold.benefit5'),
      ],
      color: 'yellow.400',
      featured: true,
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" pt={{ base: 24, md: 32 }}>
        <VStack spacing={16}>
          {/* Hero Section */}
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="2xl" mb={6}>
              {t('title')}
            </Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto">
              {t('subtitle')}
            </Text>
          </Box>

          {/* Support Options */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
            {/* Donate */}
            <Flex
              direction="column"
              p={8}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              h="full"
              _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
            >
              <VStack spacing={4} flex="1" align="flex-start">
                <Icon as={FaHandHoldingHeart} w={10} h={10} color={accentColor} />
                <Heading size="md">{t('donate.title')}</Heading>
                <Text color="gray.500">{t('donate.description')}</Text>
              </VStack>
              <Button
                mt={6}
                colorScheme="festival"
                size="lg"
                w="full"
                leftIcon={<FaHandHoldingHeart />}
                onClick={handleDonateClick}
              >
                {t('donate.button')}
              </Button>
            </Flex>

            {/* Volunteer */}
            <Flex
              direction="column"
              p={8}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              h="full"
              _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
            >
              <VStack spacing={4} flex="1" align="flex-start">
                <Icon as={FaUsers} w={10} h={10} color={accentColor} />
                <Heading size="md">{t('volunteer.title')}</Heading>
                <Text color="gray.500">{t('volunteer.description')}</Text>
              </VStack>
              <Button
                mt={6}
                colorScheme="festival"
                size="lg"
                w="full"
                variant="outline"
                leftIcon={<FaUsers />}
                onClick={handleVolunteerClick}
              >
                {t('volunteer.button')}
              </Button>
            </Flex>

            {/* Partner */}
            <Flex
              direction="column"
              p={8}
              bg={cardBg}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
              h="full"
              _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
            >
              <VStack spacing={4} flex="1" align="flex-start">
                <Icon as={FaHandshake} w={10} h={10} color={accentColor} />
                <Heading size="md">{t('partner.title')}</Heading>
                <Text color="gray.500">{t('partner.description')}</Text>
              </VStack>
              <Button
                mt={6}
                colorScheme="festival"
                size="lg"
                w="full"
                variant="outline"
                leftIcon={<FaHandshake />}
                onClick={handlePartnerClick}
              >
                {t('partner.button')}
              </Button>
            </Flex>
          </SimpleGrid>

          {/* Sponsorship Tiers */}
          <Box w="full">
            <Heading textAlign="center" mb={10}>
              {t('sponsorship.title')}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {sponsorshipTiers.map((tier) => (
                <Flex
                  key={tier.name}
                  direction="column"
                  p={8}
                  bg={cardBg}
                  rounded="xl"
                  shadow={tier.featured ? 'xl' : 'md'}
                  borderWidth="1px"
                  borderColor={tier.featured ? accentColor : borderColor}
                  position="relative"
                  transform={tier.featured ? 'scale(1.05)' : 'none'}
                  h="full"
                >
                  {tier.featured && (
                    <Badge
                      colorScheme="festival"
                      position="absolute"
                      top="-3"
                      right="-3"
                      rounded="full"
                      px={3}
                      py={1}
                    >
                      {t('sponsorship.popular')}
                    </Badge>
                  )}
                  <VStack spacing={6} flex="1" align="stretch">
                    <Heading size="lg" color={tier.color}>
                      {tier.name}
                    </Heading>
                    <Text fontSize="3xl" fontWeight="bold">
                      {tier.price}
                    </Text>
                    <List spacing={3} flex="1">
                      {tier.benefits.map((benefit, index) => (
                        <ListItem key={index}>
                          <Flex align="center">
                            <ListIcon as={MdCheckCircle} color={accentColor} />
                            <Text>{benefit}</Text>
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                  <Button
                    mt={6}
                    colorScheme="festival"
                    size="lg"
                    w="full"
                    variant={tier.featured ? 'solid' : 'outline'}
                    onClick={() => handleSponsorClick(tier.name)}
                  >
                    {t('sponsorship.select')}
                  </Button>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>

          {/* Contact CTA */}
          <Box
            bg={cardBg}
            p={10}
            rounded="xl"
            shadow="md"
            borderWidth="1px"
            borderColor={borderColor}
            textAlign="center"
            w="full"
          >
            <Heading size="lg" mb={4}>
              {t('contact.title')}
            </Heading>
            <Text color="gray.500" mb={6}>
              {t('contact.description')}
            </Text>
            <Button
              colorScheme="festival"
              size="lg"
              rightIcon={<Icon as={FaHandshake} />}
              onClick={handleContactClick}
            >
              {t('contact.button')}
            </Button>
          </Box>
        </VStack>
      </Container>
      {/* Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === 'donate' && t('form.donate.title')}
            {modalType === 'volunteer' && t('form.volunteer.title')}
            {modalType === 'partner' && t('form.partner.title')}
            {modalType === 'sponsor' && t('form.sponsor.title')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>{t('form.name')}</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('form.namePlaceholder')}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>{t('form.email')}</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('form.emailPlaceholder')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t('form.phone')}</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('form.phonePlaceholder')}
                  />
                </FormControl>

                {modalType === 'donate' && (
                  <FormControl isRequired>
                    <FormLabel>{t('form.donate.amount')}</FormLabel>
                    <Input
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder={t('form.donate.amountPlaceholder')}
                    />
                  </FormControl>
                )}

                {modalType === 'volunteer' && (
                  <>
                    <FormControl isRequired>
                      <FormLabel>{t('form.volunteer.availability')}</FormLabel>
                      <Select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                      >
                        <option value="">{t('form.volunteer.selectAvailability')}</option>
                        <option value="weekends">{t('form.volunteer.weekends')}</option>
                        <option value="weekdays">{t('form.volunteer.weekdays')}</option>
                        <option value="both">{t('form.volunteer.both')}</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>{t('form.volunteer.skills')}</FormLabel>
                      <Textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder={t('form.volunteer.skillsPlaceholder')}
                      />
                    </FormControl>
                  </>
                )}

                {(modalType === 'partner' || modalType === 'sponsor') && (
                  <FormControl isRequired>
                    <FormLabel>{t('form.organization')}</FormLabel>
                    <Input
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder={t('form.organizationPlaceholder')}
                    />
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>{t('form.message')}</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('form.messagePlaceholder')}
                  />
                </FormControl>

                <Button
                  colorScheme="festival"
                  size="lg"
                  w="full"
                  type="submit"
                  mt={4}
                >
                  {t('form.submit')}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'support'])),
    },
  };
};

export default SupportUsPage;
