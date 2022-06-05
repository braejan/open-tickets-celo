import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading, Box} from "@chakra-ui/layout"
import {
  Button,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { useState, useEffect } from "react"
import { ethers } from 'ethers'
import  ReadOpenTicket from "../components/ReadOpenTicket"

declare let window:any;

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainName, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)){
      return
    }
    //client side code
    if(!window.ethereum) {
    return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    provider.getBalance(currentAccount)
      .then((result) => {
        setBalance(ethers.utils.formatEther(result))
      })

    provider.getNetwork()
      .then((result) => {
        setChainId(result.chainId)
        setChainName(result.name)
      })
  }, [currentAccount])

const onClickConnect = ()=> {
  if(!window.ethereum) {
    console.log('Please install Metamask wallet.')
    return
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", [])
    .then((accounts) => {
      if(accounts.length > 0) {
        setCurrentAccount(accounts[0])
      }
    })
    .catch((errorSend) => {
      console.log(errorSend)
    })
}

const onClickDisconnect = () => {
  console.log("Metamask wallet disconnected.")
  setCurrentAccount(undefined)
  setBalance(undefined)
}


  return (
    <>
      <Head>
        <title>Open Ticket for Ethereum Virtual Machine</title>
      </Head>

      <Heading as="h3"  my={4}>Explore Admission events and Tickets</Heading>          
      <VStack>
        <Box w='100%' my={4}>
        {currentAccount  
          ? <Button type="button" w='100%' onClick={onClickDisconnect}>
                Account:{currentAccount}
            </Button>
          : <Button type="button" w='100%' onClick={onClickConnect}>
                  Connect MetaMask
              </Button>
        }
        </Box>
        {currentAccount  
          ?<Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Account info</Heading>
          <Stat>
            <StatLabel>ChainId {chainId}</StatLabel>
            <StatNumber>Celo {balance}</StatNumber>
            <StatHelpText>Name: {chainName}</StatHelpText>
          </Stat>
        </Box>
        :<></>
        }
        {currentAccount
        ?<Box mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Read ClassToken Info</Heading>
          <ReadOpenTicket 
            addressContract='0xC2Da36352D9A7f1e21Bc76859Ddbe8C0470e06c7'
            currentAccount={currentAccount}
          />
        </Box>
        :<></>
        }
      </VStack>
    </>
  )
}

export default Home;
