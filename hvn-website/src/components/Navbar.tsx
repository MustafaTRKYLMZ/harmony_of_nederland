import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import Image from 'next/image';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  const { colorMode, toggleColorMode } = useColorMode();

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: t('nav.home'),
      href: '/',
    },
    {
      label: t('nav.events'),
      children: [
        {
          label: t('nav.upcomingEvents'),
          subLabel: t('nav.upcomingEventsDesc'),
          href: '/events',
        },
        {
          label: t('nav.pastEvents'),
          subLabel: t('nav.pastEventsDesc'),
          href: '/past-events',
        },
      ],
    },
    {
      label: t('nav.about'),
      href: '/about',
    },
    {
      label: t('nav.support'),
      href: '/support-us',
    },
    {
      label: t('nav.contact'),
      href: '/contact',
    },
  ];

  const changeLanguage = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.replace({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        justify="flex-end"
      >
        <Flex flex={{ base: 1 }} justify="space-between" align="center" maxW="container.xl" ml="auto">
          <NextLink href="/" passHref>
            <Box cursor="pointer" display="flex" alignItems="center">
              <Image
                src="/images/logo/logo.png"
                alt="HvN Logo"
                width={50}
                height={50}
                style={{ 
                  borderRadius: '4px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} flex={1} justify="center">
            <DesktopNav items={NAV_ITEMS} />
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
            align="center"
          >
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                rightIcon={<ChevronDownIcon />}
              >
                {locale === 'nl' ? 'NL' : 'EN'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('nl')}>Nederlands</MenuItem>
              </MenuList>
            </Menu>

            <IconButton
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              size="sm"
            />
          </Stack>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav items={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ items }: { items: Array<NavItem> }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {items.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <NextLink href={navItem.href ?? '#'} passHref>
              <Box
                as="span"
                p={2}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                cursor="pointer"
                display="flex"
                alignItems="center"
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.children && <Icon as={ChevronDownIcon} />}
              </Box>
              </NextLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href || '#'} passHref>
      <Box
        role="group"
        display="block"
        p={2}
        rounded="md"
        cursor="pointer"
        _hover={{ bg: useColorModeValue('brand.50', 'gray.900') }}
      >
        <Stack direction="row" align="center">
          <Box>
            <Text
              transition="all .3s ease"
              _groupHover={{ color: 'brand.500' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize="sm">{subLabel}</Text>
          </Box>
          <Flex
            transition="all .3s ease"
            transform="translateX(-10px)"
            opacity={0}
            _groupHover={{ opacity: 1, transform: 'translateX(0)' }}
            justify="flex-end"
            align="center"
            flex={1}
          >
            <Icon color="brand.500" w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </NextLink>
  );
};

const MobileNav = ({ items }: { items: Array<NavItem> }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {items.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href ?? '#'} passHref>
        <Box
          py={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition="all .25s ease-in-out"
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Box>
      </NextLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children &&
            children.map((child) => (
              <NextLink key={child.label} href={child.href || '#'} passHref>
                <Box
                  py={2}
                  cursor="pointer"
                  _hover={{
                    color: useColorModeValue('brand.500', 'brand.300'),
                  }}
                >
                  {child.label}
                </Box>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
