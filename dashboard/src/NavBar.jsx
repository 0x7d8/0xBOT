import React from 'react'
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
import { FiMoon, FiSun } from 'react-icons/all'
import { HiOutlineLogin, HiOutlineLogout, FiList } from 'react-icons/all'
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
          icon={<FiList size="1.5rem" />}
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
          icon={<HiOutlineLogout size="1.5rem" />}
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
          icon={<HiOutlineLogin size="1.5rem" />}
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

  const { toggleColorMode } = useColorMode()
  const SwitchColorText = useColorModeValue('🌙 Dark', '☀️ Light')
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)

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
            onClick={() => navigate('/home') }
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
                icon={<SwitchIcon size="1.75rem" />}
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
                  src={`https://cdn.discordapp.com/avatars/${cookie.get('userid')}/${cookie.get('avatar')}.png`}
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
                    <Text mt="0.5rem" mb="0.5rem">{cookie.get('username') || 'Unknown'}</Text>
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