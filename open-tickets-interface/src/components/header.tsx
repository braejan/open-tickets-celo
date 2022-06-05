import NextLink from "next/link";
import {
    Flex,
    useColorModeValue,
    Spacer,
    Heading,
    LinkBox,
    LinkOverlay,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
  } from "@chakra-ui/react";
import { useState }  from "react";

const siteTitle = "Open Ticket for Ethereum Virtual Machine";

const Header = function Header() {
  const [balance, setBalance] = useState<string | undefined>()

  return(
      <Flex as='header' bg={useColorModeValue('gray.100', 'gray.900')} p={4} alignItems='center'>
      <LinkBox>
        <NextLink href={'/'} passHref>
          <LinkOverlay>
            <Heading size="md">{siteTitle}</Heading>
          </LinkOverlay>
        </NextLink>
      </LinkBox>      
      <Spacer />
      <Stat>
        <StatLabel>Balance</StatLabel>
        <StatNumber>0 CELO</StatNumber>
        <StatHelpText></StatHelpText>
      </Stat>
    </Flex>
  );
}

export default Header;
