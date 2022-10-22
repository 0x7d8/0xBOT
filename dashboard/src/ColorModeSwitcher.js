import React from 'react'
import {
  useColorMode,
  useColorModeValue,
  Button,
  useToast
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode()
  const SwitchColorText = useColorModeValue('🌙 Dark', '☀️ Light')
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)
  const toast = useToast()

  return (
    <Button
      size="md"
      color={useColorModeValue('black', 'white')}
      fontSize="lg"
      variant="ghost"
      colorScheme="gray"
      marginLeft="2rem"
      leftIcon={<SwitchIcon />}
      iconSpacing="0rem"
      onClick={() => {
        toast({
          title: <center>INFO</center>,
          description: <center>Theme Changed to {SwitchColorText}!</center>,
          duration: 1500,
          isClosable: true,
          variant: "subtle",
          position: "top-right",
          containerStyle: {
            transform: "translateY(4rem)"
          }
        })
        toggleColorMode()
      }}
      {...props}
    />
  );
};
