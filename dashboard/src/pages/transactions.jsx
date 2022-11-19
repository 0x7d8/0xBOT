import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Heading,
  Center,
  useColorModeValue,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { FaArrowRight, FaCaretDown } from 'react-icons/all'
import ImageSlash from '../static/image-slash.svg';
import axios from 'axios'

import Animated from '../Animated'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}; function useWindowDimensions() {
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

function ResultBox(props) {
  const width = useWindowDimensions().width

  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  let useWidth = 100
  if (width < 1150 && width > 750) { useWidth = 75 }

  let sender = `${props.userobjs.sender.username}#${props.userobjs.sender.usertag}`
  if (isNaN(props.userobjs.sender.id.slice(-1))) sender = props.userobjs.sender.id
  let reciever = `${props.userobjs.reciever.username}#${props.userobjs.reciever.usertag}`
  if (isNaN(props.userobjs.reciever.id.slice(-1))) reciever = props.userobjs.reciever.id

  return (
    <Flex alignItems="center" marginTop="2rem" id={props.id} justifyContent="center">
              <Flex
                w={`${useWidth}%`}
                flexDirection="row"
                bg={useColorModeValue('gray.100', 'gray.900')}
                p={12}
                borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                borderWidth="1px"
                borderRadius="1rem"
                className="shadow-md"
              >
                <Flex
                  direction="column"
                >
                  <Image
                    alignSelf='self-start'
                    borderRadius='full'
                    boxSize='150px'
                    src={`https://cdn.discordapp.com/avatars/${props.userobjs.sender.id}/${props.userobjs.sender.avatar}.png`}
                    fallbackSrc={ImageSlash}
                    alt='Server Icon'
                  />
                </Flex>
                <Flex
                  w="80%"
                  marginTop="-3rem"
                  marginBottom="-1.5rem"
                  direction="column"
                  justifyContent="center"
                >
                  <Stat
                    color={SwitchIconColor}
                    border="1px"
                    borderRadius="0.5rem"
                    borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                    alignSelf="center"
                    w="50%"
                    mt="2rem"
                  >
                    <StatLabel>{props.userobjs.id}</StatLabel>
                  </Stat>
                  <Stat
                    color={SwitchIconColor}
                    border="1px"
                    borderRadius="0.5rem"
                    borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                    alignSelf="center"
                    w="50%"
                    mt="2rem"
                  >
                    <StatLabel>{sender}</StatLabel>
                    <StatNumber>${props.userobjs.sender.amount}</StatNumber>
                  </Stat>
                  <Stat
                    color={SwitchIconColor}
                    border="1px"
                    borderRadius="0.5rem"
                    borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                    alignSelf="center"
                    w="50%"
                    mt="2rem"
                  >
                    <StatLabel>TO</StatLabel>
                    <StatNumber>{reciever}</StatNumber>
                  </Stat>
                </Flex>
              </Flex>
            </Flex>
  )
}; const ResultsContainer = () => {
  const width = useWindowDimensions().width
  let useWidth = 1
  if (width > 1150) { useWidth = 2 }

  const [cards, setCards] = useState([])

  useEffect(() => {
    window.dosearch()
  }, [])

  window.dosearch = () => {
    let senderId = document.getElementById('SenderIDField').value
    let recieverId = document.getElementById('RecieverIDField').value

    if (senderId === '') senderId = 'empty'
    if (recieverId === '') recieverId = 'empty'

    axios
      .get(`https://api.0xbot.de/transactions/search`, {
        headers: {
          maxresults: window.getresults(),
          senderId: senderId,
          recieverId: recieverId
        }
      })
      .then((res) => {
        setCards(res.data)
      })
  }

  return (
    <React.Fragment>
      <Grid
        templateColumns={`repeat(${useWidth}, 1fr)`}
        gap="1rem"
      >
        {cards?.map(transaction => (
          <ResultBox 
            key={transaction.id}
            userobjs={transaction}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
}; function SearchBox() {
  const SwitchIconColor = useColorModeValue('#21005D', '#37009B')

  const [results, setResults] = useState(25)

  window.maxresults = (choice) => {
    setResults(choice)
    window.dosearch()
  }; window.getresults = () => {
    return results
  }

  return (
    <Flex alignItems="center" marginTop="2rem">
      <Flex
        w="100%"
        flexDirection="column"
        bg={useColorModeValue('gray.100', 'gray.900')}
        p={12}
        borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
        borderWidth="1px"
        borderRadius="1rem"
        className="shadow-md"
      >
        <Heading
          mt='-2rem'
          mb={6}
          color={SwitchIconColor}
        >
          TRANSACTION VIEWER
        </Heading>

        <Flex
          w="100%"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          p={12}
        >
          <Input
            mr="2rem"
            w="20rem"
            id="SenderIDField"
            placeholder="Sender ID"
            type="text"
            variant="outline"
            textAlign="center"
            alignSelf="center"
          />

          <FaArrowRight />

          <Input
            ml="2rem"
            w="20rem"
            id="RecieverIDField"
            placeholder="Reciever ID"
            type="text"
            variant="outline"
            textAlign="center"
            alignSelf="center"
          />
        </Flex>

        <Button
          w="10rem"
          variant="outline"
          colorScheme="gray"
          alignSelf="center"
          onClick={() => {window.dosearch()}}
        >
          SEARCH
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            mt="2rem"
            w="10rem"
            colorScheme="gray"
            variant="outline"
            alignSelf="center"
            leftIcon={<FaCaretDown />}
          >
            {results}
          </MenuButton>
          <MenuList backgroundColor={useColorModeValue('gray.100', 'gray.900')}>
            <Center>
              <MenuItem
                borderRadius="0.5rem"
                mr="0.5rem"
                ml="0.5rem"
                w="92.5%"
                textAlign="center"
                justifyContent="center"
                onClick={() => {window.maxresults(25)}}
              >
                25
              </MenuItem>
              <MenuItem
                borderRadius="0.5rem"
                mr="0.5rem"
                ml="0.5rem"
                w="92.5%"
                textAlign="center"
                justifyContent="center"
                onClick={() => {window.maxresults(50)}}
              >
                50
              </MenuItem>
              <MenuItem
                borderRadius="0.5rem"
                mr="0.5rem"
                ml="0.5rem"
                w="92.5%"
                textAlign="center"
                justifyContent="center"
                onClick={() => {window.maxresults(100)}}
              >
                100
              </MenuItem>
              <MenuItem
                borderRadius="0.5rem"
                mr="0.5rem"
                ml="0.5rem"
                w="92.5%"
                textAlign="center"
                justifyContent="center"
                onClick={() => {window.maxresults(250)}}
              >
                250
              </MenuItem>
              <MenuItem
                borderRadius="0.5rem"
                mr="0.5rem"
                ml="0.5rem"
                w="92.5%"
                textAlign="center"
                justifyContent="center"
                onClick={() => {window.maxresults(500)}}
              >
                500
              </MenuItem>
              <MenuItem
                borderRadius="0.5rem"
                mr="0.5rem"
                ml="0.5rem"
                w="92.5%"
                textAlign="center"
                justifyContent="center"
                onClick={() => {window.maxresults(1000)}}
              >
                1000
              </MenuItem>
            </Center>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
function Panel() {    
  return (
    <Animated>
      <Box textAlign="center" fontSize="xl" mt="6.2rem">
        <Grid minH="0%" p={3}>
          <SearchBox />
          <ResultsContainer />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Panel