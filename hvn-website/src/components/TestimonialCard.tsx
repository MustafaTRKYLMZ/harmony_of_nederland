import {
  Box,
  Flex,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const MotionBox = motion(Box);

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <MotionBox
      maxW="100%"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      rounded="xl"
      p={6}
      overflow="hidden"
      position="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
        transition: "all 0.3s ease",
      }}
    >
      {/* Quotation Mark */}
      <Text
        position="absolute"
        top="8px"
        left="16px"
        fontSize="6xl"
        color={useColorModeValue("brand.100", "brand.900")}
        opacity={0.2}
        zIndex={0}
        lineHeight={1}
      >
        "
      </Text>

      <Stack spacing={4}>
        <Text
          color={useColorModeValue("gray.600", "gray.300")}
          fontSize="md"
          position="relative"
          zIndex={1}
          lineHeight="tall"
        >
          {testimonial.content}
        </Text>
        <Flex align="center" mt={8}>
          <Avatar
            src={testimonial.image}
            name={testimonial.name}
            size="md"
            mr={4}
            loading="lazy"
          />
          <Stack direction="column" spacing={0} fontSize="sm">
            <Text fontWeight={600}>{testimonial.name}</Text>
            <Text color={useColorModeValue("gray.500", "gray.400")}>
              {testimonial.role}
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </MotionBox>
  );
}
