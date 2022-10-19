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
} from '@chakra-ui/react';
import { NavBar } from '../NavBar'

import LogoLight from '../static/LogoLight.svg'
import LogoDark from '../static/LogoDark.svg'

import Animated from '../Animated'

/* ---------------- *
 * Version          *
 * ---------------- */
const version = '3.0.0'

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
}; function Bot() {
  const width = useWindowDimensions().width
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')
  const SwitchImage = useColorModeValue(LogoLight, LogoDark)

  let size = '30rem'
  if (width < 1000) { size = '50%' }

  return (
    <Flex alignItems="center" marginTop="2rem">
              <Flex
                w="100%"
                flexDirection="column"
                p={12}
                borderRadius="2rem"
              >
                <Image src={SwitchImage} alt="Upgrade your Server" w={size} alignSelf="center" />
                <Heading
                  mt='1rem'
                  mb={6}
                  color={SwitchIconColor}
                >
                  0xBOT<br/>{version}
                </Heading>
              </Flex>
            </Flex>
  )
};
function GetStarted() {
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
                  color="teal"
                  onClick={() => document.location.replace('https://discord.com/api/oauth2/authorize?client_id=1005105495356481636&redirect_uri=http%3A%2F%2Fde-01.paperstudios.de%3A3001%2F&response_type=token&scope=identify%20guilds')}
                >
                  GET STARTED
                </Button>
              </Flex>
            </Flex>
  )
}; function Home() {
  return (
    <Animated>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="0%" p={3}>
            <NavBar/>
            <Bot />
            <GetStarted />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Home;