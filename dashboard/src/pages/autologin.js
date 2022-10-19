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

      navigate('/panel')
    } else {
      window.setTimeout(() => {navigate('/home')}, 1000);
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
                boxShadow="lg"
              >
                <Spinner size="xl" />
              </Flex>
            </Flex>
          </Grid>
        </Box>
      </ChakraProvider>
    );
}

export default AutoLogin;