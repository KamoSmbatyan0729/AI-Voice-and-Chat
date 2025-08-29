import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useChat } from '../context/ChatContext';

export default function ChatWindow() {
  const { messages } = useChat();
  
  // Color values for different modes
  const userBg = useColorModeValue('blue.600', 'blue.500');
  const aiBg = useColorModeValue('gray.200', 'gray.700');
  const userText = 'white';
  const aiText = useColorModeValue('gray.900', 'gray.100');
  const userTimestampColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.700');
  const aiTimestampColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box flex={1} overflowY="auto" p={4} minH={0}>
      <VStack align="stretch" spacing={3}>
        {messages.map((m) => (
          <Box 
            key={m.id} 
            display="flex"
            justifyContent={m.role === 'user' ? 'flex-start' : 'flex-end'}
            width="100%"
          >
            <Box
              bg={m.role === 'user' ? userBg : aiBg}
              color={m.role === 'user' ? userText : aiText}
              px={4} 
              py={2} 
              borderRadius="lg"
              // User messages: rounded except bottom-right
              borderBottomRightRadius={m.role === 'user' ? '0' : 'lg'}
              // AI messages: rounded except bottom-left
              borderBottomLeftRadius={m.role === 'user' ? 'lg' : '0'}
              maxW="80%"
              boxShadow="md"
            >
              <Text whiteSpace="pre-wrap" fontSize="sm">
                {m.content}
              </Text>
              <Text 
                fontSize="xs" 
                opacity={0.7} 
                mt={1}
                color={m.role === 'user' ? userTimestampColor : aiTimestampColor}
              >
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}