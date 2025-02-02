import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Icon,
  SimpleGrid,
  Grid,
  AspectRatio,
  Container,
  Center,
  Spinner,
  useColorModeValue,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import {
  FaPlay,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useState } from "react";
import { getAllEvents, getEventBySlug } from "@/lib/strapi";
import {
  getImageUrl,
  getThumbnailUrl,
  getVideoUrl,
  createMediaSlides,
} from "@/utils/media";
import { Event } from "@/types/event";

interface EventDetailProps {
  event: Event;
}

interface VideoSlide {
  type: "video";
  poster: string;
  sources: {
    src: string;
    type: string;
  }[];
}

interface ImageSlide {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

type MediaSlide = VideoSlide | ImageSlide;

function MediaGrid({ event }: { event: Event }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const slides: MediaSlide[] =
    event.media?.map((media: any) => {
      if (media.mime?.startsWith("video/")) {
        return {
          type: "video",
          poster: media.previewUrl || "",
          sources: [
            {
              src: getVideoUrl(media),
              type: media.mime,
            },
          ],
          src: getVideoUrl(media),
          mimeType: media.mime,
        };
      } else {
        return {
          src: getImageUrl(media),
          alt: media.alternativeText || event.title,
          width: media.width,
          height: media.height,
        };
      }
    }) || [];

  if (!event.media?.length) {
    return null;
  }

  return (
    <Box mb={8}>
      <Heading
        as="h2"
        size="lg"
        mb={6}
        color={useColorModeValue("gray.800", "gray.200")}
      >
        Media Gallery
      </Heading>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {event.media.map((media, index) => (
          <Box
            key={media.id}
            cursor="pointer"
            onClick={() => setSelectedIndex(index)}
            position="relative"
            overflow="hidden"
            borderRadius="xl"
            boxShadow="lg"
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.03)",
              boxShadow: "2xl",
            }}
          >
            <AspectRatio ratio={1}>
              <Image
                src={getThumbnailUrl(media)}
                alt={media.alternativeText || ""}
                fill
                style={{ objectFit: "cover" }}
              />
            </AspectRatio>
            {media.mime?.startsWith("video/") && (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="purple.500"
                p={4}
                borderRadius="full"
                boxShadow="lg"
              >
                <Icon as={FaPlay} color="white" boxSize={6} />
              </Box>
            )}
          </Box>
        ))}
      </SimpleGrid>
      <Lightbox
        open={selectedIndex >= 0}
        close={() => setSelectedIndex(-1)}
        index={selectedIndex}
        slides={slides}
        plugins={[Video]}
      />
    </Box>
  );
}

