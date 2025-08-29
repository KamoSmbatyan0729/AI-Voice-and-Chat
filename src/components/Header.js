import { Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { FaCog, FaMoon, FaSun } from 'react-icons/fa';

export function Header({ onOpenSettings }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex as="header" p={4} align="center" borderBottomWidth="1px" flexShrink={0}>
      <Heading size="md">AI Voice & Chat</Heading>
      <Spacer />
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



