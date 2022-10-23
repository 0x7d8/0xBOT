import {
  Box,
  Flex,
  Image,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher'

import { faList, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import LogoLight from './static/LogoLight.svg'
import LogoDark from './static/LogoDark.svg'

const cookie = require('./scripts/cookies')
const MenuItems = () => {
  let loggedIn = false
  if (cookie.get('username') !== '') loggedIn = true
  const navigate = useNavigate()

  if (loggedIn) {
    return (
      <>
        <MenuItem
          borderRadius="0.5rem"
          mr="0.5rem"
          ml="0.5rem"
          w="92.5%"
          textAlign="center"
          justifyContent="center"
          icon={<FontAwesomeIcon icon={faList} />}
          iconSpacing={0}
          onClick={() => { navigate('/panel/servers') }}
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
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
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
      </>
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
            icon={<FontAwesomeIcon icon={faRightToBracket} />}
            iconSpacing={0}
            onClick={() => window.location.replace('https://discord.com/api/oauth2/authorize?client_id=1001944224545128588&redirect_uri=https%3A%2F%2F0xbot.de%2F&response_type=token&scope=identify%20guilds')}
          >
            Log In
          </MenuItem>
        </>
      )
    }
}

export function NavBar() {
  const navigate = useNavigate()

  return (
    <>
      <Box
        zIndex="10000"
        as="nav"
        position="sticky"
        mt="-1rem"
        top="0"
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        borderRadius="0rem 0rem 1rem 1rem"
        boxShadow="lg"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Button
            variant="ghost"
            colorScheme="gray"
            color={useColorModeValue('#21005D', '#37009B')}
            leftIcon={<Image src={useColorModeValue(LogoLight, LogoDark)} style={{ height: 34, width: 34 }} />}
            onClick={() => { navigate('/home') }}
          >
            0xBOT
          </Button>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ColorModeSwitcher />

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    _hover={{ cursor: "pointer", borderColor: "gray.500" }}
                    size={'sm'}
                    src={`https://cdn.discordapp.com/avatars/${cookie.get('userid')}/${cookie.get('avatar')}.png`}
                    borderColor="whiteAlpha.300"
                    borderWidth="1px"
                    boxShadow="lg"
                  />
                </MenuButton>
                <MenuList alignItems={'center'} bg={useColorModeValue('gray.100', 'gray.900')}>
                  <br />
                  <Center>
                    <Avatar
                      _hover={{ cursor: "pointer", borderColor: "gray.500" }}
                      onClick={() => { navigate('/panel') }}
                      size={'2xl'}
                      src={`https://cdn.discordapp.com/avatars/${cookie.get('userid')}/${cookie.get('avatar')}.png`}
                      borderColor="whiteAlpha.300"
                      borderWidth="1px"
                      boxShadow="lg"
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{cookie.get('username')}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <center>
                    <MenuItems />
                  </center>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}