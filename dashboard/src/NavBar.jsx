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
  useColorModeValue,
  useColorMode,
  Stack,
  Center,
  useToast,
  Text,
  VStack
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { MdLogin, MdLogout, MdVpnKey, FaList } from 'react-icons/all'
import { useNavigate } from 'react-router-dom'
import LogoLight from '/src/static/LogoLight.svg'
import LogoDark from '/src/static/LogoDark.svg'

import * as cookie from '/src/scripts/cookies'
const MenuItems = () => {
  let loggedIn = false
  if (cookie.get('username') !== '') loggedIn = true
  const navigate = useNavigate()

  if (loggedIn) {
    return (
      <VStack w="100%">
        <MenuItem
          borderRadius="0.5rem"
          mr="0.5rem"
          ml="0.5rem"
          w="92.5%"
          textAlign="center"
          justifyContent="center"
          icon={<FaList />}
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
          icon={<MdLogout />}
          iconSpacing={0}
          onClick={() => {
            cookie.set('accessToken', '', 1)
            cookie.set('tokenType', '', 1)
            cookie.set('userid', '', 1)
            cookie.set('username', '', 1)
            cookie.set('usertag', '', 1)
            cookie.set('avatar', '', 1)

            navigate('/home')
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
          icon={<MdLogin />}
          iconSpacing={0}
          onClick={() => window.location.replace('https://discord.com/api/oauth2/authorize?client_id=1001944224545128588&redirect_uri=https%3A%2F%2F0xbot.de%2F&response_type=token&scope=identify%20email%20guilds')}
        >
          Log In
        </MenuItem>
      </>
    )
  }
}

export function NavBar() {
  const toast = useToast()
  const navigate = useNavigate()

  const { toggleColorMode } = useColorMode()
  const SwitchColorText = useColorModeValue('🌙 Dark', '☀️ Light')
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <>
      <Box
        zIndex="10000"
        as="nav"
        position="sticky"
        mt="-1rem"
        top="0"
        bg={useColorModeValue('gray.100', 'gray.900')}
        opacity="97.5%"
        px={4}
        borderRadius="0 0 1rem 1rem"
        className="shadow-md"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Button
            variant="ghost"
            colorScheme="gray"
            color={useColorModeValue('#21005D', '#37009B')}
            leftIcon={<Image src={useColorModeValue(LogoLight, LogoDark)} style={{ height: 34, width: 34 }} />}
            onClick={() => { navigate('/home') }}
          >
            0xBOT
          </Button>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <IconButton
                color={useColorModeValue('black', 'white')}
                alignSelf="center"
                fontSize="lg"
                variant="ghost"
                colorScheme="gray"
                icon={<SwitchIcon />}
                onClick={() => {
                  toast({
                    title: <Center>INFO</Center>,
                    description: <Center>Theme Changed to {SwitchColorText}!</Center>,
                    duration: 1500,
                    isClosable: true,
                    variant: "subtle",
                    position: "top-right",
                    containerStyle: {
                      transform: "translateY(4rem)"
                    }
                  }); return toggleColorMode()
                }}
              />

              <Menu>
                <MenuButton
                  as={Avatar}
                  src={`https://cdn.discordapp.com/avatars/${cookie.get('userid')}/${cookie.get('avatar')}.png`}
                  _hover={{ cursor: "pointer", opacity: "80%" }}
                />
                <MenuList
                  alignItems="center"
                  bg={useColorModeValue('gray.100', 'gray.900')}
                >
                  <Center>
                    <Avatar
                      mt="1rem"
                      size="2xl"
                      src={`https://cdn.discordapp.com/avatars/${cookie.get('userid')}/${cookie.get('avatar')}.png`}
                      _hover={{ cursor: "pointer", opacity: "80%" }}
                      onClick={() => {
                        if (
                          cookie.get('username') !== '' &&
                          cookie.get('usertag') !== '' &&
                          cookie.get('accessToken') !== '' &&
                          cookie.get('tokenType') !== ''
                        ) navigate('/panel')
                      }}
                    />
                  </Center>
                  <Center>
                    <Text mt="0.5rem" mb="0.5rem">{cookie.get('username')}</Text>
                  </Center>
                  <MenuDivider />
                  <Center>
                    <MenuItems />
                  </Center>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}