import React from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Heading,
  Button,
  DarkMode,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import Animated from '../Animated';

const cookie = require('../scripts/cookies')
function LoginBox() {
  const SwitchBackgroundColor = useColorModeValue('#EADDFF', '#1D192B')
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  return (
    <Flex h="80vh" alignItems="center" justifyContent="center">
              <Flex
                flexDirection="column"
                bg={SwitchBackgroundColor}
                p={12}
                borderRadius="2rem"
                boxShadow="lg"
              >
                <Heading
                  mt='-2rem'
                  mb={6}
                  color={SwitchIconColor}
                >
                  DISCORD LOGIN
                </Heading>
                <DarkMode>
                  <Button
                    w="50%"
                    id="LoginButton"
                    variant="solid"
                    leftIcon={<FontAwesomeIcon icon={faKey} />}
                    colorScheme="purple"
                    color={SwitchIconColor}
                    alignSelf="center"
                    onClick={() => document.location.replace('https://discord.com/api/oauth2/authorize?client_id=1005105495356481636&redirect_uri=http%3A%2F%2Fde-01.paperstudios.de%3A3001%2F&response_type=token&scope=identify%20guilds')}
                  >
                    LOGIN
                  </Button>
                </DarkMode>
              </Flex>
            </Flex>
  )
}
function Login() {
  const navigate = useNavigate()
  const toast = useToast()
  
  document.dologin = async() => {
    let username
    let password
    try {
      username = document.getElementById('UsernameField').value
      password = document.getElementById('PasswordField').value
    } catch (e) { return }
    if (username === null || password === null) { return }
    if (username === '' || password === '') { return }

    document.getElementById('LoginButton').disabled = true

    axios
      .get(`https://api.paperstudios.de/v1/account/verusr/${username}/?password=${password}`)
      .then((res) => {
        if (res.data === 'Y-PASS') {
          document.getElementById('RegisterButton').disabled = true
          document.getElementById('UsernameField').disabled = true
          document.getElementById('PasswordField').disabled = true
  
          cookie.set('username', username, 360)
          cookie.set('password', password, 360)
          const id = 'logged-in'
          toast({
            id,
            title: <center>SUCCESS</center>,
            description: <center>Successfully logged in.</center>,
            status: "success",
            duration: 2500,
            isClosable: true,
            variant: "subtle",
            position: "top-right",
            containerStyle: {
              transform: "translateY(2.5rem)"
            }
          })
          function checkToast() {
            if(toast.isActive(id)) {
              window.setTimeout(checkToast, 100);
            } else {
              window.setTimeout(() => {navigate('/panel')}, 600);
            }
          }
          checkToast();
        } else {
          if (res.data === 'N-PASS') {
            document.getElementById('PasswordField').value = ''
            toast({
              title: <center>ERROR</center>,
              description: <center>Password incorrect.</center>,
              status: "warning",
              duration: 2000,
              isClosable: true,
              variant: "subtle",
              position: "top-right",
              containerStyle: {
                transform: "translateY(2.5rem)"
              }
            })
          } else {
            document.getElementById('UsernameField').value = ''
            document.getElementById('PasswordField').value = ''
            toast({
              title: <center>ERROR</center>,
              description: <center>Account doesnt exist.</center>,
              status: "error",
              duration: 2500,
              isClosable: true,
              variant: "subtle",
              position: "top-right",
              containerStyle: {
                transform: "translateY(2.5rem)"
              }
            })
          }
  
          window.checklogin()
        }
      })
      .catch((e) => {
        document.getElementById('UsernameField').value = ''
        document.getElementById('PasswordField').value = ''
        toast({
          title: <center>ERROR</center>,
          description: <center>Account doesnt exist.</center>,
          status: "error",
          duration: 2500,
          isClosable: true,
          variant: "subtle",
          position: "top-right",
          containerStyle: {
            transform: "translateY(2.5rem)"
          }
        })
      })
  }

  return (
    <Animated>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <NavBar/>
            <LoginBox />
          </Grid>
        </Box>
      </ChakraProvider>
    </Animated>
  );
}
  
export default Login;