import { Box, VStack, Text } from '@chakra-ui/react';
import { useChat } from '../context/ChatContext';

export default function ChatWindow() {
  const { messages } = useChat();
  return (
    <Box flex={1} overflowY="auto" p={4} minH={0}>
      <VStack align="stretch" spacing={3}>
        {messages.map((m) => (
          <Box 
            key={m.id} 
            display="flex"
            justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'}
            width="100%"
          >
            <Box
              bg={m.role === 'user' ? 'blue.500' : 'red.400'}
              color="white" 
              px={4} 
              py={2} 
              borderRadius="lg" 
              maxW="80%"
              boxShadow="md"
            >
              <Text whiteSpace="pre-wrap" fontSize="sm">
                {m.content}
              </Text>
              <Text fontSize="xs" opacity={0.7} mt={1}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}


