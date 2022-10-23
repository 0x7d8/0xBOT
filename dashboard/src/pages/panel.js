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
  Stat,
  StatLabel,
  StatNumber,
  Button
} from '@chakra-ui/react'
import { NavBar } from '../NavBar'
import { Footer } from '../Footer'

import { useNavigate } from 'react-router-dom'
import ImageSlash from '../static/image-slash.svg';
import axios from 'axios'

import Animated from '../Animated'

const cookie = require('../scripts/cookies')
function ProfileBox() {
  const [stats, setStats] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/user?id=${cookie.get('userid')}`)
      .then((res) => {
        setStats(res.data)
      })
  }, [])

  const navigate = useNavigate()
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Flex alignItems="center" marginTop="2rem" justifyContent="center">
              <Flex
                w="100%"
                maxW="50rem"
                flexDirection="column"
                bg={useColorModeValue('gray.100', 'gray.900')}
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
                  Welcome, {cookie.get('username')}
                </Heading>
                <Image
                  alignSelf='center'
                  borderRadius='full'
                  boxSize='150px'
                  src={`https://cdn.discordapp.com/avatars/${cookie.get('userid')}/${cookie.get('avatar')}.png`}
                  fallbackSrc={ImageSlash}
                  alt='Profile Picture'
                />

                <Stat
                  color={SwitchIconColor}
                  border="1px"
                  borderRadius="0.5rem"
                  borderColor="whiteAlpha.300"
                  alignSelf="center"
                  w="75%"
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
                  w="75%"
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
                  w="75%"
                  mt="2rem"
                >
                  <StatLabel>Modals Submitted</StatLabel>
                  <StatNumber>{stats.modals}</StatNumber>
                </Stat>

                <Button
                  alignSelf="center"
                  mt="2rem"
                  colorScheme="gray"
                  w="fit-content"
                  onClick={() => {navigate('/panel/servers')}}
                >
                  MANAGE SERVERS
                </Button>
              </Flex>
            </Flex>
  )
}
function Panel() {    
  return (
    <Animated>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="0%" p={3}>
            <NavBar/>
            <ProfileBox />
            <Footer />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Panel;