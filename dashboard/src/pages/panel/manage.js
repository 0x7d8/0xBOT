/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Heading,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Image
} from '@chakra-ui/react'
import { NavBar } from '../../NavBar'
import { Footer } from '../../Footer'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageSlash from '../../static/image-slash.svg'
import axios from 'axios'


import GeneralLanguage from '../../options/general/language'

import EconomyBusinesses from '../../options/economy/businesses'
import EconomyStocks from '../../options/economy/stocks'
import EconomyItems from '../../options/economy/items'
import EconomyCars from '../../options/economy/cars'
import EconomyLuckGames from '../../options/economy/luckgames'
import EconomyWork from '../../options/economy/work'
import EconomyRob from '../../options/economy/rob'

import FunLevels from '../../options/fun/levels'
import FunQuotes from '../../options/fun/quotes'
import FunMeme from '../../options/fun/meme'


import Animated from '../../Animated'
import { useNavigate } from 'react-router-dom'

const cookie = require('../../scripts/cookies')
const General = () => {
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Accordion
      allowMultiple
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      borderColor="whiteAlpha.300"
      borderWidth="1px"
      borderRadius="1rem"
      boxShadow="lg"
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton>
            <Box
              flex='1'
              textAlign='left'
              color={SwitchIconColor}
            >
              <center>
                <Text color={SwitchIconColor} fontSize="3xl" as="b">
                  <FontAwesomeIcon icon={faCaretDown} /> GENERAL SETTINGS
                </Text>
              </center>
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <GeneralLanguage />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}; const Economy = () => {
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Accordion
      mt="2rem"
      allowMultiple
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      borderColor="whiteAlpha.300"
      borderWidth="1px"
      borderRadius="1rem"
      boxShadow="lg"
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton>
            <Box
              flex='1'
              textAlign='left'
              color={SwitchIconColor}
            >
              <center>
                <Text color={SwitchIconColor} fontSize="3xl" as="b">
                  <FontAwesomeIcon icon={faCaretDown} /> ECONOMY SETTINGS
                </Text>
              </center>
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion
            allowMultiple
            backgroundColor={useColorModeValue('gray.100', 'gray.900')}
            borderColor="whiteAlpha.300"
            borderWidth="1px"
            borderRadius="1rem"
            boxShadow="lg"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                    color={SwitchIconColor}
                  >
                    <center>
                      <Text color={SwitchIconColor} fontSize="3xl" as="b">
                        <FontAwesomeIcon icon={faCaretDown} /> SYSTEMS
                      </Text>
                    </center>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <EconomyBusinesses />
                <EconomyStocks />
                <EconomyItems />
                <EconomyCars />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion
            mt="2rem"
            allowMultiple
            backgroundColor={useColorModeValue('gray.100', 'gray.900')}
            borderColor="whiteAlpha.300"
            borderWidth="1px"
            borderRadius="1rem"
            boxShadow="lg"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                    color={SwitchIconColor}
                  >
                    <center>
                      <Text color={SwitchIconColor} fontSize="3xl" as="b">
                        <FontAwesomeIcon icon={faCaretDown} /> OTHERS
                      </Text>
                    </center>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <EconomyLuckGames />
                <EconomyWork />
                <EconomyRob />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}; const Fun = () => {
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Accordion
      mt="2rem"
      allowMultiple
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      borderColor="whiteAlpha.300"
      borderWidth="1px"
      borderRadius="1rem"
      boxShadow="lg"
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton>
            <Box
              flex='1'
              textAlign='left'
              color={SwitchIconColor}
            >
              <center>
                <Text color={SwitchIconColor} fontSize="3xl" as="b">
                  <FontAwesomeIcon icon={faCaretDown} /> FUN SETTINGS
                </Text>
              </center>
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion
            allowMultiple
            backgroundColor={useColorModeValue('gray.100', 'gray.900')}
            borderColor="whiteAlpha.300"
            borderWidth="1px"
            borderRadius="1rem"
            boxShadow="lg"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                    color={SwitchIconColor}
                  >
                    <center>
                      <Text color={SwitchIconColor} fontSize="3xl" as="b">
                        <FontAwesomeIcon icon={faCaretDown} /> SYSTEMS
                      </Text>
                    </center>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FunLevels />
                <FunQuotes />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion
            mt="2rem"
            allowMultiple
            backgroundColor={useColorModeValue('gray.100', 'gray.900')}
            borderColor="whiteAlpha.300"
            borderWidth="1px"
            borderRadius="1rem"
            boxShadow="lg"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                    color={SwitchIconColor}
                  >
                    <center>
                      <Text color={SwitchIconColor} fontSize="3xl" as="b">
                        <FontAwesomeIcon icon={faCaretDown} /> OTHERS
                      </Text>
                    </center>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FunMeme />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
const ServerInfo = () => {
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)

  const [info, setInfo] = useState(0)
  const [stats, setStats] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.0xbot.de/fetch/guild?id=${params.get('server')}`, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      })
      .then((res) => {
        if (!res.data.success) return navigate('/panel/servers')
        setInfo(res.data)
      })
  }, []); useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/guild?id=${params.get('server')}`, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      })
      .then((res) => {
        setStats(res.data)
      })
  }, [])

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
                  {info.name}
                </Heading>
                <Image
                  alignSelf='center'
                  borderRadius='full'
                  boxSize='150px'
                  src={`https://cdn.discordapp.com/icons/${info.id}/${info.icon}.png`}
                  fallbackSrc={ImageSlash}
                  alt='Server Icon'
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
              </Flex>
            </Flex>
  )
}; const SettingContainer = () => {
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
                  CHANGE SETTINGS
                </Heading>

                <General />
                <Economy />
                <Fun />
              </Flex>
            </Flex>
  )
};
function Panel() {
  return (
    <Animated>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="0%" p={3}>
            <NavBar/>
            <ServerInfo />
            <SettingContainer />
            <Footer />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Panel;