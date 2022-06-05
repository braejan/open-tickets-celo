import React, { useEffect,useState } from 'react'
import {
  Text,
  Box,
  Button,
  ButtonGroup,
  Heading,
} from '@chakra-ui/react'
import { ethers } from 'ethers' 
interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

const ReadOpenTicket = function (props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const onViewEventsClick = () => {
    
  }
  return (
    <div>
        <Text >OpenTicket Smart Contract: {addressContract}</Text>
        <Text >Current account: {currentAccount}</Text>
        <Box mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Open Ticket methods:</Heading>
          <ButtonGroup gap='4'>
            <Button colorScheme='yellow'>View events</Button>
          </ButtonGroup>
        </Box>
    </div>
  )
}

export default ReadOpenTicket


