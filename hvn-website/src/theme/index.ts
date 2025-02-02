import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#FF6B35', // Vibrant Orange
      600: '#E85D31', // Darker Orange
      700: '#D0532C', // Even Darker Orange
      800: '#B84927', // Deep Orange
      900: '#A03F22', // Very Deep Orange
    },
    festival: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3', // Bright Blue
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    accent: {
      50: '#F4FBF7',
      100: '#E8F7EF',
      200: '#D1EFE0',
      300: '#BAE7D1',
      400: '#A3DFC2',
      500: '#4CAF50', // Fresh Green
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.600',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.700' : 'brand.700',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.50' : 'brand.50',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.100' : 'brand.100',
          },
        }),
        ghost: (props: any) => ({
          color: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.50' : 'brand.50',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.100' : 'brand.100',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'md',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          borderRadius: 'lg',
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          boxShadow: 'lg',
          p: 6,
        },
        header: {
          pb: 2,
        },
        body: {
          py: 2,
        },
        footer: {
          pt: 2,
        },
      }),
    },
  },
});

export default theme;
