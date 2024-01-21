/* eslint-disable @next/next/no-img-element */

"use client"
/** @format */

import React, { useState }from 'react';

import { AppShell,  } from '@saas-ui/app-shell'
import {
    Sidebar,
    SidebarSection,
    NavGroup,
    SidebarOverlay,
    NavItem,
  } from '@saas-ui/sidebar'
  import ThemeToggle from "../components/layouts/theme-toggle-white";
  import { IconButton, Spacer, Image, Heading, HStack } from "@chakra-ui/react";
  import { Popover } from '@headlessui/react'
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  Settings,
  ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

function Links({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] px-3  pb-10  ">
      
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default"
          },
      
          {
            title: "Ordrs",
            href: "/orders",
            icon: ShoppingCart,
            variant: "ghost"
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}


 function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleNavItemClick = (path) => {
    if (path) {
      window.location.href = path; // Update window location
    } else if (action) {
      action();
    }
    // onClose(); // Assuming onClose is a function you have defined somewhere
  };
  return ( <div  className="bg-white dark:bg-black mr-6 rounded-xl hidden sm:block md:block">

    <AppShell
      sidebar={<HStack spacing="0" alignItems="stretch"
      >
<Sidebar
  variant="condensed"
  borderWidth="0"
  spacing="3"
  style={{
    background: 'linear-gradient(to bottom, #4A2673, #331E53) 80%', // Adjust the color codes and percentage as needed
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add a background shadow
    borderRadius: '8px', // Add border-radius for rounded corners
    padding: '2px', // Add padding for content spacing
    position: 'relative', // Ensure positioning for glow effect
    overflow: 'hidden', // Ensure overflow behavior for glow effect
  }}
>           <SidebarSection>
       
          <NavItem >
            
            </NavItem>
          </SidebarSection>
          <SidebarSection>
         
     
            <NavItem><IconButton
                onClick={onToggle}
                variant="ghost"
                size="sm"
                icon={isOpen ? <svg  xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                strokeWidth="2"><path fill="#000000" fill-rule="evenodd" d="M5.484 2.917c.817.22 1.612.62 2.509 1.403a.75.75 0 01.085 1.044l-.422.51 1.13.855.62-.802a.75.75 0 011.08-.113c.678.576.906 1.133.959 1.642.011.111.013.21.014.283v.044c.204.187.417.369.635.552l1.784-2.098-.712-.584-.1.018-.021.003a3.018 3.018 0 01-.395.051c-.132.006-.456.009-.736-.217a1.173 1.173 0 01-.388-.646c-.039-.16-.054-.33-.063-.436l-.002-.012a8.261 8.261 0 00-.012-.128c-1.814-1.199-3.99-1.864-5.965-1.37zm7.789 2.723h-.002.002zM7.868 7.915l-1.17-.884-3.972 4.804a.25.25 0 00.036.354l.913.73a.25.25 0 00.354-.042l3.84-4.962zM6.433 5a4.169 4.169 0 00-1.352-.638c-.463-.123-.908-.167-1.47-.224a42.642 42.642 0 01-.68-.073.75.75 0 01-.378-1.333c3.21-2.54 7.208-1.427 9.914.432a1.142 1.142 0 01.428.681c.026.112.04.23.05.325a2.32 2.32 0 01.285-.028c.143-.004.46.003.734.227l.148.12c.45.368.773.633 1.31 1.082a.75.75 0 01.09 1.062l-2.757 3.24a.75.75 0 01-1.052.089l-.253-.21a23.8 23.8 0 01-1.146-.994 1.128 1.128 0 01-.34-.779c-.004-.066-.004-.141-.005-.192v-.03a2.37 2.37 0 00-.002-.089l-4.742 6.128a1.75 1.75 0 01-2.477.296l-.913-.73a1.75 1.75 0 01-.255-2.482l4.863-5.88zm6.153-.772a.127.127 0 01.002 0h-.002z" clip-rule="evenodd"/></svg> : <svg  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                  strokeWidth="2"><path fill="#000000" fill-rule="evenodd" d="M5.484 2.917c.817.22 1.612.62 2.509 1.403a.75.75 0 01.085 1.044l-.422.51 1.13.855.62-.802a.75.75 0 011.08-.113c.678.576.906 1.133.959 1.642.011.111.013.21.014.283v.044c.204.187.417.369.635.552l1.784-2.098-.712-.584-.1.018-.021.003a3.018 3.018 0 01-.395.051c-.132.006-.456.009-.736-.217a1.173 1.173 0 01-.388-.646c-.039-.16-.054-.33-.063-.436l-.002-.012a8.261 8.261 0 00-.012-.128c-1.814-1.199-3.99-1.864-5.965-1.37zm7.789 2.723h-.002.002zM7.868 7.915l-1.17-.884-3.972 4.804a.25.25 0 00.036.354l.913.73a.25.25 0 00.354-.042l3.84-4.962zM6.433 5a4.169 4.169 0 00-1.352-.638c-.463-.123-.908-.167-1.47-.224a42.642 42.642 0 01-.68-.073.75.75 0 01-.378-1.333c3.21-2.54 7.208-1.427 9.914.432a1.142 1.142 0 01.428.681c.026.112.04.23.05.325a2.32 2.32 0 01.285-.028c.143-.004.46.003.734.227l.148.12c.45.368.773.633 1.31 1.082a.75.75 0 01.09 1.062l-2.757 3.24a.75.75 0 01-1.052.089l-.253-.21a23.8 23.8 0 01-1.146-.994 1.128 1.128 0 01-.34-.779c-.004-.066-.004-.141-.005-.192v-.03a2.37 2.37 0 00-.002-.089l-4.742 6.128a1.75 1.75 0 01-2.477.296l-.913-.73a1.75 1.75 0 01-.255-2.482l4.863-5.88zm6.153-.772a.127.127 0 01.002 0h-.002z" clip-rule="evenodd"/></svg>}
                aria-label="Toggle Sidebar"
              />           
              </NavItem>



          </SidebarSection>


          <SidebarSection>
            <NavItem  ><ThemeToggle/></NavItem>
          </SidebarSection> <SidebarSection>
       
          <NavItem
  icon={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 opacity-75"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#ffffff"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  }
  onClick={() => handleNavItemClick('https://accounts.unlimitpotential.com/settings')}
  style={{ position: 'absolute', bottom: 4, padding: '2px' }}
>

</NavItem>

       </SidebarSection>
        </Sidebar>
        <Sidebar
  breakpoints={{ sm: true, lg: false }}
  variant={isOpen ? 'default' : 'condensed'}
            transition="width"
            transitionDuration="normal"

            width={isOpen ? '240px' : '0'}
            minWidth="auto"
          >
            <SidebarSection direction={isOpen ? 'row' : 'column'}>
           
              

            </SidebarSection>

            <SidebarSection 
                style={{ maxWidth: '180px' }}
            
            flex="1" overflowY="auto" overflowX="hidden">
            
              <NavGroup
                

              >
                <Links/>
            </NavGroup>
  <NavGroup>  
    </NavGroup>
            <NavGroup  >
              
            </NavGroup>
  
           
           

          </SidebarSection>
            <SidebarOverlay zIndex="1" />
          </Sidebar>
      </HStack>}       >
      
      <style jsx>{`

        .bg-black {
          background-color: black;
        }
      `}</style>
    </AppShell></div>
 
  )
}
export default Dashboard;