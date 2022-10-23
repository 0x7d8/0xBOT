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
  Button,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';
import { NavBar } from '../NavBar'
import { Footer } from '../Footer'

import { useNavigate } from 'react-router-dom'
import LogoLight from '../static/LogoLight.svg'
import LogoDark from '../static/LogoDark.svg'

import Animated from '../Animated'
import axios from 'axios'

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
}

function Bot() {
  const width = useWindowDimensions().width
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')
  const SwitchImage = useColorModeValue(LogoLight, LogoDark)

  let size = '30rem'
  if (width < 1000) { size = '50%' }

  return (
    <Flex alignItems="center" marginTop="2rem" justifyContent="center">
              <Flex
                w="50%"
                flexDirection="column"
                backgroundColor={useColorModeValue('gray.100', 'gray.900')}
                p={12}
                borderColor="whiteAlpha.300"
                borderWidth="1px"
                borderRadius="1rem"
                boxShadow="lg"
              >
                <Image src={SwitchImage} alt="Upgrade your Server" w={size} alignSelf="center" />
                <Heading
                  mt='1rem'
                  mb={6}
                  color={SwitchIconColor}
                >
                  0xBOT<br/>{version}
                </Heading>
                <Button
                  alignSelf="center"
                  width="10rem"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => document.location.replace('https://discord.com/api/oauth2/authorize?client_id=1001944224545128588&redirect_uri=https%3A%2F%2F0xbot.de%2F&response_type=code&scope=identify%20guilds')}
                >
                  GET STARTED
                </Button>
              </Flex>
            </Flex>
  )
};
function GetStarted() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/global`)
      .then((res) => {
        setStats(res.data)
      })
  }, [])

  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Flex alignItems="center" justifyContent="center" marginTop="5rem">
              <Flex
                w="50%"
                backgroundColor={useColorModeValue('gray.100', 'gray.900')}
                flexDirection="column"
                p={12}
                borderColor="whiteAlpha.300"
                borderWidth="1px"
                borderRadius="1rem"
                boxShadow="lg"
              >
                <Heading
                  mt='-2rem'
                  mb={6}
                  color={SwitchIconColor}
                >
                  STATISTICS
                </Heading>
                <Stat
                  color={SwitchIconColor}
                  border="1px"
                  borderRadius="0.5rem"
                  borderColor="whiteAlpha.300"
                  alignSelf="center"
                  w="50%"
                  mt="2rem"
                >
                  <StatLabel>Commands Executed</StatLabel>
                  <StatNumber>{stats.commands}</StatNumber>
                </Stat>
                <Stat
                  color={SwitchIconColor}
                  border="1px"
                  borderRadius="0.5rem"
                  borderColor="whiteAlpha.300"
                  alignSelf="center"
                  w="50%"
                  mt="2rem"
                >
                  <StatLabel>Buttons Executed</StatLabel>
                  <StatNumber>{stats.buttons}</StatNumber>
                </Stat>
                <Stat
                  color={SwitchIconColor}
                  border="1px"
                  borderRadius="0.5rem"
                  borderColor="whiteAlpha.300"
                  alignSelf="center"
                  w="50%"
                  mt="2rem"
                >
                  <StatLabel>Modals Submitted</StatLabel>
                  <StatNumber>{stats.modals}</StatNumber>
                </Stat>
                <Button
                  mt="2rem"
                  alignSelf="center"
                  width="20rem"
                  variant="outline"
                  colorScheme="gray"
                  onClick={() => { navigate('/transactions') }}
                >
                  TRANSACTION BROWSER
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
            <Footer />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Home;