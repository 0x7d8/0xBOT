import React, { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Heading,
  useColorModeValue,
  Image,
  Button
} from '@chakra-ui/react'

import { NavBar } from '/src/NavBar'

import { useNavigate } from 'react-router-dom'
import ImgDark from '/src/static/404/404Dark.svg'
import ImgLight from '/src/static/404/404Light.svg'

import Animated from '/src/Animated'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}; function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}; function Error() {
  const width = useWindowDimensions().width
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')
  const SwitchImage = useColorModeValue(ImgLight, ImgDark)

  let size = '60rem'
  if (width < 1000) { size = '100%' }

  return (
    <Flex alignItems="center" marginTop="2rem">
      <Flex
        w="100%"
        flexDirection="column"
        p={12}
        borderRadius="2rem"
      >
        <Heading
          mt='-2rem'
          mb={6}
          color={SwitchIconColor}
        >
          OOPS! Page not found.
        </Heading>

        <Image src={SwitchImage} alt="Page not found" w={size} alignSelf="center" />
      </Flex>
    </Flex>
  )
}; function GoHome() {
  const navigate = useNavigate()

  return (
    <Flex alignItems="center" marginTop="-5rem">
      <Flex
        w="100%"
        flexDirection="column"
        p={12}
        borderRadius="2rem"
      >
        <Button
          alignSelf="center"
          width="10rem"
          variant="outline"
          color="gray"
          onClick={() => navigate('/')}
        >
          GO HOME
        </Button>
      </Flex>
    </Flex>
  )
}
function NotFound() {
  return (
    <Animated>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="0%" p={3}>
            <NavBar/>
            <Error />
            <GoHome />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  )
}
  
export default NotFound