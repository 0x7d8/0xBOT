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
  Image,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Switch
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import ImageSlash from '../static/image-slash.svg';
import axios from 'axios'

import Animated from '../Animated'

import * as cookie from '/src/scripts/cookies'
function ProfileBox() {
  const toast = useToast()
  const [ onlineValue, setOnlineValue ] = useState(false)
  const [ stats, setStats ] = useState(0)

  useEffect(() => {
    axios
      .get(`https://api.0xbot.de/stats/user?id=${cookie.get('userid')}`)
      .then((res) => {
        setStats(res.data)
      })

    axios
      .get(`https://api.0xbot.de/options/email?email=${cookie.get('useremail')}`, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
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
      .get(`https://api.0xbot.de/options/email?email=${cookie.get('useremail')}`, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      })
      .then((res) => {
        setOnlineValue((res.data === 'true'))
      })

    axios
      .post(`https://api.0xbot.de/options/email?email=${cookie.get('useremail')}`, {
        option: value
      }, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
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
          borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
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
          borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
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
          borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
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
        <Text
          mt="2rem"
          hidden={(cookie.get('useremail') === '')}
          color={SwitchIconColor}
        >
          Emails
        </Text>
        <Switch
          mt="0.5rem"
          size="lg"
          isChecked={onlineValue}
          hidden={(cookie.get('useremail') === '')}
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