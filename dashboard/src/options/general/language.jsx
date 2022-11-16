import React, { useState, useEffect } from 'react'
import {
  Text,
  Button,
  useToast,
  Center,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { FaCaretDown } from 'react-icons/all'
import axios from 'axios'

import * as cookie from '/src/scripts/cookies'
export const Option = (props) => {
  const params = new URLSearchParams(window.location.search)
  const toast = useToast()

  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  const [settings, setSettings] = useState({})

  function updateoption() {
    axios
      .get(`https://api.0xbot.de/options/guild?id=${params.get('server')}&page=GENERAL`, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      })
      .then((res) => {
        setSettings(res.data)
      })
  }
  useEffect(() => {
    updateoption()
  }, [])

  function set(opt) {
    axios
      .post(`https://api.0xbot.de/options/guild/?id=${params.get('server')}`, {
        option: 'LANGUAGE',
        value: opt
      }, {
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      })
      .then((res) => {
        if (res.data.success) {
          toast({
            title: <Center>SUCCESS</Center>,
            description: <Center>You changed the Language to {opt}!</Center>,
            status: "success",
            duration: 1500,
            isClosable: true,
            variant: "subtle",
            position: "top-right",
            containerStyle: {
              transform: "translateY(4rem)"
            }
          })
          updateoption()
        }
      })
  }

  return (
    <Menu>
      <Text color={SwitchIconColor} fontSize="2xl">LANGUAGE</Text>
      <MenuButton as={Button} colorScheme="gray" leftIcon={<FaCaretDown />}>
        {settings.language}
      </MenuButton>
      <MenuList backgroundColor={useColorModeValue('gray.100', 'gray.900')}>
        <VStack>
          <MenuItem
            borderRadius="0.5rem"
            mr="0.5rem"
            ml="0.5rem"
            w="92.5%"
            textAlign="center"
            justifyContent="center"
            onClick={() => {set('ENGLISH')}}
          >
            ENGLISH
          </MenuItem>
          <MenuItem
            borderRadius="0.5rem"
            mr="0.5rem"
            ml="0.5rem"
            w="92.5%"
            textAlign="center"
            justifyContent="center"
            onClick={() => {set('GERMAN')}}
          >
            GERMAN
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  )
}

export default Option