import { Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { FaCog, FaMoon, FaSun, FaHistory } from 'react-icons/fa';

export function Header({ onOpenSettings, onClearHistory }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex as="header" p={4} align="center" borderBottomWidth="1px" flexShrink={0}>
      <Heading size="md">AI Voice & Chat</Heading>
      <Spacer />
      <IconButton
        icon={<FaHistory />}
        aria-label="Clear history"
        onClick={onClearHistory}
        variant="ghost"
        mr={2}
      />
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost"
        mr={2}
      />
      <IconButton
        aria-label="Settings"
        icon={<FaCog />}
        onClick={onOpenSettings}
        variant="ghost"
      />
    </Flex>
  );
}

export default Header;



