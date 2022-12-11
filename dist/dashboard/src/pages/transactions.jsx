import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Flex,
  Heading,
  HStack,
  VStack,
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

import { TbArrowDown, TbCaretDown, TbSearch } from 'react-icons/all'
import ImageSlash from '/src/static/ImageSlash.svg';
import axios from 'axios'

import Animated from '/src/Animated'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  };
}; function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

function TransactionBox(props) {
  const width = useWindowDimensions().width

  let useWidth = 100
  if (width < 1150 && width > 750) { useWidth = 75 }

  let sender = `${props.userobjs.sender.username}#${props.userobjs.sender.usertag}`
  if (props.userobjs.sender.username === 'unknown') sender = props.userobjs.sender.id
  let reciever = `${props.userobjs.reciever.username}#${props.userobjs.reciever.usertag}`
  if (props.userobjs.reciever.username === 'unknown') reciever = props.userobjs.reciever.id

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
}; const TransactionList = () => {
  const width = useWindowDimensions().width
  let useWidth = 1
  if (width > 1150) { useWidth = 2 }

  const [ results, setResults ] = useState([])

  window.doSearch = async() => {
    let senderId = document.getElementById('SenderIDField').value
    let recieverId = document.getElementById('RecieverIDField').value

    if (senderId === '') senderId = 'empty'
    if (recieverId === '') recieverId = 'empty'

    const req = await axios({
      method: 'get',
      url: 'https://api.0xbot.de/transactions/search',
      validateStatus: false,
      headers: {
        maxresults: window.getResults(),
        senderId: senderId,
        recieverId: recieverId
      }
    }); const res = req.data

    setResults(res.results)
  }; useEffect(() => { window.doSearch() }, [])

  return (
    <React.Fragment>
      <Grid
        templateColumns={`repeat(${useWidth}, 1fr)`}
        gap="1rem"
      >
        {results?.map((transaction) => (
          <Box key={transaction.id}>
            <TransactionBox 
              userobjs={transaction}
            />
          </Box>
        ))}
      </Grid>
    </React.Fragment>
  );
}; function SearchBox() {
  const [ results, setResults ] = useState(25)

  window.getResults = () => results

  return (
    <Flex alignItems="center" marginTop="2rem" justifyContent="center">
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
        >
          TRANSACTION VIEWER
        </Heading>

        <Flex
          w="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={12}
        >
          <Input
            w="20rem"
            mb="0.5rem"
            id="SenderIDField"
            placeholder="Sender ID"
            type="text"
            variant="outline"
            textAlign="center"
            alignSelf="center"
          />

          <TbArrowDown size={48} />

          <Input
            w="20rem"
            mt="0.5rem"
            id="RecieverIDField"
            placeholder="Reciever ID"
            type="text"
            variant="outline"
            textAlign="center"
            alignSelf="center"
          />
        </Flex>

        <HStack justifyContent="center">
          <Button
            w="10rem"
            variant="outline"
            colorScheme="gray"
            alignSelf="center"
            leftIcon={<TbSearch size={24} />}
            onClick={() => window.doSearch() }
          >
            SEARCH
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              mt="2rem"
              w="6rem"
              colorScheme="gray"
              variant="outline"
              alignSelf="center"
              leftIcon={<TbCaretDown size={24} />}
            >
              {results}
            </MenuButton>
            <MenuList backgroundColor={useColorModeValue('gray.100', 'gray.900')}>
              <VStack w="100%">
                <MenuItem
                  borderRadius="0.5rem"
                  mr="0.5rem"
                  ml="0.5rem"
                  w="92.5%"
                  textAlign="center"
                  justifyContent="center"
                  onClick={() => setResults(25) }
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
                  onClick={() => setResults(50) }
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
                  onClick={() => setResults(100) }
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
                  onClick={() => setResults(250) }
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
                  onClick={() => setResults(500) }
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
                  onClick={() => setResults(1000) }
                >
                  1000
                </MenuItem>
              </VStack>
            </MenuList>
          </Menu>
        </HStack>
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
          <TransactionList />
        </Grid>
      </Box>
    </Animated>
  )
}
  
export default Panel