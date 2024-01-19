'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { useColorMode } from '@chakra-ui/color-mode'; // Assuming you are using Chakra UI
import Link from 'next/link';

const pages = [
  { title: 'Overview', path: '/dashboard' },
  { title: 'Sites', path: '/sites' },
  { title: 'Posts', path: '/dashboard/posts' },
  { title: 'Trends', path: '/dashboard/sdks' },
  { title: 'Campaigns', path: '/dashboard/campaigns' },
  { title: 'Feeds', path: '/dashboard/inventory' },
  { title: 'Links', path: '/dashboard/links' },
  { title: 'Reels', path: '/dashboard/Videos' },
  { title: 'Analytics', path: '/dashboard/marketing' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { colorMode } = useColorMode();

  return (
    <div className={`${styles.container} ${colorMode === 'dark' ? styles.darkMode : ''}`}>
      <Link href='/'>
        <div className={styles.logoContainer}></div>
      </Link>
      <nav className={styles.navigation}>
        {pages.map(({ title, path }) => (
          <Link href={path} key={path} tabIndex={-1}>
            <motion.button
              className={styles.navigationItem}
              initial={false}
              animate={{
                color: pathname === path ? 'var(--grey-00)' : 'var(--grey-90)',
              }}
            >
              {pathname === path && (
                <motion.div
                  className={styles.indicator}
                  layoutId='indicator'
                  style={{ borderRadius: 32 }}
                />
              )}
              {title}
            </motion.button>
          </Link>
        ))}
      </nav>
      
    </div>
  );
}
