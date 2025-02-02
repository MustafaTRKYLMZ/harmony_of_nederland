import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image as ChakraImage,
  useColorModeValue,
  Icon,
  HStack,
  Circle,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FaHandshake, FaUsers, FaGlobe, FaCircle, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';

const MotionBox = motion(Box);

const AboutPage: NextPage = () => {
  const { t } = useTranslation(['about', 'common']);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const iconColor = useColorModeValue('purple.500', 'purple.300');
  const headingColor = useColorModeValue('gray.700', 'gray.200');
  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      icon: FaHandshake,
      title: t('about:features.cultural.title'),
      description: t('about:features.cultural.description'),
    },
    {
      icon: FaUsers,
      title: t('about:features.community.title'),
      description: t('about:features.community.description'),
    },
    {
      icon: FaGlobe,
      title: t('about:features.integration.title'),
      description: t('about:features.integration.description'),
    },
  ];

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80',
      title: t('about:slides.cultural.title'),
      description: t('about:slides.cultural.description'),
    },
    {
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80',
      title: t('about:slides.community.title'),
      description: t('about:slides.community.description'),
    },
    {
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80',
      title: t('about:slides.integration.title'),
      description: t('about:slides.integration.description'),
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={bgColor} 
        py={20}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading as="h1" size="2xl" mb={4}>
                {t('about:title')}
              </Heading>
              <Text fontSize="xl" maxW="3xl" mb={4}>
                {t('about:subtitle')}
              </Text>
              <Text fontSize="lg" maxW="2xl" color={useColorModeValue('gray.600', 'gray.400')}>
                {t('about:partnership.text')}{' '}
                <Link
                  href={t('about:partnership.sanatUrl')}
                  color={useColorModeValue('festival.500', 'festival.300')}
                  isExternal
                >
                  {t('about:partnership.sanat')}
                </Link>{' '}
                {t('about:partnership.and')}{' '}
                <Link
                  href={t('about:partnership.freedomUrl')}
                  color={useColorModeValue('festival.500', 'festival.300')}
                  isExternal
                >
                  {t('about:partnership.freedom')}
                </Link>
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      </Box>

      {/* What We Do Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={16}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <VStack
                  bg={cardBg}
                  p={8}
                  borderRadius="lg"
                  boxShadow="md"
                  spacing={4}
                  height="full"
                >
                  <Icon as={feature.icon} w={10} h={10} color={iconColor} />
                  <Heading as="h3" size="md" textAlign="center">
                    {feature.title}
                  </Heading>
                  <Text textAlign="center">
                    {feature.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Slider Section */}
      <Box bg={bgColor} py={16}>
        <Container maxW="container.xl">
          <Box position="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={false}
              autoplay={{ 
                delay: 5000, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              style={{ 
                borderRadius: '1rem', 
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Box 
                    position="relative" 
                    height="600px"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
                      zIndex: 1
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      quality={90}
                      priority={index === 0}
                    />
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      p={8}
                      color="white"
                      zIndex={2}
                    >
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Heading as="h3" size="lg" mb={2}>
                          {slide.title}
                        </Heading>
                        <Text 
                          fontSize="md"
                          maxW="2xl"
                          sx={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}
                        >
                          {slide.description}
                        </Text>
                      </MotionBox>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Pagination */}
            <HStack 
              justify="center" 
              mt={4} 
              spacing={3}
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              zIndex={2}
            >
              {slides.map((_, index) => (
                <Circle
                  key={index}
                  size={index === activeSlide ? "3" : "2"}
                  bg={index === activeSlide ? "white" : "whiteAlpha.700"}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    transform: 'scale(1.2)',
                    bg: 'white'
                  }}
                  onClick={() => {
                    const swiper = document.querySelector('.swiper')?.swiper as SwiperType;
                    if (swiper) {
                      swiper.slideTo(index);
                    }
                  }}
                />
              ))}
            </HStack>
          </Box>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
          {/* Mission */}
          <Box>
            <VStack align="start" spacing={6}>
              <Heading as="h2" size="xl" color={headingColor}>
                {t('about:mission.title')}
              </Heading>
              <Text>{t('about:mission.description')}</Text>
              <List spacing={3}>
                {t('about:mission.points', { returnObjects: true }).map((point: string, index: number) => (
                  <ListItem key={index} display="flex" alignItems="center">
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    <Text>{point}</Text>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Box>

          {/* Vision */}
          <Box>
            <VStack align="start" spacing={6}>
              <Heading as="h2" size="xl" color={headingColor}>
                {t('about:vision.title')}
              </Heading>
              <Text>{t('about:vision.description')}</Text>
              <List spacing={3}>
                {t('about:vision.points', { returnObjects: true }).map((point: string, index: number) => (
                  <ListItem key={index} display="flex" alignItems="center">
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    <Text>{point}</Text>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Core Values Section */}
      <Box bg={bgColor} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading as="h2" size="xl" textAlign="center" color={headingColor}>
              {t('about:values.title')}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={8} width="full">
              {t('about:values.list', { returnObjects: true }).map((value: any, index: number) => (
                <VStack
                  key={index}
                  bg={cardBg}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  spacing={4}
                  height="full"
                >
                  <Heading as="h3" size="md" textAlign="center">
                    {value.title}
                  </Heading>
                  <Text textAlign="center">
                    {value.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>


    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'nl', ['about', 'common'])),
    },
  };
};

export default AboutPage;
