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
        option: 'LANGUAGE',
        value: opt
      }, {
        headers: {
          authToken: cookies.authToken
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
          setText(opt)
        }
      })
  }

  useEffect(() => {
    setText(settings.language)
  }, [settings])

  return (
    <Menu>
      <Text fontSize="2xl">LANGUAGE</Text>
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
            onClick={() => setOption('ENGLISH')}
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
            onClick={() => setOption('GERMAN')}
          >
            GERMAN
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  )
}

export default Option