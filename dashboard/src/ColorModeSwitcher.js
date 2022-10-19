import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  DarkMode,
  useToast
} from '@chakra-ui/react';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchColorText = useColorModeValue('🌙 Dark', '☀️ Light');
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast()

  return (
    <DarkMode>
      <IconButton
        size="md"
        color={SwitchIconColor}
        fontSize="lg"
        variant="ghost"
        marginLeft="2rem"
        onClick={() => {
          toast({
            title: <center>INFO</center>,
            description: <center>Theme Changed to {SwitchColorText}!</center>,
            duration: 1500,
            isClosable: true,
            variant: "subtle",
            position: "top-right",
            containerStyle: {
              transform: "translateY(2.5rem)"
            }
          })
          toggleColorMode()
        }}
        icon={<SwitchIcon />}
        {...props}
      />
    </DarkMode>
  );
};
