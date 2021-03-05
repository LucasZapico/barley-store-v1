import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

import {
  Button,
  ButtonGroup,
  Flex,
  Box,
  Image,
  Text,
  Heading,
  FormLabel,
  FormControl,
  Select,
  Grid,
  GridItem,
  Center,
  Container,
  VStack,
} from '@chakra-ui/react'

const Product = ({ selectProduct }) => {
  // color
  // sizes
  console.log('current prodcut', selectProduct)
  return (
    <Center>
      <Box boxSize="md">
        <Image
          alt="test"
          objectFit="contain"
          src={selectProduct && selectProduct.image}
        />
      </Box>
    </Center>
  )
}

const ProductVariant = ({ products, setSelectProduct, selectProduct }) => {
  // const productTitle = product[0].name.split('-')[0]
  console.log('current prodcut', selectProduct)
  return (
    <div className="product variants w-50-m">
      <Text fontSize="xl" pb="1rem">
        Color: {selectProduct && selectProduct.name}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {products &&
          products.map((p) => (
            <Box
              boxSize={{ base: '100px' }}
              role="button"
              onClick={() => setSelectProduct(p)}
              tabIndex={0}
              onKeyPress={() => setSelectProduct(p)}>
              <Image objectFit="contain" alt={p.name} src={p.image} />
            </Box>
          ))}
      </Grid>
    </div>
  )
}
const HomePage = ({ onAddToCart, products }) => {
  // add placeholder to selectProduct
  const [selectProduct, setSelectProduct] = useState({})
  const [selectSize, setSelectSize] = useState('S')
  const [productVariants, setProductVariants] = useState([])
  const [productInfo, setProductInfo] = useState({})
  console.log('current', selectProduct)
  // create variation and image object
  useEffect(() => {
    const productVars = []
    const productPriceBySize = []
    // loop over products and add each new product to variant object
    if (products.sync_variants) {
      products.sync_variants.forEach((p) => {
        const colorName = p.name.split('-')[1].split('/')[0].trim()
        const colorSize = p.name.split('-')[1].split('/')[1].trim()
        const colorObj = {
          image: p.files[1].preview_url,
          name: colorName,
          sizes: new Set(colorSize),
          price: p.retail_price,
        }
        // product variants
        // productVars = _.unionBy(productVars, [colorObj], 'name')
        if (productVars.length < 1) {
          productVars.push(colorObj)
        } else {
          let match = true
          for (let i = 0; i < productVars.length; i += 1) {
            if (productVars[i].name === colorName) {
              productVars[i].sizes.add(colorSize)
              match = true
              break
            } else {
              match = false
            }
          }
          if (match === false) {
            productVars.push(colorObj)
          }
        }

        // create basic product info object
        setProductInfo({ name: products.sync_product.name })
      })
      console.log('product variants', productVars)
      setProductVariants(productVars)
      setSelectProduct(productVars[0])
    }
  }, [products])

  useLayoutEffect(() => {}, [selectSize])

  return (
    <>
      <Container>
        <Flex flexDirection="column" wrap="wrap">
          {products && (
            <Product
              product={selectProduct}
              setSelectProduct={setSelectProduct}
              selectProduct={selectProduct}
            />
          )}
          <Heading as="h6">{productInfo.name}</Heading>
          {products && (
            <ProductVariant
              products={productVariants}
              setSelectProduct={setSelectProduct}
              selectProduct={selectProduct}
            />
          )}
        </Flex>
        <Box my="1rem">
          <Text fontSize="xl">Size</Text>
          <Flex grow="1">
            {selectProduct.sizes &&
              Array.from(selectProduct.sizes).map((size) => (
                <Button
                  flex="1"
                  mr="2"
                  color={selectSize == size ? 'white' : 'gray'}
                  backgroundColor={selectSize == size ? 'black' : 'white'}
                  variant="unstyled"
                  onClick={(e) => {
                    console.log('test', String(selectSize) == String(size))
                    console.log('zie', e.target.value == size)
                    return setSelectSize(e.target.value)
                  }}
                  value={size}>
                  {size}
                </Button>
              ))}
          </Flex>
        </Box>
        <Button
          my="1rem"
          isFullWidth="true"
          id="add-to-cart"
          color="white"
          backgroundColor="black"
          variant="unstyled"
          onClick={() => onAddToCart(selectProduct, selectSize)}>
          Add to Cart
        </Button>
      </Container>
    </>
  )
}

export default HomePage
