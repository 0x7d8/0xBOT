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
      .get(`https://api.0xbot.de/options/guild?id=${params.get('server')}&page=ECONOMY`, {
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
        option: 'BUSINESSES',
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
          let calcopt = 'Disabled'
          if (opt) calcopt = 'Enabled'
          toast({
            title: <center>SUCCESS</center>,
            description: <center>You {calcopt} Businesses!</center>,
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

  // Translate Boolean to String
  let reformedbusinesses = 'DISABLED'
  if (settings.businesses) { reformedbusinesses = 'ENABLED' }

  return (
    <Menu>
      <Text color={SwitchIconColor} fontSize="2xl">BUSINESS SYSTEM</Text>
      <MenuButton as={Button} colorScheme="purple" leftIcon={<FontAwesomeIcon icon={faCaretDown} />}>
        {reformedbusinesses}
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
            onClick={() => {set(true)}}
          >
            ENABLE
          </MenuItem>
          <MenuItem
            borderRadius="0.5rem"
            mr="0.5rem"
            ml="0.5rem"
            w="92.5%"
            textAlign="center"
            justifyContent="center"
            onClick={() => {set(false)}}
          >
            DISABLE
          </MenuItem>
        </center>
      </MenuList>
    </Menu>
  )
}; export default Option