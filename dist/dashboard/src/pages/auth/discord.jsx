import React, { useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Spinner,
  Flex
} from '@chakra-ui/react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Auth() {
  const navigate = useNavigate()
  const [ cookies, setCookie, removeCookie ] = useCookies()
  const params = new URLSearchParams(window.location.search)
  
  useEffect(() => {
    (async() => {
      const req = await axios({
        method: 'POST',
        url: 'https://api.0xbot.de/auth/login',
        headers: {
          code: params.get('code')
        }
      }); const res = req.data
      if (!res.success) return

      setCookie('authToken', res.authToken, {
        path: '/',
        domain: '0xbot.de',
        expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT')
      }); setCookie('userId', res.infos.id, {
        path: '/',
        domain: '0xbot.de',
        expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT')
      }); setCookie('userName', decodeURIComponent(res.infos.username), {
        path: '/',
        domain: '0xbot.de',
        expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT')
      }); setCookie('userTag', res.infos.discriminator, {
        path: '/',
        domain: '0xbot.de',
        expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT')
      }); setCookie('userAvatar', res.infos.avatar, {
        path: '/',
        domain: '0xbot.de',
        expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT')
      }); setCookie('userEmail', decodeURIComponent(res.infos.email), {
        path: '/',
        domain: '0xbot.de',
        expires: new Date('Fri, 31 Dec 9999 23:59:59 GMT')
      })

      window.authenticated = true
      navigate('/')
    }) ()
  });
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <Flex h="80vh" alignItems="center" justifyContent="center" mt="6.2rem">
              <Flex
                flexDirection="column"
                p={12}
                borderRadius="2rem"
              >
                <Spinner size="xl" />
              </Flex>
            </Flex>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}

export default Auth