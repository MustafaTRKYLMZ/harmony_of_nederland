import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { getPastEvents } from "@/lib/strapi";
import { Event } from "@/types/event";
import { useTranslation } from "next-i18next";
import EventCard from "@/components/EventCard";
import Link from "next/link";
import Image from "next/image";

interface PastEventsPageProps {
  events: Event[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export default function PastEventsPage({ events, pagination }: PastEventsPageProps) {
  const { t } = useTranslation(["common", "events"]);
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box minH="100vh">
      <Box position="relative" height="70vh" width="100%" mb={8}>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
        >
          <Image
            src="/images/event-hero.jpg"
            alt="HvN Past Events"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            priority
            quality={90}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, blackAlpha.200, blackAlpha.600)"
          />
        </Box>
      </Box>

      {/* Events Grid */}
      <Box bg={bgColor} py={16}>
        <Container maxW="container.xl">
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            mb={10}
            color={useColorModeValue("gray.800", "white")}
          >
            {t("common:nav.pastEvents")}
          </Heading>
          
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            width="100%"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>

          {/* Pagination */}
          {pagination.pageCount > 1 && (
            <Stack
              direction="row"
              spacing={2}
              justify="center"
              mt={10}
              align="center"
            >
              {Array.from({ length: pagination.pageCount }).map((_, i) => {
                const page = i + 1;
                const isCurrentPage = page === pagination.page;
                return (
                  <Link
                    key={page}
                    href={{
                      pathname: "/past-events",
                      query: { page },
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      size="sm"
                      variant={isCurrentPage ? "solid" : "outline"}
                      colorScheme="brand"
                    >
                      {page}
                    </Button>
                  </Link>
                );
              })}
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale = "en",
  query,
}) => {
  try {
    const page = Number(query.page) || 1;
    const pageSize = 9;

    const data = await getPastEvents(locale, page, pageSize);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "events"])),
        events: data.data,
        pagination: data.meta.pagination,
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "events"])),
        events: [],
        pagination: {
          page: 1,
          pageSize: 9,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};
