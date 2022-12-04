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
        url: `https://api.0xbot.de/options/guild?id=${params.get('server')}&page=GENERAL`,
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
              transform: "translateY(4.5rem)"
            }
          })
          updateoption()
        }
      })
  }

  return (
    <Menu>
      <Text fontSize="2xl">LANGUAGE</Text>
      <MenuButton as={Button} colorScheme="gray" leftIcon={<TbCaretDown />}>
        {settings.language}
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
            onClick={() => setOption('ENGLISH') }
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
            onClick={() => setOption('GERMAN') }
          >
            GERMAN
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  )
}

export default Option