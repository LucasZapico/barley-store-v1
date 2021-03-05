import React from 'react'
import {
  Image,
  Box,
  Text,
  Heading,
  Flex,
  VStack,
  Button,
} from '@chakra-ui/react'
import { IoCloseOutline } from 'react-icons/io5'

const CartItem = ({ item, onRemoveFromCart }) => {
  console.log('cart item')
  return (
    <Flex mb="4">
      <Image
        boxSize="120px"
        alt="test"
        objectFit="contain"
        src={item.files[1].preview_url}
      />
      <Flex flexDirection="column" justifyContent="space-between" ml="2">
        <Box>
          <Text fontSize="sm">
            Size: {item.name.split('-')[1].split('/')[1].trim()}
          </Text>
          <Heading size="sm">
            {item.name.replace('-', ' ').split('/')[0].trim()}
          </Heading>
          <Text fontSize="sm">Quantity: {item.quantity} </Text>
        </Box>
        <Box>
          <Button
            onClick={() => onRemoveFromCart(item)}
            size="sm"
            variant="link"
            rightIcon={<IoCloseOutline />}>
            Remove Item
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default CartItem
