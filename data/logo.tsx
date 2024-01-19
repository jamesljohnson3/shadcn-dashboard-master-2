import {
  Box,
  Flex,
  Heading,
  useBreakpointValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import AccessibleLink from '../components/link'
import React from 'react'
import Image from 'next/image';

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

import siteConfig from '../data/site-config'

const Logo = ({ href = '/', onClick }: LogoProps) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })
  let logo
  if (siteConfig.logo) {
    logo = (
      <Box
        as={isMobile ? siteConfig.logoIcon : siteConfig.logo}
        height="32px"
        mt="-4px"
      />
    )
  } else {
    logo = (
      <Heading as="h1" size="md">
        {siteConfig.seo?.title}
      </Heading>
    )
  }

  return (
    <Flex h="8" flexShrink="0" alignItems="center" justifyContent="center">
      <AccessibleLink href={href} display="flex" p="1" borderRadius="sm" onClick={onClick}>
        <Image
          src="https://res.cloudinary.com/unlimitpotential/image/upload/v1684563172/now_logo-removebg-preview_vcu827.png"
          alt="Logo"
          width={110}
          height={110} // Adjust the height if needed
        />
        <VisuallyHidden>{siteConfig.seo?.title}</VisuallyHidden>
      </AccessibleLink>
    </Flex>
  )
}

export default Logo
