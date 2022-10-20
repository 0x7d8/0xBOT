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
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../NavBar'
import ImageSlash from '../static/image-slash.svg';
import axios from 'axios'

import Animated from '../Animated'

const cookie = require('../scripts/cookies')
function ProfileBox() {
  let [data, setData] = useState(0)
  const [stats, setStats] = useState(0)

  useEffect(() => {
    fetchCreation();
  }, []);
  const fetchCreation = () => {
    axios
      .get('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${cookie.get('tokenType')} ${cookie.get('accessToken')}`,
        }
      })
      .then((res) => {
        cookie.set('userid', res.data.id, 360)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }; useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/user?id=${cookie.get('userid')}`)
      .then((res) => {
        setStats(res.data)
      })
  }, [])

  const navigate = useNavigate()
  const SwitchBackgroundColor = useColorModeValue('#EADDFF', '#1D192B')
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Flex alignItems="center" marginTop="2rem">
              <Flex
                w="100%"
                flexDirection="column"
                bg={SwitchBackgroundColor}
                p={12}
                borderRadius="2rem"
                boxShadow="lg"
              >
                <Heading
                  mt='-2rem'
                  mb={6}
                  color={SwitchIconColor}
                >
                  Welcome, {data.username}
                </Heading>
                <Image
                  alignSelf='center'
                  borderRadius='full'
                  boxSize='150px'
                  src={`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`}
                  fallbackSrc={ImageSlash}
                  alt='Profile Picture'
                />

                <Stat
                  color={SwitchIconColor}
                  border="1px"
                  borderRadius="0.5rem"
                  borderColor="whiteAlpha.300"
                  alignSelf="center"
                  w="25%"
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
                  w="25%"
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
                  w="25%"
                  mt="2rem"
                >
                  <StatLabel>Modals Submitted</StatLabel>
                  <StatNumber>{stats.modals}</StatNumber>
                </Stat>

                <Button
                  alignSelf="center"
                  mt="2rem"
                  colorScheme="purple"
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
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Panel;