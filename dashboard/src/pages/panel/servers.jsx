import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Button,
  Center,
  useColorModeValue,
  Text,
  Image,
  useToast
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import ImageSlash from '/src/static/image-slash.svg'
import axios from 'axios'

import Animated from '/src/Animated'

import * as cookie from '/src/scripts/cookies'
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

function ServerBox(props) {
  const navigate = useNavigate()
  const width = useWindowDimensions().width
  const toast = useToast()

  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  let useWidth = 100
  if (width < 1150 && width > 750) { useWidth = 75 }

  window.goserver = (id) => {
    axios
      .get(`https://api.0xbot.de/check/guild?id=${id}`, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      })
      .then((res) => {
        if (res.data.success) return navigate(`/panel/manage?server=${id}`)
        toast({
          title: <Center>ERROR</Center>,
          description: <Center>Please Invite the Bot to that Server first.<br />
            <Button
              mt="1rem"
              colorScheme="gray"
              variant="outline"
              onClick={() => { window.location.replace('https://top.gg/bot/1001944224545128588/invite') }}
            >
              INVITE
            </Button>
          </Center>,

          status: "error",
          duration: 6000,
          isClosable: true,
          variant: "subtle",
          position: "top-right",
          containerStyle: {
            transform: "translateY(4.5rem)"
          }
        })
      })
  }

  return (
    <Flex alignItems="center" marginTop="2rem" id={props.id} justifyContent="center">
      <Flex
        w={`${useWidth}%`}
        flexDirection="row"
        bg={useColorModeValue('gray.100', 'gray.900')}
        p={12}
        borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        borderWidth="1px"
        borderRadius="1rem"
        className="shadow-md"
      >
        <Flex
          marginTop="-1.5rem"
          marginBottom="-1.5rem"
          direction="column"
        >
          <Image
            alignSelf='self-start'
            borderRadius='full'
            boxSize='150px'
            src={`https://cdn.discordapp.com/icons/${props.serverid}/${props.serverimage}.png`}
            fallbackSrc={ImageSlash}
            alt='Server Icon'
          />
          <Button
            disabled={!props.enabled}
            variant="outline"
            colorScheme="gray"
            marginTop="1rem"
            alignSelf="center"
            onClick={() => { window.goserver(props.serverid) }}
          >
            MANAGE
          </Button>
        </Flex>
        <Text
          alignSelf="center"
          marginLeft="2rem"
          marginRight="2rem"
          color={SwitchIconColor}
          as="b"
          fontSize="3xl"
        >{props.servername}</Text>
      </Flex>
    </Flex>
  )
}; const ServerContainer = () => {
  const width = useWindowDimensions().width
  let useWidth = 1
  if (width > 1150) { useWidth = 2 }

  const [cards, setCards] = useState([])

  useEffect(() => {
    axios
      .get(`https://discord.com/api/users/@me/guilds`, {
        headers: {
          authorization: `${cookie.get('tokenType')} ${cookie.get('accessToken')}`
        }
      })
      .then((res) => {
        const ereformdata = []
        const dreformdata = []
        for (let guild of res.data) {
          if (guild.permissions === 8 || guild.permissions === 2147483647) {
            guild.enabled = true 
            ereformdata.push(guild)
          } else {
            guild.enabled = false 
            dreformdata.push(guild)
          }
        }

        setCards(ereformdata.concat(dreformdata))
      })
  }, [])

  return (
    <React.Fragment>
      <Grid
        templateColumns={`repeat(${useWidth}, 1fr)`}
        gap="1rem"
      >
        {cards?.map(server => (
          <ServerBox key={server.id} servername={server.name} serverid={server.id} serverimage={server.icon} enabled={server.enabled} />
        ))}
      </Grid>
    </React.Fragment>
  )
}
function Panel() {
  return (
    <Animated>
      <Box textAlign="center" fontSize="xl" mt="6.2rem">
        <Grid minH="0%" p={3}>
          <ServerContainer />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Panel