export default function EventDetail({ event }: EventDetailProps) {
  const { t } = useTranslation(["common", "events"]);
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const slides = createMediaSlides(event);

  if (router.isFallback) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  if (!event) {
    return (
      <Center h="100vh">
        <Text color={useColorModeValue("gray.800", "gray.200")}>
          Event not found
        </Text>
      </Center>
    );
  }

  const isUpcomingEvent = () => {
    const eventDate = new Date(event.startDate);
    return eventDate > new Date();
  };

  return (
    <>
      <Box position="relative" h={{ base: "40vh", md: "60vh" }} mb={8}>
        <Image
          src={getImageUrl(event.heroImage)}
          alt={event.heroImage?.alternativeText || event.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

      <Container maxW="container.xl" px={4}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 320px" }} gap={8}>
          {/* Main Content - Left Column */}
          <Box>
            <Heading
              as="h1"
              size="2xl"
              mb={6}
              color={useColorModeValue("gray.800", "gray.200")}
            >
              {event.title}
            </Heading>

            <Box
              className="prose prose-lg max-w-none"
              color={useColorModeValue("gray.800", "gray.200")}
              mb={12}
            >
              <div
                dangerouslySetInnerHTML={{ __html: event.description }}
                className="mb-8"
              />
              {event.content && (
                <div dangerouslySetInnerHTML={{ __html: event.content }} />
              )}
            </Box>

            {/* Event Media Gallery */}
            <MediaGrid event={event} />
          </Box>

          {/* Sidebar - Right Column */}
          <Box>
            <Box
              bg={useColorModeValue("white", "gray.800")}
              borderRadius="xl"
              p={6}
              boxShadow="lg"
              position="sticky"
              top={4}
            >
              <Stack spacing={4}>
                <Box>
                  <HStack spacing={4} align="center">
                    <Box
                      bg={useColorModeValue("purple.50", "purple.900")}
                      p={3}
                      borderRadius="lg"
                    >
                      <Icon
                        as={FaCalendarAlt}
                        color={useColorModeValue("purple.500", "purple.300")}
                        boxSize={5}
                      />
                    </Box>
                    <Box>
                      {event.endDate && event.endDate !== event.startDate ? (
                        <VStack spacing={3} align="flex-start">
                          <Box>
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              textTransform="uppercase"
                              color={useColorModeValue("purple.500", "purple.300")}
                              letterSpacing="wide"
                              mb={1}
                            >
                              {t("events:starts")}
                            </Text>
                            <HStack spacing={2}>
                              <Text
                                fontSize="lg"
                                fontWeight="medium"
                                color={useColorModeValue("gray.800", "gray.200")}
                              >
                                {format(new Date(event.startDate), "d MMMM yyyy")}
                              </Text>
                              <Text
                                fontSize="lg"
                                color={useColorModeValue("gray.600", "gray.400")}
                              >
                                {format(new Date(event.startDate), "HH:mm")}
                              </Text>
                            </HStack>
                          </Box>
                          <Box>
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              textTransform="uppercase"
                              color={useColorModeValue("purple.500", "purple.300")}
                              letterSpacing="wide"
                              mb={1}
                            >
                              {t("events:ends")}
                            </Text>
                            <HStack spacing={2}>
                              <Text
                                fontSize="lg"
                                fontWeight="medium"
                                color={useColorModeValue("gray.800", "gray.200")}
                              >
                                {format(new Date(event.endDate), "d MMMM yyyy")}
                              </Text>
                              <Text
                                fontSize="lg"
                                color={useColorModeValue("gray.600", "gray.400")}
                              >
                                {format(new Date(event.endDate), "HH:mm")}
                              </Text>
                            </HStack>
                          </Box>
                        </VStack>
                      ) : (
                        <Box>
                          <Text
                            fontSize="lg"
                            fontWeight="medium"
                            color={useColorModeValue("gray.800", "gray.200")}
                          >
                            {format(new Date(event.startDate), "d MMMM yyyy")}
                          </Text>
                          <Text
                            fontSize="lg"
                            color={useColorModeValue("gray.600", "gray.400")}
                          >
                            {format(new Date(event.startDate), "HH:mm")}
                            {event.endDate && (
                              <>
                                {" - "}
                                {format(new Date(event.endDate), "HH:mm")}
                              </>
                            )}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </HStack>
                </Box>

                <Box>
                  <HStack spacing={4} align="center">
                    <Box
                      bg={useColorModeValue("purple.50", "purple.900")}
                      p={3}
                      borderRadius="lg"
                    >
                      <Icon
                        as={FaMapMarkerAlt}
                        color={useColorModeValue("purple.500", "purple.300")}
                        boxSize={5}
                      />
                    </Box>
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={useColorModeValue("purple.500", "purple.300")}
                        letterSpacing="wide"
                        mb={1}
                      >
                        {t("events:venue")}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="medium"
                        color={useColorModeValue("gray.800", "gray.200")}
                      >
                        {event.location}
                      </Text>
                    </Box>
                  </HStack>
                </Box>

                {event.requirements && (
                  <Box>
                    <HStack spacing={2}>
                      <Icon
                        as={FaClipboardList}
                        color={useColorModeValue("purple.500", "purple.300")}
                      />
                      <Text
                        fontWeight="bold"
                        opacity={0.8}
                        color={useColorModeValue("gray.600", "gray.400")}
                      >
                        {t("requirements")}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="lg"
                      color={useColorModeValue("gray.800", "gray.200")}
                    >
                      {event.requirements}
                    </Text>
                  </Box>
                )}

                {event.capacity && (
                  <Box>
                    <HStack spacing={2}>
                      <Icon
                        as={FaUsers}
                        color={useColorModeValue("purple.500", "purple.300")}
                      />
                      <Text
                        fontWeight="bold"
                        opacity={0.8}
                        color={useColorModeValue("gray.600", "gray.400")}
                      >
                        {t("capacity")}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="lg"
                      color={useColorModeValue("gray.800", "gray.200")}
                    >
                      {event.capacity}
                    </Text>
                  </Box>
                )}

                {event.price && (
                  <Box>
                    <HStack spacing={2}>
                      <Icon
                        as={FaMoneyBillWave}
                        color={useColorModeValue("purple.500", "purple.300")}
                      />
                      <Text
                        fontWeight="bold"
                        opacity={0.8}
                        color={useColorModeValue("gray.600", "gray.400")}
                      >
                        {t("price")}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="lg"
                      color={useColorModeValue("gray.800", "gray.200")}
                    >
                      {event.price} {event.currency}
                    </Text>
                  </Box>
                )}

                {isUpcomingEvent() && event.registrationLink && (
                  <Button
                    as="a"
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="purple"
                    size="lg"
                    width="100%"
                  >
                    {t("register")}
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={slides}
        plugins={[Video]}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ["en"] }) => {
  try {
    console.log(`[getStaticPaths] Starting with locales:`, locales);
    
    const paths = await Promise.all(
      locales.map(async (locale) => {
        console.log(`[getStaticPaths] Fetching events for locale:`, locale);
        const response = await getAllEvents(locale, 1, 100, false, undefined, false);
        console.log(`[getStaticPaths] Found ${response.data.length} events for locale:`, locale);
        
        return response.data
          .filter((event: any) => {
            if (!event.slug) {
              console.warn(`[getStaticPaths] Event missing slug:`, event);
              return false;
            }
            return true;
          })
          .map((event: any) => ({
            params: { slug: event.slug },
            locale,
          }));
      })
    );

    const flatPaths = paths.flat();
    console.log(`[getStaticPaths] Generated paths:`, flatPaths);

    return {
      paths: flatPaths,
      fallback: true,
    };
  } catch (error) {
    console.error("[getStaticPaths] Error:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale = "en",
}) => {
  try {
    console.log(`[getStaticProps] Starting with params:`, params, `locale:`, locale);

    if (!params?.slug || typeof params.slug !== "string") {
      console.log(`[getStaticProps] Invalid slug parameter:`, params?.slug);
      return {
        notFound: true,
      };
    }

    console.log(`[getStaticProps] Fetching event with slug:`, params.slug);
    const event = await getEventBySlug(params.slug, locale);

    if (!event) {
      console.log(`[getStaticProps] No event found for slug:`, params.slug);
      return {
        notFound: true,
      };
    }

    console.log(`[getStaticProps] Successfully fetched event:`, event.title);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "events"])),
        event,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("[getStaticProps] Error:", error);
    return {
      notFound: true,
    };
  }
};
