import React, { useEffect, useState } from 'react'
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
import { TbCaretDown } from 'react-icons/tb'
import axios from 'axios'

function Option({ settings, cookies }) {
  const [ text, setText ] = useState('DISABLED')
  const params = new URLSearchParams(window.location.search)
  const toast = useToast()

  const setOption = (opt) => {
    axios
      .post(`https://api.0xbot.de/options/guild?id=${params.get('server')}`, {
        option: 'QUOTES',
        value: opt
      }, {
        headers: {
          authToken: cookies.authToken
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
          setText(calcopt.toUpperCase())
        }
      })
  }

  useEffect(() => {
    if (settings.quotes) setText('ENABLED')
  }, [settings])

  return (
    <Menu>
      <Text fontSize="2xl" mt="1rem">QUOTE SYSTEM</Text>
      <MenuButton as={Button} colorScheme="gray" leftIcon={<TbCaretDown />}>
        {text}
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
            onClick={() => setOption(true)}
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
            onClick={() => setOption(false)}
          >
            DISABLE
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  )
}

export default Option