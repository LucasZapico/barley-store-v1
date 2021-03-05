import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { GrCart, GrFormClose } from 'react-icons/gr'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsBag } from 'react-icons/bs'
import { useSpring, animated as a } from 'react-spring'
import {
  Flex,
  Spacer,
  Text,
  Heading,
  Box,
  Image,
  Button,
  Badge,
  Icon,
} from '@chakra-ui/react'
import logo from '../assets/img/barley-water-mark.png'

const Navigation = ({ cart }) => {
  const [showSideNav, setShowSideNav] = useState(false)
  console.log(cart)
  return (
    <Flex
      width={{ sm: 'full' }}
      as="nav"
      padding="1rem"
      align="center"
      justify="space-between"
      wrap="wrap"
      top="0px"
      position="sticky">
      <Link to="/">
        <Button variant="unstyled">
          <Image boxSize="40px" src={logo} />
          {/* <Icon name="cart" w={10} h={10}>
            <AiOutlineMenu />
          </Icon> */}
        </Button>
      </Link>
      <Spacer />
      <Link to="/cart">
        <Button variant="unstyled" pos="relative" mr="2">
          <Icon name="cart" w={10} h={10} pos="absolute" top="0">
            <BsBag />
          </Icon>
          <Text fontSize="sm" pr=".8" pos="absolute" top="2" right="0">
            {cart && cart.totalItems ? cart.totalItems.length : undefined}
          </Text>
        </Button>
      </Link>
    </Flex>
  )
}

export default Navigation
