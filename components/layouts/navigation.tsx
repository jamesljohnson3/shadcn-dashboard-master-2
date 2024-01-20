import * as React from 'react'
import {
  Box,
  HStack,
  IconButton,
  Kbd,
  Link,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import ThemeToggle from './theme-toggle'


import { MobileNavButton } from '../../components/mobile-nav'
import { MobileNavContent } from '../../components/mobile-nav'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'

import { SearchInput, useHotkeys } from '@saas-ui/react'

import { GlobalSearch } from '../global-search/global-search'

const Header = () => {
  const mobileNav = useDisclosure()
  const isDesktop = useBreakpointValue({ xl: true })

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useHotkeys(['/', 'CMD+K'], () => {
    onOpen()
  })

  return (
    <HStack flex="1" ps="4">
      <Box>
        {isDesktop && (
          <SearchInput
            placeholder="Search..."
            size="sm"
            borderRadius="md"
            onFocus={onOpen}
            rightElement={<Kbd fontSize="md">/</Kbd>}
          />
        )}
        <GlobalSearch
          isOpen={isOpen}
          onClose={onClose}
          onSelect={(value: any) => {
            console.log(value)
          }}
        />
      </Box>
      <HStack spacing="2" flexShrink={0} flex="1" justifyContent="flex-end">
      <div

  className="hidden lg:block" // This will make the element visible on screens larger than large
>
  <a className="mr-4 text-sm font-medium text-zinc-700 hover:text-zinc-950" href="/docs">Docs</a>
  <a className="mr-4 text-sm font-medium text-zinc-700 hover:text-zinc-950" href="/docs">Pricing</a>
  <a
    href="/demo"
    className="flex-none rounded-full bg-purple-950 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
  >
    Demo
  </a>
</div>



        <Tooltip label="Discord community">
          <IconButton
            variant="ghost"
            aria-label="discord"
            icon={<FaDiscord size="14" />}
            borderRadius="md"
            as={Link}
            href="#"
          />
        </Tooltip>

        <Tooltip label="Twitter">
          <IconButton
            variant="ghost"
            aria-label="twitter"
            icon={<FaTwitter size="14" />}
            borderRadius="md"
            as={Link}
            href="#"
          />
        </Tooltip>

        <Tooltip label="Github">
          <IconButton
            variant="ghost"
            aria-label="github"
            icon={<FaGithub size="14" />}
            borderRadius="md"
            as={Link}
            href="#"
          />
        </Tooltip>

        <ThemeToggle />


        <MobileNavButton
          aria-label="Open Menu"
          onClick={mobileNav.onOpen}
        />

        <MobileNavContent
          isOpen={mobileNav.isOpen}
          onClose={mobileNav.onClose}
        />
      </HStack>
    </HStack>
  )
}

export default Header