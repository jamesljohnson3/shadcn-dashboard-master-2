'use client'
import React, { useState } from 'react';
import { SaasProvider } from '@saas-ui/react';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link'
import { AppProvider } from './utils/AppContext';
import {NextUIProvider} from '@nextui-org/react'
import { trpc } from '@/app/_trpc/client'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { PropsWithChildren } from 'react'
import { CacheProvider } from '@chakra-ui/next-js';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../theme/globalstyles';
import { default as theme } from '../theme/theme';
import { ThemeProvider } from '@/components/ThemeProvider';


const customTheme = extendTheme(theme);

// eslint-disable-next-line react/display-name
const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />
)
// Define the Providers component
export const Providers = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
      trpc.createClient({
          links: [
              httpBatchLink({
                  url: "https://store.unlimitpotential.com/api/trpc",
              }),
          ],
      })
  )
  
  return (<AppProvider><trpc.Provider
    client={trpcClient}
    queryClient={queryClient}>
    <QueryClientProvider client={queryClient}> <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={customTheme}>
        <Global styles={GlobalStyle} />

   <SaasProvider linkComponent={Link}>    <NextUIProvider><ThemeProvider
  enableSystem={false}
  defaultTheme="light"
  attribute="class"
  >
{children}  </ThemeProvider>  </NextUIProvider>
</SaasProvider>
    </ChakraProvider>  
    </CacheProvider>
            </QueryClientProvider>
        </trpc.Provider></AppProvider>
  );
}