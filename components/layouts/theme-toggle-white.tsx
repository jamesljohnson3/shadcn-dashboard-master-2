import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleThemeAndColorMode = () => {
    // Toggle between light and dark modes
    toggleColorMode();

    // Toggle between light and dark themes
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid rehydration errors

  return (
<IconButton
  variant="ghost"
  aria-label="theme toggle"
  icon={
    colorMode === 'light' ? (
      <FiMoon size="14" style={{ color: 'white' }} />
    ) : (
      <FiSun size="14" style={{ color: 'white' }} />
    )
  }
  borderRadius="md"
  onClick={toggleThemeAndColorMode}
/>
  );
};

export default ThemeToggle;
