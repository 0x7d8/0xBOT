import React, { useEffect } from 'react'
import {
  Box,
  Flex,
  Image,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Center,
  useToast,
  Text,
  VStack
} from '@chakra-ui/react'
import { useCookies } from 'react-cookie'
import { FiMoon, FiSun } from 'react-icons/all'
import { HiOutlineLogin, HiOutlineLogout, FiList } from 'react-icons/all'
import { useNavigate } from 'react-router-dom'
import LogoLight from '/src/static/LogoLight.svg'
import LogoDark from '/src/static/LogoDark.svg'

import axios from 'axios'
const MenuItems = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies()
  const toast = useToast()
  const navigate = useNavigate()

  if (window.authenticated) {
    return (
      <VStack w="100%">
        <MenuItem
          borderRadius="0.5rem"
          mr="0.5rem"
          ml="0.5rem"
          w="92.5%"
          textAlign="center"
          justifyContent="center"
          icon={<FiList size={24} />}
          iconSpacing={0}
          onClick={() => navigate('/panel/servers') }
        >
          Your Servers
        </MenuItem>
        <MenuItem
          borderRadius="0.5rem"
          mr="0.5rem"
          ml="0.5rem"
          w="92.5%"
          textAlign="center"
          justifyContent="center"
          icon={<HiOutlineLogout size={24} />}
          iconSpacing={0}
          onClick={async() => {
            const req = await axios({
              method: 'POST',
              url: 'https://api.0xbot.de/auth/logout',
              validateStatus: () => true,
              headers: {
                authToken: cookies.authToken
              }
            }); const res = req.data
            if (!res.success) return console.error(res)

            toast({
              title: <Center>SUCCESS</Center>,
              description: <Center>You have logged out successfully!</Center>,
              status: "success",
              duration: 1500,
              isClosable: true,
              variant: "subtle",
              position: "top-right",
              containerStyle: {
                transform: "translateY(4.5rem)"
              }
            })

            window.authenticated = false
            removeCookie('authToken', { path: '/' })
            removeCookie('userId', { path: '/' })
            removeCookie('userName', { path: '/' })
            removeCookie('userTag', { path: '/' })
            removeCookie('userAvatar', { path: '/' })
            removeCookie('userEmail', { path: '/' })
            navigate('/')
          }}
        >
          Log Out
        </MenuItem>
      </VStack>
    )
  } else {
    return (
      <>
        <MenuItem
          borderRadius="0.5rem"
          mr="0.5rem"
          ml="0.5rem"
          w="92.5%"
          textAlign="center"
          justifyContent="center"
          icon={<HiOutlineLogin size={24} />}
          iconSpacing={0}
          onClick={() => window.location.replace('https://discord.com/api/oauth2/authorize?client_id=1001944224545128588&redirect_uri=https%3A%2F%2F0xbot.de%2Fauth%2Fdiscord&response_type=code&scope=identify%20guilds%20email')}
        >
          Log In
        </MenuItem>
      </>
    )
  }
}

export function NavBar() {
  const [ cookies, setCookie, removeCookie ] = useCookies()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

  const { toggleColorMode } = useColorMode()
  const SwitchColorText = useColorModeValue('🌙 Dark', '☀️ Light')
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)

  useEffect(() => {
    (async() => {
      const req = await axios({
        methid: 'GET',
        url: 'https://api.0xbot.de/auth/check',
        validateStatus: () => true,
        headers: {
          authToken: cookies.authToken
        }
      }); const res = req.data
      if (res.success) return window.authenticated = true
      window.authenticated = false
      if (window.location.href.includes('/panel')) navigate('/')

      // Old Cookies
      if (cookies.accessToken) removeCookie('accessToken', { path: '/' })
      if (cookies.tokenType) removeCookie('tokenType', { path: '/' })
      if (cookies.avatar) removeCookie('avatar', { path: '/' })
      if (cookies.userid) removeCookie('userid', { path: '/' })
      if (cookies.username) removeCookie('username', { path: '/' })
      if (cookies.usertag) removeCookie('usertag', { path: '/' })
      if (cookies.useremail) removeCookie('useremail', { path: '/' })

      // New Cookies
      if (cookies.authToken) removeCookie('authToken', { path: '/' })
      if (cookies.userAvatar) removeCookie('userAvatar', { path: '/' })
      if (cookies.userId) removeCookie('userId', { path: '/' })
      if (cookies.userName) removeCookie('userName', { path: '/' })
      if (cookies.userTag) removeCookie('userTag', { path: '/' })
      if (cookies.userEmail) removeCookie('userEmail', { path: '/' })
    }) ()
  }, [])

  return (
    <>
      <Box
        zIndex="10000"
        fontSize="xl"
        w="100%"
        as="nav"
        position="fixed"
        top="0"
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue(
            'rgba(237, 242, 247, 0.8)',
            'rgba(23, 25, 35, 0.8)'
          ),
        }} className="shadow-md"
      >
        <Flex
          h={16}
          mt="0.25rem"
          mb="0.25rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            ml="1rem"
            variant="link"
            fontSize="xl"
            color={useColorModeValue('#21005D', '#37009B')}
            leftIcon={<Image src={useColorModeValue(LogoLight, LogoDark)} style={{ height: 48, width: 48 }} />}
            onClick={() => navigate('/') }
          >
            0xBOT
          </Button>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7} mr="1rem">
              <IconButton
                color={useColorModeValue('black', 'gold')}
                alignSelf="center"
                fontSize="lg"
                variant="ghost"
                colorScheme="gray"
                icon={<SwitchIcon size={28} />}
                onClick={() => {
                  toast({
                    title: <Center>INFO</Center>,
                    description: <Center>Theme Changed to {SwitchColorText}!</Center>,
                    duration: 1500,
                    isClosable: true,
                    variant: "subtle",
                    position: "top-right",
                    containerStyle: {
                      transform: "translateY(4.5rem)"
                    }
                  }); return toggleColorMode()
                }}
              />

              <Menu
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
              >
                <MenuButton
                  as={Avatar}
                  src={`https://cdn.discordapp.com/avatars/${cookies.userId}/${cookies.userAvatar}.png`}
                  _hover={{ cursor: "pointer", opacity: "80%" }}
                  onClick={onOpen}
                />
                <MenuList
                  alignItems="center"
                  bg={useColorModeValue('gray.100', 'gray.900')}
                >
                  <Center>
                    <Avatar
                      mt="1rem"
                      size="2xl"
                      src={`https://cdn.discordapp.com/avatars/${cookies.userId}/${cookies.userAvatar}.png`}
                      _hover={{ cursor: "pointer", opacity: "80%" }}
                      onClick={() => {
                        if (window?.authenticated) navigate('/panel')
                      }}
                    />
                  </Center>
                  <Center>
                    <Text mt="0.5rem" mb="0.5rem">{cookies.userName || 'Unknown'}</Text>
                  </Center>
                  <VStack w="100%">
                    <MenuDivider w="90%" justifySelf="center" />
                    <MenuItems />
                  </VStack>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}