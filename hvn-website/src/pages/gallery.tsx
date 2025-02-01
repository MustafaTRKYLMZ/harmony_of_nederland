import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  city: string;
  year: number;
}

// Mock data - gerçek uygulamada Strapi'den gelecek
const mockImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/event-placeholder.svg',
    alt: 'Amsterdam Event 2024',
    city: 'Amsterdam',
    year: 2024,
  },
  {
    id: 2,
    src: '/images/event-placeholder.svg',
    alt: 'Utrecht Festival 2024',
    city: 'Utrecht',
    year: 2024,
  },
  // Daha fazla görsel eklenebilir
];

const GalleryPage: NextPage = () => {
  const { t } = useTranslation(['gallery', 'common']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const filteredImages = mockImages.filter(image => {
    const matchesCity = cityFilter === 'all' || image.city === cityFilter;
    const matchesYear = yearFilter === 'all' || image.year === parseInt(yearFilter);
    return matchesCity && matchesYear;
  });

  const cities = Array.from(new Set(mockImages.map(img => img.city)));
  const years = Array.from(new Set(mockImages.map(img => img.year)));

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Box>
      <Box bg={bgColor} py={20}>
        <Container maxW="container.xl">
          <Heading as="h1" size="2xl" mb={8}>
            {t('gallery:title')}
          </Heading>

          <HStack spacing={4} mb={8}>
            <Select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              placeholder={t('gallery:filters.city')}
            >
              <option value="all">{t('gallery:filters.allCities')}</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Select>

            <Select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              placeholder={t('gallery:filters.year')}
            >
              <option value="all">{t('gallery:filters.allYears')}</option>
              {years.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </Select>
          </HStack>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredImages.map((image) => (
              <Box
                key={image.id}
                cursor="pointer"
                onClick={() => handleImageClick(image)}
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedImage && (
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width="100%"
                height="auto"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'nl', ['gallery', 'common'])),
    },
  };
};

export default GalleryPage;
