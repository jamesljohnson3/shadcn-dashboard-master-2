import {
  Box,
  BoxProps,
  Center,
  CenterProps,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'
import Logo from '../../components/layouts/logo2'

import headerNav from '../../data/header-nav'

interface NavLinkProps extends CenterProps {
  label: string
  href?: string
  isActive?: boolean
}

function NavLink({ href, children, label, isActive, ...rest }: NavLinkProps) {
  const bgActiveHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')

 
  return (
  <></>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen } = props
  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')


  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
 
  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w="100%"
              bg={bgColor}
              h="100vh"
              overflow="auto"
              position="fixed"
              top="0"
              left="0"
              zIndex="sticky"
              pb="8"
              backdropFilter="blur(5px)"
            >
              <Box>
                <Flex justify="space-between" px="8" pt="4" pb="4">
                  <Logo />
                  <HStack spacing="5">
                   X
                  </HStack>
                </Flex>
                <Grid
                  px="6"
                  pb="6"
                  pt="2"
                  templateColumns="repeat(2, 1fr)"
                  gap="2"
                >
                  {headerNav.map(
                    ({ href, id, title, colorScheme, ...props }, i) => {
                      return (
                        <NavLink
                          href={href || `/#${id}`}
                          key={i}
                          {...(props as any)}
                        >
                          {title}
                        </NavLink>
                      )
                    }
                  )}
                </Grid>
              </Box>

              <ScrollView
                
              >
               Sidebar Content
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props



  return (
    <Box
      flex="1"
      id="routes"
      overflow="auto"
      px="6"
      pb="6"
      {...rest}
    />
  )
}

export const MobileNavButton = 
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <><IconButton
        ref={ref}
        display={{ base: 'flex', lg: 'none' }}
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props} /></>
    )
  }


MobileNavButton.displayName = 'MobileNavButton'
