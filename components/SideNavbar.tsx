"use client";

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import {
  AppShell,
  Sidebar,
  SidebarSection,
  NavItem,
  PersonaAvatar,
  SidebarToggleButton,
} from "@saas-ui/react";

import {
  FiBarChart,
  FiHome,
  FiMoon,
  FiSettings,
  FiSun,
  FiUsers,
} from "react-icons/fi";

import Image from "next/image";


export function SidebarLayout() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (

    <> <div 
    style={{ maxWidth: '250px' }}

    ><Sidebar
      variant="condensed"
      borderWidth="0"
      height="$100vh"
      spacing="3"
      style={{
        background: 'linear-gradient(to bottom, #4A2673, #331E53) 80%', // Adjust the color codes and percentage as needed
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add a background shadow
        borderRadius: '8px', // Add border-radius for rounded corners
        padding: '2px', // Add padding for content spacing
        position: 'relative', // Ensure positioning for glow effect
        overflow: 'hidden', // Ensure overflow behavior for glow effect
      }}
    >            <SidebarToggleButton />
      <SidebarSection direction="row">
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<PersonaAvatar presence="online" size="xs" name="John Doe" />}
            variant="ghost" />
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem icon={<FiHome size="1.2em" />}>Home</NavItem>
        <NavItem icon={<FiUsers size="1.2em" />} isActive={true}>
          Users
        </NavItem>
        <NavItem icon={<FiBarChart size="1.2em" />}>Analytics</NavItem>
        <NavItem icon={<FiSettings size="1.2em" />}>Settings</NavItem>
      </SidebarSection>
      <SidebarSection alignItems="flex-start">
        <IconButton
          icon={colorMode === "dark" ? <FiMoon /> : <FiSun />}
          aria-label="Toggle color mode"
          onClick={toggleColorMode} />
      </SidebarSection>
    </Sidebar></div></>
  );
}