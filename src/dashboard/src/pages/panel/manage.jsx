import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Center,
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

import { TbCaretDown, TbHandClick } from 'react-icons/all'
import ImageSlash from '/src/static/ImageSlash.svg'
import axios from 'axios'


import GeneralLanguage from '/src/options/general/language'

import EconomyBusinesses from '/src/options/economy/businesses'
import EconomyStocks from '/src/options/economy/stocks'
import EconomyItems from '/src/options/economy/items'
import EconomyCars from '/src/options/economy/cars'
import EconomyLuckGames from '/src/options/economy/luckgames'
import EconomyWork from '/src/options/economy/work'
import EconomyRob from '/src/options/economy/rob'

import FunLevels from '/src/options/fun/levels'
import FunQuotes from '/src/options/fun/quotes'
import FunMeme from '/src/options/fun/meme'


import Animated from '/src/Animated'
import { useNavigate } from 'react-router-dom'

import * as cookie from '/src/scripts/cookies'
const General = () => {
  return (
    <Accordion
      allowMultiple
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
      borderWidth="1px"
      borderRadius="1rem"
      className="shadow-md"
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton>
            <Box
              flex='1'
              textAlign='left'
            >
              <Flex flexDirection="row" justifyContent="center">
                <TbCaretDown size={48} />
                <Text fontSize="3xl" as="b">
                  GENERAL
                </Text>
              </Flex>
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
  return (
    <Accordion
      mt="2rem"
      allowMultiple
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
      borderWidth="1px"
      borderRadius="1rem"
      className="shadow-md"
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton>
            <Box
              flex='1'
              textAlign='left'
            >
              <Flex flexDirection="row" justifyContent="center">
                <TbCaretDown size={48} />
                <Text fontSize="3xl" as="b">
                  ECONOMY
                </Text>
              </Flex>
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion
            allowMultiple
            backgroundColor={useColorModeValue('gray.100', 'gray.900')}
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
            className="shadow-md"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                  >
                    <Flex flexDirection="row" justifyContent="center">
                      <TbCaretDown size={48} />
                      <Text fontSize="3xl" as="b">
                        SYSTEMS
                      </Text>
                    </Flex>
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
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
            className="shadow-md"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                  >
                    <Flex flexDirection="row" justifyContent="center">
                      <TbCaretDown size={48} />
                      <Text fontSize="3xl" as="b">
                        OTHERS
                      </Text>
                    </Flex>
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
  return (
    <Accordion
      mt="2rem"
      allowMultiple
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
      borderWidth="1px"
      borderRadius="1rem"
      className="shadow-md"
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton>
            <Box
              flex='1'
              textAlign='left'
            >
              <Flex flexDirection="row" justifyContent="center">
                <TbCaretDown size={48} />
                <Text fontSize="3xl" as="b">
                  MISCELLANEOUS
                </Text>
              </Flex>
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion
            allowMultiple
            backgroundColor={useColorModeValue('gray.100', 'gray.900')}
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
            className="shadow-md"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                  >
                    <Flex flexDirection="row" justifyContent="center">
                      <TbCaretDown size={48} />
                      <Text fontSize="3xl" as="b">
                        SYSTEMS
                      </Text>
                    </Flex>
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
            borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
            borderWidth="1px"
            borderRadius="1rem"
            className="shadow-md"
          >
            <AccordionItem border='none'>
              <h2>
                <AccordionButton>
                  <Box
                    flex='1'
                    textAlign='left'
                  >
                    <Flex flexDirection="row" justifyContent="center">
                      <TbCaretDown size={48} />
                      <Text fontSize="3xl" as="b">
                        OTHERS
                      </Text>
                    </Flex>
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

  const [ info, setInfo ] = useState(0)
  const [ stats, setStats ] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

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
  }, [navigate]); useEffect(() => {
    const params = new URLSearchParams(window.location.search)

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

  return (
    <Flex alignItems="center" marginTop="2rem" justifyContent="center">
      <Flex
        w="100%"
        maxW="50rem"
        flexDirection="column"
        bg={useColorModeValue('gray.100', 'gray.900')}
        p={12}
        borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        borderWidth="1px"
        borderRadius="1rem"
        className="shadow-md"
      >
        <Heading
          mt='-2rem'
          mb={6}
        >
          {info.name}
        </Heading>

        <Image
          mb="1rem"
          alignSelf='center'
          borderRadius='full'
          boxSize='150px'
          src={`https://cdn.discordapp.com/icons/${info.id}/${info.icon}.png`}
          fallbackSrc={ImageSlash}
          alt='Server Icon'
        />

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
        borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        borderWidth="1px"
        borderRadius="1rem"
        className="shadow-md"
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
      <Box textAlign="center" fontSize="xl" mt="6.2rem">
        <Grid minH="0%" p={3}>
          <ServerInfo />
          <SettingContainer />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Panel