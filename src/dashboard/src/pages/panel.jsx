import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Heading,
  Center,
  useColorModeValue,
  useToast,
  Text,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Switch
} from '@chakra-ui/react'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { TbServer, TbHandClick } from 'react-icons/all'
import axios from 'axios'

import Animated from '/src/Animated'

import * as cookie from '/src/scripts/cookies'
function ProfileBox() {
  const toast = useToast()
  const [ cookies, setCookie, removeCookie ] = useCookies()
  const [ onlineValue, setOnlineValue ] = useState(false)
  const [ stats, setStats ] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/user?id=${cookies.userId}`)
      .then((res) => {
        setStats(res.data)
      })

    axios
      .get(`https://api.0xbot.de/options/email`, {
        headers: {
          authToken: cookies.authToken
        }
      })
      .then((res) => {
        setOnlineValue(res.data.email)
      })
  }, [])

  const navigate = useNavigate()
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  const emailSwitch = (data) => {
    const value = (data.target._valueTracker.getValue() === 'true')
    axios
      .get(`https://api.0xbot.de/options/email`, {
        headers: {
          authToken: cookies.authToken
        }
      })
      .then((res) => {
        setOnlineValue((res.data === 'true'))
      })

    axios
      .post(`https://api.0xbot.de/options/email`, {
        option: value
      }, {
        headers: {
          authToken: cookies.authToken
        }
      })
      .then((res) => {
        if (res.data.success) {
          setOnlineValue(value)
          return toast({
            title: <Center>SUCCESS</Center>,
            description: <Center>Successfully turned Emails {value ? 'On' : 'Off'}!</Center>,
            status: "success",
            duration: 2500,
            isClosable: true,
            variant: "subtle",
            position: "top-right",
            containerStyle: {
              transform: "translateY(4.5rem)"
            }
          })
        } else {
          data.target._valueTracker.setValue(onlineValue)
        }
      }).catch((e) => {
        data.target._valueTracker.setValue(onlineValue)
      })
  }

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
        boxShadow="lg"
      >
        <Heading
          mt='-2rem'
          mb={6}
        >
          Welcome, {cookies.userName}
        </Heading>

        <Avatar
          alignSelf='center'
          size="2xl"
          src={`https://cdn.discordapp.com/avatars/${cookies.userId}/${cookies.userAvatar}.png`}
          alt='Profile Picture'
        />

        <Heading
          mt="2rem"
          mb="0.5rem"
          fontFamily="sans-serif"
        >
          Stats
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
          w="15rem"
          mt="2rem"
          colorScheme="gray"
          variant="outline"
          alignSelf="center"
          leftIcon={<TbServer size={24} />}
          onClick={() => {navigate('/panel/servers')}}
        >
          MANAGE SERVERS
        </Button>
        <Text
          mt="2rem"
          hidden={!cookies.userEmail}
          color={SwitchIconColor}
        >
          Emails
        </Text>
        <Switch
          mt="0.5rem"
          size="lg"
          isChecked={onlineValue}
          hidden={!cookies.userEmail}
          onChange={emailSwitch}
        />
      </Flex>
    </Flex>
  )
}
function Panel() {    
  return (
    <Animated>
      <Box textAlign="center" fontSize="xl" mt="6.2rem">
        <Grid minH="0%" p={3}>
          <ProfileBox />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Panel