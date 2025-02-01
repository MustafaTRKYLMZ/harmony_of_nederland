import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Divider,
  VStack,
  HStack,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

export default function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  const footerBg = useColorModeValue('gray.100', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverColor = useColorModeValue('festival.500', 'festival.300');
  
  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/hvn', label: 'Facebook' },
    { icon: RiTwitterXFill, href: 'https://x.com/hvn', label: 'X (Twitter)' },
    { icon: FaInstagram, href: 'https://instagram.com/hvn', label: 'Instagram' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/hvn', label: 'LinkedIn' },
  ];

  return (
    <Box
      bg={footerBg}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Container maxW="container.xl" py={10}>
        <VStack spacing={10}>
          {/* Main Footer Content */}
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 16 }}
            w="full"
            justify="space-between"
            align={{ base: 'center', md: 'flex-start' }}
          >
            {/* Logo and Description */}
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4} flex={1}>
              <Heading size="md" color={useColorModeValue('festival.600', 'festival.300')}>
                HvN
              </Heading>
              <Text fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
                {t('footer.description', 'Celebrating Dutch culture and fostering community connections')}
              </Text>
            </VStack>

            {/* Quick Links */}
            <Stack direction="row" spacing={8} flex={1} justify="center">
              <VStack align="flex-start" spacing={3}>
                <Text fontWeight="bold" fontSize="sm">
                  {t('footer.quickLinks')}
                </Text>
                <Link href="/about" style={{ textDecoration: 'none' }}>
                  <Text fontSize="sm" _hover={{ color: hoverColor }}>
                    {t('nav.about')}
                  </Text>
                </Link>
                <Link href="/events" style={{ textDecoration: 'none' }}>
                  <Text fontSize="sm" _hover={{ color: hoverColor }}>
                    {t('nav.events')}
                  </Text>
                </Link>
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <Text fontSize="sm" _hover={{ color: hoverColor }}>
                    {t('nav.contact')}
                  </Text>
                </Link>
              </VStack>
              <VStack align="flex-start" spacing={3}>
                <Text fontWeight="bold" fontSize="sm">
                  {t('footer.legal')}
                </Text>
                <Link href="/privacy-policy" style={{ textDecoration: 'none' }}>
                  <Text fontSize="sm" _hover={{ color: hoverColor }}>
                    {t('footer.privacy')}
                  </Text>
                </Link>
                <Link href="/terms-of-service" style={{ textDecoration: 'none' }}>
                  <Text fontSize="sm" _hover={{ color: hoverColor }}>
                    {t('footer.terms')}
                  </Text>
                </Link>
                <Link href="/cookie-policy" style={{ textDecoration: 'none' }}>
                  <Text fontSize="sm" _hover={{ color: hoverColor }}>
                    {t('footer.cookies')}
                  </Text>
                </Link>
              </VStack>
            </Stack>

            {/* Social Links */}
            <VStack spacing={4} align={{ base: 'center', md: 'flex-end' }} flex={1}>
              <Text fontWeight="bold" fontSize="sm">
                {t('footer.followUs')}
              </Text>
              <HStack spacing={2}>
                {socialLinks.map((social) => (
                  <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Box
                      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                      rounded={'full'}
                      w={8}
                      h={8}
                      cursor={'pointer'}
                      as={'div'}
                      display={'inline-flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      transition={'background 0.3s ease'}
                      _hover={{
                        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
                      }}
                    >
                      <Icon as={social.icon} boxSize={5} />
                    </Box>
                  </Link>
                ))}
              </HStack>
            </VStack>
          </Stack>

          <Divider borderColor={borderColor} />

          {/* Copyright */}
          <HStack
            w="full"
            justify="space-between"
            fontSize="sm"
            flexDir={{ base: 'column', sm: 'row' }}
            spacing={{ base: 2, sm: 0 }}
            textAlign="center"
          >
            <Text>
              {currentYear} HvN. {t('footer.rights')}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {t('footer.madeWith')} {t('footer.inNetherlands')}
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
