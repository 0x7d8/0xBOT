import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Text,
  Flex,
  Heading,
  useColorModeValue,
  Image,
  Button,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import { TbListSearch, TbRocket, TbHandClick } from 'react-icons/all'
import LogoLight from '/src/static/LogoLight.svg'
import LogoDark from '/src/static/LogoDark.svg'

import Animated from '/src/Animated'
import axios from 'axios'

/* ---------------- *
 * Version          *
 * ---------------- */
const version = '3.5.6'

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
  const SwitchImage = useColorModeValue(LogoLight, LogoDark)

  let size = '30rem'
  if (width < 1000) { size = '50%' }

  return (
    <Flex alignItems="center" marginTop="2rem" justifyContent="center">
      <Flex
        w="100%"
        maxW="50rem"
        flexDirection="column"
        backgroundColor={useColorModeValue('gray.100', 'gray.900')}
        p={12}
        borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        borderWidth="1px"
        borderRadius="1rem"
        className="shadow-md"
      >
        <Image src={SwitchImage} alt="Upgrade your Server" w={size} alignSelf="center" />
        <Heading
          mt="1rem"
          mb="1rem"
        >
          <Flex flexDirection="column">
            0xBOT
            <Text fontSize="lg">{version}</Text>
          </Flex>
        </Heading>
        <Button
          alignSelf="center"
          width="15rem"
          variant="outline"
          colorScheme="gray"
          leftIcon={<TbRocket size={24} />}
          onClick={() => document.location.replace('https://discord.com/api/oauth2/authorize?client_id=1001944224545128588&redirect_uri=https%3A%2F%2F0xbot.de%2F&response_type=token&scope=identify%20email%20guilds')}
        >
          GET STARTED
        </Button>
      </Flex>
    </Flex>
  )
}; function GetStarted() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/global`)
      .then((res) => {
        setStats(res.data)
      })
  }, [])

  return (
    <Flex alignItems="center" justifyContent="center" marginTop="5rem">
      <Flex
        w="100%"
        maxW="50rem"
        backgroundColor={useColorModeValue('gray.100', 'gray.900')}
        flexDirection="column"
        p={12}
        borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        borderWidth="1px"
        borderRadius="1rem"
        className="shadow-md"
      >
        <Heading
          mt="-2rem"
          mb="1rem"
        >
          STATISTICS
        </Heading>
        
        <Flex>
          <Stat
            w="45%"
            py="5"
            mr="0.5rem"
            px={{ base: 2, md: 4 }}
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
          >
            <Flex justifyContent="space-between">
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight="medium">
                  COMMANDS
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="medium">
                  {stats.commands}
                </StatNumber>
              </Box>
              <Box
                my="auto"
                color={useColorModeValue('gray.800', 'gray.200')}
                alignContent="center"
              >
                <TbHandClick size={48} />
              </Box>
            </Flex>
          </Stat>

          <Stat
            w="45%"
            py="5"
            ml="0.5rem"
            px={{ base: 2, md: 4 }}
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
          >
            <Flex justifyContent="space-between">
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight="medium">
                  BUTTONS
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="medium">
                  {stats.buttons}
                </StatNumber>
              </Box>
              <Box
                my="auto"
                color={useColorModeValue('gray.800', 'gray.200')}
                alignContent="center"
              >
                <TbHandClick size={48} />
              </Box>
            </Flex>
          </Stat>
        </Flex>
        <Flex mt="1rem">
          <Stat
            w="100%"
            py="5"
            px={{ base: 2, md: 4 }}
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
          >
            <Flex justifyContent="space-between">
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight="medium">
                  MODALS
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="medium">
                  {stats.modals}
                </StatNumber>
              </Box>
              <Box
                my="auto"
                color={useColorModeValue('gray.800', 'gray.200')}
                alignContent="center"
              >
                <TbHandClick size={48} />
              </Box>
            </Flex>
          </Stat>
        </Flex>

        <Button
          mt="2rem"
          alignSelf="center"
          width="20rem"
          variant="outline"
          colorScheme="gray"
          leftIcon={<TbListSearch size={24} />}
          onClick={() => navigate('/transactions') }
        >
          TRANSACTION BROWSER
        </Button>
      </Flex>
    </Flex>
  )
}
function Home() {
  return (
    <Animated>
      <Box textAlign="center" fontSize="xl" mt="6.2rem">
        <Grid minH="0%" p={3}>
          <Bot />
          <GetStarted />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Home