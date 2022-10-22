import React, { useState, useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Button,
  useColorModeValue,
  Text,
  Image
} from '@chakra-ui/react'
import { NavBar } from '../../NavBar'
import { Footer } from '../../Footer'

import { useNavigate } from 'react-router-dom'
import ImageSlash from '../../static/image-slash.svg'
import axios from 'axios'

import Animated from '../../Animated'

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

const cookie = require('../../scripts/cookies')
function ServerBox(props) {
  const navigate = useNavigate()
  const width = useWindowDimensions().width

  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  let useWidth = 100
  if (width < 1150 && width > 750) { useWidth = 75 }

  return (
    <Flex alignItems="center" marginTop="2rem" id={props.id} justifyContent="center">
              <Flex
                w={`${useWidth}%`}
                flexDirection="row"
                bg={useColorModeValue('gray.100', 'gray.900')}
                p={12}
                borderColor="whiteAlpha.300"
                borderWidth="1px"
                borderRadius="1rem"
                boxShadow="lg"
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
                    onClick={() => {navigate(`/panel/manage?server=${props.serverid}`)}}
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
  );
};
function Panel() {
  return (
    <Animated>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="0%" p={3}>
            <NavBar/>
            <ServerContainer />
            <Footer />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Panel;