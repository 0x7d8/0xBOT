import React, { useEffect, useState } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {
  Stack,
  Button,
  DarkMode,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import LogoLight from './static/LogoLight.svg';
import LogoDark from './static/LogoDark.svg';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}; export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const cookie = require('./scripts/cookies')
export const NavBar = (props) => {
  const navigate = useNavigate()
  const width = useWindowDimensions().width
  const SwitchBackgroundColor = useColorModeValue('#EADDFF', '#1D192B')
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')
  const SwitchIcon = useColorModeValue(LogoLight, LogoDark)
  let Icon = faHome; let Text = 'GO TO PANEL'
  if (window.location.pathname === '/panel') { Icon = faRightFromBracket }
  if (window.location.pathname === '/panel') { Text = 'LOG OUT' }

  const toast = useToast()
  const id = 'panel-logout'

  function doaction() {
    if (window.location.pathname !== '/panel') {
      if (toast.isActive(id)) return
      toast({
        id,
        title: <center>ERROR</center>,
        description: <center>You need to be logged in.</center>,
        status: "error",
        duration: 1500,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
        containerStyle: {
          transform: "translateY(2.5rem)"
        }
      })
    } else {
      cookie.set('accessToken', '', 1)
      cookie.set('tokenType', '', 1)
      cookie.set('userid', '', 1)

      toast({
        id,
        title: <center>SUCCESS</center>,
        description: <center>You logged out.</center>,
        status: "success",
        duration: 1500,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
        containerStyle: {
          transform: "translateY(2.5rem)"
        }
      })
      function checkToast() {
        if(toast.isActive(id)) {
          window.setTimeout(checkToast, 100);
        } else {
          window.setTimeout(() => {navigate('/')}, 600);
        }
      }
      checkToast();
    }
  }; useEffect(() => {
    document.title = '0xBOT';
  })

  if (width > 500) {
    return (
      <Stack
        zIndex="1000"
        position="sticky"
        top="0"
        marginTop="-1rem"
        h="fit-content"
        borderRadius="0rem 0rem 1rem 1rem"
        direction="row-reverse"
        color={SwitchIconColor}
        backgroundColor={SwitchBackgroundColor}
        boxShadow="lg"
      >
        <DarkMode>
          <Button
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={Icon} />}
            colorScheme="purple"
            color={SwitchIconColor}
            justifySelf="flex-end"
            marginRight="1rem"
            width="11rem"
            onClick={() => doaction()}
          >
            {Text}
          </Button>
        </DarkMode>
        <ColorModeSwitcher
          justifySelf="flex-end" 
        />
        <DarkMode>
          <Button
            flexWrap="wrap"
            flexBasis="100%"
            variant="ghost"
            _hover={{ bg: "#0xFF" }}
            _active={{ bg: "#0xFF" }}
            cursor="default"
            leftIcon={<img src={SwitchIcon} alt="" style={{ height: 32, width: 32 }}></img>}
            colorScheme="purple"
            color={SwitchIconColor}
            justifyContent="flex-start"
          >
            0xBOT
          </Button>
        </DarkMode>
      </Stack>
    )
  } else {
    return (
      <Stack
        zIndex="1000"
        position="sticky"
        top="0"
        marginTop="-1rem"
        h="fit-content"
        borderRadius="0rem 0rem 1rem 1rem"
        direction="row-reverse"
        color={SwitchIconColor}
        backgroundColor={SwitchBackgroundColor}
      >
        <DarkMode>
          <Button
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={Icon} />}
            colorScheme="purple"
            color={SwitchIconColor}
            justifySelf="flex-end"
            marginRight="1rem"
            width="10rem"
            onClick={() => doaction()}
          >
            {Text}
          </Button>
        </DarkMode>
        <ColorModeSwitcher />
        <DarkMode>
          <Button
            flexWrap="wrap"
            flexBasis="40%"
            variant="ghost"
            _hover={{ bg: "#0xFF" }}
            _active={{ bg: "#0xFF" }}
            cursor="default"
            leftIcon={<img src={SwitchIcon} alt="" style={{ height: 32, width: 32 }}></img>}
            iconSpacing="0"
            colorScheme="purple"
            color={SwitchIconColor}
            justifyContent="flex-start"
          />
        </DarkMode>
      </Stack>
    )
  }
};
