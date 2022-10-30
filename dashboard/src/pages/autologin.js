import React, { useEffect } from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Spinner,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const cookie = require('../scripts/cookies')
function AutoLogin() {
  const navigate = useNavigate()
  const fragment = new URLSearchParams(window.location.hash.slice(1))
  
  useEffect(() => {
    if (!!fragment.get('scope')) {
      const accessToken = fragment.get('access_token')
      const tokenType = fragment.get('token_type')

      cookie.set('accessToken', accessToken, 360)
      cookie.set('tokenType', tokenType, 360)

      axios
        .get('https://discord.com/api/users/@me', {
          headers: {
              authorization: `${cookie.get('tokenType')} ${cookie.get('accessToken')}`,
          }
        })
        .then((res) => {
          cookie.set('userid', res.data.id, 360)
          cookie.set('username', res.data.username, 360)
          cookie.set('usertag', res.data.discriminator, 360)
          cookie.set('useremail', res.data.email, 360)
          cookie.set('avatar', res.data.avatar, 360)

          navigate('/panel')
        })
    } else {
      window.setTimeout(() => {navigate('/home')}, 1000)
    }
  });
    return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <Flex h="80vh" alignItems="center" justifyContent="center">
              <Flex
                flexDirection="column"
                p={12}
                borderRadius="2rem"
                boxShadow="md"
              >
                <Spinner size="xl" />
              </Flex>
            </Flex>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}

export default AutoLogin