"use client"
import React, { useRef, Fragment, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Transition, Menu } from '@headlessui/react'
  import { IconButton  } from "@chakra-ui/react";
  import {
    Button,
  } from '@chakra-ui/react'
  import { FiHelpCircle, FiMessageSquare } from 'react-icons/fi'; // Import the icons for light and dark mode

  import { useColorModeValue } from "@chakra-ui/react";

  import { KnockFeedProvider, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react-notification-feed";
  import "@knocklabs/react-notification-feed/dist/index.css";

  import {  ButtonGroup, MenuItem, useModals } from '@saas-ui/react'



  const userNavigation = [
    { name: 'Upload ', href: 'https://accounts.unlimitpotential.com/upload' },
    { name: 'Connect ', href: '/user' },
    { name: 'Distribute ', href: 'https://spaces.unlimitpotential.com/upload' },


  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
 
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(0)
  const notifButtonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);




  const iconColor = useColorModeValue( "text-black", "text-white");

  const unixTimestamp = Math.floor(Date.now() / 1000);
  console.log(unixTimestamp);
  

  // Extract the project field from the URL
  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get('role');
  const project = urlParams.get('projects');
  const campaign = urlParams.get('campaign');
  const projectRegex = /projects\?=([^&]+)/;
  const match = currentUrl.match(projectRegex);

  // Use the extracted project field as a parameter for the API call



  const tabItems = [
    { label: "Home", href: `/?blueprints&role=${role && role ? role : ""}&projects=${project !== undefined ? project : ""}&campaign=${campaign !== undefined ? campaign : "pending"}` },
    { label: "Build", href: `/creator-mode?blueprints&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },
    { label: "Console", href: `https://console.unlimitpotential.com/start` },
    { label: "Manage", href: `/dashboard?blueprints&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },
    { label: "Distribute", href: `https://space.unlimitpotential.com/templates/${role && role ? role : null}?blueprint&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : unixTimestamp}` },
    { label: "Connect", href: `https://command.unlimitpotential.com` },
    { label: "Upload", href: `/upload?blueprints&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },

  ];
  




  const [state, setState] = useState(false)

  // Replace javascript:void(0) paths with your paths

  const submenuNav = [
    { title: "Home", path: `/#role?=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },
    { title: "Build", path: `/creator-mode?blueprints&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },
    { title: "Console", path: `https://console.unlimitpotential.com/start` },
    { title: "Manage", path: `/dashboard?blueprints&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },
    { title: "Distribute", path: `https://space.unlimitpotential.com/templates/${role && role ? role : null}?blueprint&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : unixTimestamp}` },
    { title: "Connect", path: `https://command.unlimitpotential.com` },
    { title: "Upload", path: `/upload?blueprints&role=${role && role ? role : null}&projects=${project !== undefined ? project : null}&campaign=${campaign !== undefined ? campaign : "pending"}` },
  ]


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };
  


  return (
 <>    <div className="flex">
 <div className="mr-4">
  
 </div>
 <div>
   <Button
     leftIcon={
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
       </svg>
     }
     data-tour="add-users2"
   >
     Add user
   </Button>
 </div>
 <div className="ml-4">
 
 </div>
</div></>


  );
};

export default (App);