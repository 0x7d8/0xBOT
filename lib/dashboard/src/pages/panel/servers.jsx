import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Button,
  Spinner,
  Center,
  VStack,
  useColorModeValue,
  Text,
  Image,
  useToast
} from '@chakra-ui/react'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import ImageSlash from '/src/static/ImageSlash.svg'
import axios from 'axios'

import Animated from '/src/Animated'

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
  const [ cookies ] = useCookies()
  const navigate = useNavigate()
  const width = useWindowDimensions().width
  const toast = useToast()

  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  let useWidth = 100
  if (width < 1150 && width > 750) { useWidth = 75 }

  const goServer = (id) => {
    axios
      .get(`https://api.0xbot.de/check/guild?id=${id}`, {
        headers: {
          authToken: cookies.authToken
        }
      })
      .then((res) => {
        if (res.data.success) return navigate(`/panel/manage?server=${id}`)
        toast({
          title: <Center>ERROR</Center>,
          description: (
            <Center>
              <VStack>
                <Text>Please Invite the Bot to that Server first.</Text>
                <Button
                  mt="1rem"
                  colorScheme="gray"
                  variant="outline"
                  onClick={() => window.location.replace('https://top.gg/bot/1001944224545128588/invite') }
                >
                  INVITE
                </Button>
              </VStack>
            </Center>
          ),
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
            onClick={() => goServer(props.serverid) }
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
        >
          {props.servername}
        </Text>
      </Flex>
    </Flex>
  )
}; const ServerContainer = ({ setHidden }) => {
  const [ cookies ] = useCookies()
  const width = useWindowDimensions().width
  let useWidth = 1
  if (width > 1150) { useWidth = 2 }

  const [servers, setServers] = useState([])

  useEffect(() => {
    (async() => {
      if (!cookies) return
      let tokens = (await axios({
        method: 'GET',
        url: 'https://api.0xbot.de/auth/tokens',
        validateStatus: () => true,
        headers: {
          authToken: cookies.authToken
        }
      })).data
      if (!tokens.success) return console.error(tokens)
      tokens = tokens.tokens
      let guilds

      try {
        guilds = await axios({
          method: 'GET',
          url: 'https://discord.com/api/users/@me/guilds',
          headers: {
            authorization: `Bearer ${tokens.access}`
          }
        })
      } catch (e) {
        let newTokens = (await axios({
          method: 'GET',
          url: 'https://api.0xbot.de/auth/refresh',
          headers: {
            authToken: cookies.authToken
          }
        })).data
        if (!newTokens.success) return console.error(newTokens)
        newTokens = newTokens.tokens

        await new Promise(resolve => setTimeout(resolve, 1000))
        guilds = await axios({
          method: 'GET',
          url: 'https://discord.com/api/users/@me/guilds',
          headers: {
            authorization: `Bearer ${newTokens.access}`
          }
        })
      }; setHidden(true)

      const ereformdata = []
      const dreformdata = []
      for (let guild of guilds.data) {
        if (guild.permissions === 8 || guild.permissions === 2147483647) {
          guild.enabled = true 
          ereformdata.push(guild)
        } else {
          guild.enabled = false 
          dreformdata.push(guild)
        }
      }

      setServers(ereformdata.concat(dreformdata))
    }) ()
  }, [])

  return (
    <React.Fragment>
      <Grid
        templateColumns={`repeat(${useWidth}, 1fr)`}
        gap="1rem"
      >
        {servers?.map((server) => (
          <ServerBox key={server.id} servername={server.name} serverid={server.id} serverimage={server.icon} enabled={server.enabled} />
        ))}
      </Grid>
    </React.Fragment>
  )
}
function Panel() {
  const [ hidden, setHidden ] = useState(false)

  return (
    <Animated>
      <Box textAlign="center" fontSize="xl" mt="6.2rem">
        <Flex
          flexDirection="column"
          alignContent="center"
          justifyContent="center"
          p={12}
          borderRadius="2rem"
          hidden={hidden}
        >
          <Spinner size="xl" justifySelf="center" alignSelf="center" />
        </Flex>
        <Grid minH="0%" p={3}>
          <ServerContainer setHidden={setHidden} />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Panel