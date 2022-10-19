/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  useToast,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

const cookie = require('../../scripts/cookies')
export const Option = (props) => {
  const params = new URLSearchParams(window.location.search)
  const toast = useToast()

  const SwitchBackgroundColor = useColorModeValue('#EADDFF', '#1D192B')
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
            title: <center>SUCCESS</center>,
            description: <center>You changed the Language to {opt}!</center>,
            status: "success",
            duration: 1500,
            isClosable: true,
            variant: "subtle",
            position: "top-right",
            containerStyle: {
              transform: "translateY(2.5rem)"
            }
          })
          updateoption()
        }
      })
  }

  return (
    <Menu>
      <Text color={SwitchIconColor} fontSize="2xl">LANGUAGE</Text>
      <MenuButton as={Button} colorScheme="purple" leftIcon={<FontAwesomeIcon icon={faCaretDown} />}>
        {settings.language}
      </MenuButton>
      <MenuList backgroundColor={SwitchBackgroundColor}>
        <center>
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
        </center>
      </MenuList>
    </Menu>
  )
}; export default Option