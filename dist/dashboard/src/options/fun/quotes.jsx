import React, { useState, useEffect } from 'react'
import {
  Text,
  Button,
  useToast,
  Center,
  VStack,
  Menu,
  useColorModeValue,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { TbCaretDown } from 'react-icons/all'
import axios from 'axios'

import * as cookie from '/src/scripts/cookies'
function Option() {
  const params = new URLSearchParams(window.location.search)
  const toast = useToast()

  const [ settings, setSettings ] = useState({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    {(async() => {
      const req = await axios({
        method: 'get',
        url: `https://api.0xbot.de/options/guild?id=${params.get('server')}&page=FUN`,
        validateStatus: false,
        headers: {
          accesstoken: cookie.get('accessToken'),
          tokentype: cookie.get('tokenType'),
          userid: cookie.get('userid')
        }
      }); const res = req.data
      
      setSettings(res)
    }) ()}
  }, [])

  const setOption = (opt) => {
    axios
      .post(`https://api.0xbot.de/options/guild/?id=${params.get('server')}`, {
        option: 'QUOTES',
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
            title: <Center>SUCCESS</Center>,
            description: <Center>You {calcopt} Quotes!</Center>,
            status: "success",
            duration: 1500,
            isClosable: true,
            variant: "subtle",
            position: "top-right",
            containerStyle: {
              transform: "translateY(4.5rem)"
            }
          })
          updateoption()
        }
      })
  }

  // Translate Boolean to String
  let reformedquotes = 'DISABLED'
  if (settings.quotes) { reformedquotes = 'ENABLED' }

  return (
    <Menu>
      <Text fontSize="2xl" mt="1rem">QUOTE SYSTEM</Text>
      <MenuButton as={Button} colorScheme="gray" leftIcon={<TbCaretDown />}>
        {reformedquotes}
      </MenuButton>
      <MenuList bg={useColorModeValue('gray.100', 'gray.900')}>
        <VStack>
          <MenuItem
            borderRadius="0.5rem"
            mr="0.5rem"
            ml="0.5rem"
            w="92.5%"
            textAlign="center"
            justifyContent="center"
            onClick={() => setOption(true) }
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
            onClick={() => setOption(false) }
          >
            DISABLE
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  )
}

export default Option