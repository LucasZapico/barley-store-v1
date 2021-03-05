import React from 'react'
import {
  Text,
  Button,
  Heading,
  Flex,
  Container,
  Image,
  Spinner,
  Center,
  SimpleGrid,
  Box,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'

const Cart = ({ cart, onRemoveFromCart }) => {
  console.log('cart', cart)
  const EmptyCart = () => (
    <Container>
      <Heading as="md">Your cart is currently empty.</Heading>
      <Link to="/">
        <Button variant="link" my="3" size="lg">
          Browse All
        </Button>
      </Link>
    </Container>
  )
  const FilledCart = () => (
    <SimpleGrid columns={{ sm: 1, md: 2 }}>
      {cart.totalItems.map((item) => (
        <CartItem item={item} onRemoveFromCart={onRemoveFromCart} />
      ))}
      <Box>
        <Button isFullWidth="true" mt="1rem" variant="outline">
          Empty Cart
        </Button>
        <Button
          isFullWidth="true"
          variant="unstyled"
          my="2"
          color="white"
          backgroundColor="black">
          Checkout
        </Button>
      </Box>
    </SimpleGrid>
  )

  return (
    <Container>
      {!cart.totalItems || cart.totalItems.length < 1 ? (
        <EmptyCart />
      ) : (
        <FilledCart />
      )}
    </Container>
  )
}

export default Cart
