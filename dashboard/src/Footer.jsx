import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Image,
  useColorModeValue
} from '@chakra-ui/react'

import topgg from './static/topgg.svg'
  
export function Footer() {
  return (
    <Box
      w="100%"
      mt="10rem"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderRadius="1rem"
      className="shadow-md"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 0xBOT</Text>
        <Stack direction={'row'} spacing={6}>
          <Button
            colorScheme="gray"
            variant="ghost"
            leftIcon={<Image src={topgg} color={useColorModeValue('white', 'black')} style={{ height: 34, width: 34 }} />}
            iconSpacing={0}
            onClick={() => window.location.replace('https://top.gg/bot/1001944224545128588') }
          >

          </Button>
        </Stack>
      </Container>
    </Box>
  )
}  