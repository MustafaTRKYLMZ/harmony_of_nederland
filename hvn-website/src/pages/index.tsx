import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Stack,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { MdEvent, MdLocationOn, MdGroup, MdCelebration } from "react-icons/md";
import { getLatestEvents, getPastEvents } from "@/lib/strapi";
import { Event } from "@/types/event";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { nl, enUS } from "date-fns/locale";
import { getImageUrl } from "@/utils/media";

const MotionBox = motion(Box);

interface HomeProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

const features = [
  {
    icon: MdEvent,
    key: "events"
  },
  {
    icon: MdLocationOn,
    key: "locations"
  },
  {
    icon: MdGroup,
    key: "community"
  },
  {
    icon: MdCelebration,
    key: "culture"
  }
];

const HomePage: NextPage<HomeProps> = ({ upcomingEvents, pastEvents }) => {
  const { t } = useTranslation(["common", "home"]);
  const { locale } = useRouter();
  const dateLocale = locale === "nl" ? nl : enUS;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");

  return (
    <Box ref={containerRef}>
      {/* Hero Section */}
      <MotionBox
        style={{ opacity, scale }}
        position="relative"
        height="90vh"
        display="flex"
        alignItems="center"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgImage:
            "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop')",
          bgPosition: "center",
          bgSize: "cover",
          filter: "brightness(0.7)",
        }}
      >
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack
            spacing={6}
            maxW="2xl"
            mx="auto"
            textAlign="center"
            color="white"
          >
            <Heading
              as="h1"
              size="4xl"
              bgGradient="linear(to-r, festival.200, accent.200)"
              bgClip="text"
              fontWeight="extrabold"
            >
              {t("home:hero.title")}
            </Heading>
            <Text fontSize="xl" textShadow="0 2px 4px rgba(0,0,0,0.4)">
              {t("home:hero.subtitle")}
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={4} mt={8}>
              <NextLink href="/events" style={{ textDecoration: 'none' }}>
                <Box>
                  <Button
                    size="lg"
                    colorScheme="festival"
                    leftIcon={<Icon as={MdEvent} />}
                  >
                    {t("home:hero.cta.events")}
                  </Button>
                </Box>
              </NextLink>
              <NextLink href="/about" style={{ textDecoration: 'none' }}>
                <Box>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme="whiteAlpha"
                    leftIcon={<Icon as={MdGroup} />}
                  >
                    {t("home:hero.cta.about")}
                  </Button>
                </Box>
              </NextLink>
            </Stack>
          </VStack>
        </Container>
      </MotionBox>

      {/* Features Section */}
      <Box bg={bgColor} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading color={headingColor}>{t("home:features.title")}</Heading>
              <Text color={textColor} maxW="2xl">
                {t("home:features.subtitle")}
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={10}
              px={{ base: 4, lg: 0 }}
            >
              {features.map((feature) => (
                <Box
                  key={feature.key}
                  bg={cardBg}
                  p={6}
                  rounded="lg"
                  shadow="md"
                  textAlign="center"
                >
                  <Icon
                    as={feature.icon}
                    w={10}
                    h={10}
                    mb={4}
                    color="festival.500"
                  />
                  <Heading as="h3" size="md" mb={2} color={headingColor}>
                    {t(`home:features.${feature.key}.title`)}
                  </Heading>
                  <Text color={textColor}>
                    {t(`home:features.${feature.key}.description`)}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Latest Events Preview */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading
                bgGradient="linear(to-r, festival.500, accent.500)"
                bgClip="text"
              >
                {t("home:latestEvents.title")}
              </Heading>
              <Text color={textColor} maxW="2xl">
                {t("home:latestEvents.subtitle")}
              </Text>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              width="100%"
            >
              {upcomingEvents?.map((event) => (
                <NextLink
                  key={event.id}
                  href={`/events/${event.slug}`}
                  locale={locale}
                  style={{ textDecoration: 'none' }}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    bg={cardBg}
                    rounded="lg"
                    overflow="hidden"
                    shadow="md"
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Box position="relative">
                        <NextImage
                          src={getImageUrl(event.heroImage)}
                          alt={event.heroImage?.alternativeText || event.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </AspectRatio>
                    <Box p={6}>
                      <VStack align="start" spacing={2}>
                        <Heading size="md" color={headingColor}>
                          {event.title}
                        </Heading>
                        <Text color={mutedTextColor}>
                          {event.startDate
                            ? format(new Date(event.startDate), "PPP", {
                                locale: dateLocale,
                              })
                            : t("events:tba")}
                        </Text>
                        <Text color={textColor} noOfLines={3}>
                          {event.description}
                        </Text>
                      </VStack>
                    </Box>
                  </motion.div>
                </NextLink>
              ))}
            </SimpleGrid>

            <NextLink href="/events" locale={locale} style={{ textDecoration: 'none' }}>
              <Box>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="festival"
                  leftIcon={<Icon as={MdEvent} />}
                >
                  {t("home:latestEvents.viewAll")}
                </Button>
              </Box>
            </NextLink>
          </VStack>
        </Container>
      </Box>

      {/* Past Events Preview */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading
                bgGradient="linear(to-r, festival.500, accent.500)"
                bgClip="text"
              >
                {t("home:pastEvents.title")}
              </Heading>
              <Text color={textColor} maxW="2xl">
                {t("home:pastEvents.subtitle")}
              </Text>
            </VStack>
{pastEvents?.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              width="100%"
            >
              {pastEvents?.map((event) => (
                <NextLink
                  key={event.id}
                  href={`/events/${event.slug}`}
                  locale={locale}
                  style={{ textDecoration: 'none' }}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    bg={cardBg}
                    rounded="lg"
                    overflow="hidden"
                    shadow="md"
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Box position="relative">
                        <NextImage
                          src={getImageUrl(event.heroImage)}
                          alt={event.heroImage?.alternativeText || event.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </AspectRatio>
                    <Box p={6}>
                      <VStack align="start" spacing={2}>
                        <Heading size="md" color={headingColor}>
                          {event.title}
                        </Heading>
                        <Text color={mutedTextColor}>
                          {event.startDate
                            ? format(new Date(event.startDate), "PPP", {
                                locale: dateLocale,
                              })
                            : t("events:tba")}
                        </Text>
                        <Text color={textColor} noOfLines={3}>
                          {event.description}
                        </Text>
                      </VStack>
                    </Box>
                  </motion.div>
                </NextLink>
              ))}
            </SimpleGrid>
)}
            <NextLink href="/events" locale={locale} style={{ textDecoration: 'none' }}>
              <Box>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="festival"
                  leftIcon={<Icon as={MdEvent} />}
                >
                  {t("home:pastEvents.viewAll")}
                </Button>
              </Box>
            </NextLink>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        position="relative"
        py={20}
        mt={20}
        color="white"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: "linear(to-r, brand.500, festival.500)",
          opacity: 0.9,
        }}
      >
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={8} textAlign="center">
            <Heading size="2xl">{t("home:cta.title")}</Heading>
            <Text fontSize="xl" maxW="2xl">
              {t("home:cta.description")}
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              justify="center"
            >
              <NextLink href="/contact" style={{ textDecoration: 'none' }}>
                <Box>
                  <Button
                    as="a"
                    size="lg"
                    variant="outline"
                    colorScheme="whiteAlpha"
                  >
                    {t("home:cta.contact")}
                  </Button>
                </Box>
              </NextLink>
              <NextLink href="/events" style={{ textDecoration: 'none' }}>
                <Box>
                  <Button
                    as="a"
                    size="lg"
                    bg="white"
                    color="brand.500"
                    _hover={{ bg: "gray.100" }}
                  >
                    {t("home:cta.explore")}
                  </Button>
                </Box>
              </NextLink>
            </Stack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const [upcomingEvents, pastEvents] = await Promise.all([
      getLatestEvents(locale),
      getPastEvents(locale, 1, 3),
    ]);

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "nl", ["common", "home"])),
        upcomingEvents: upcomingEvents.data,
        pastEvents: pastEvents.data,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "nl", ["common", "home"])),
        upcomingEvents: [],
        pastEvents: [],
      },
      revalidate: 60,
    };
  }
};

export default HomePage;
