
"use client"
import * as React from 'react'
import NextTopLoader from "nextjs-toploader";

import { Box, BoxProps, Container, HStack } from '@chakra-ui/react'
import Navigation from './navigation'
import Logo from './logo'
import { useScroll } from 'framer-motion'
import { useSession } from 'next-auth/react';
import ProfileLink from "@/components/ProfileLink";
import { KnockFeedProvider, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react-notification-feed";
import "@knocklabs/react-notification-feed/dist/index.css";
import { useRef, useState } from 'react';

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}
  const { data: session } = useSession();
  const notifButtonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  console.log('userID:', session.user.id);

  const { scrollY } = useScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (

    <>   <NextTopLoader
    color="#7B00D3"
  initialPosition={0.78}
  crawlSpeed={800}
  height={3}
  crawl={true}
  showSpinner={false}
  easing="ease"
  speed={400}
  shadow="0 0 10px #7B00D3,0 0 5px #7B00D3"
  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  zIndex={1600}
  showAtBottom={false}
    
    
    />
<Box

      ref={ref}
      as="header"
      top="0"
      w="full"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="slow"
      boxShadow={y > height ? 'md' : ''}
      bg="whiteAlpha.900"
      _dark={{
        bg: 'transparent',
      }}
      {...props}
    >
      <Box
        zIndex="1"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bottom: '-7px',
          backdropFilter: 'blur(16px)',
          mask: 'linear-gradient(to-b, black, transparent)',
          WebkitMask: 'linear-gradient(to bottom, black 60px, transparent)',
        }}
      >
        <Box borderBottomWidth="0.5px" position="relative" zIndex="1">
          <Container maxW="container.2xl" px={{ base: 4, sm: 8 }} py="2">
          <HStack width="full" align="center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Logo
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();

                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }
                } } />
              {session ? <></> :  <Navigation />      }             
              
                        <div
                style={{ maxWidth: '300px', textAlign: 'right' }}
className="flex items-center"
              > {session ? 
                <>
               <div className="mr-4">
                      <KnockFeedProvider
                        userId={session.user.id}
                        apiKey="pk_test_IZNgSck2-OV8vzX6lpFUAfRIRTy1gdLlpcUR2WW5lks"
                        feedId="a3805774-8c6c-4605-a9bf-ad3bdb972100"
                      >
                        <>
                          <NotificationIconButton ref={notifButtonRef} onClick={() => setIsVisible(!isVisible)} />
                          <NotificationFeedPopover
                            buttonRef={notifButtonRef}
                            isVisible={isVisible}
                            className={`h-10 w-10`}
                            onClose={() => setIsVisible(false)} />
                        </>
                      </KnockFeedProvider>
                    </div><ProfileLink user={session.user} /></> :  <a
              href="/login"
              className="hidden lg:block items-center gap-2.5 rounded-full bg-black px-6 py-1 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              Login
             
            </a>}</div>

            </HStack>
          </Container>
        </Box>
      </Box>
    </Box></>
  )
}

export default Header