import { HStack, VStack, IconButton, Input, Box, Text } from '@chakra-ui/react';
import { FaMicrophone, FaStop, FaPaperPlane, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useSpeechRecognition } from '../hooks/useSpeech';
import { useSpeechSynthesisContext } from '../context/SpeechSynthesisContext';
import { useSettings } from '../context/SettingsContext';

export default function InputBar({ onSend }) {
  const [text, setText] = useState('');
  const { isListening, transcript, start, stop } = useSpeechRecognition();
  const { addUserMessage } = useChat();
  const { stopSpeaking, isSpeaking } = useSpeechSynthesisContext();
  const { micEnabled } = useSettings();

  // Update text as transcript comes in
  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  // Auto-submit when recording stops and text exists
  useEffect(() => {
    if (!isListening && text.trim()) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    addUserMessage(t);
    onSend(t);
    setText('');
  };
  return (
    <Box
      borderTopWidth="1px"
      p={4}
    >
      <HStack p={4} spacing={3} flexShrink={0}>
        <Input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          flex={1}
        />
        <IconButton
          aria-label="Send message"
          icon={<FaPaperPlane />}
          onClick={submit}
          colorScheme="blue"
        />
      </HStack>
      <VStack spacing={3} mb={2} align="center">
        <HStack spacing={8} justify="center">
          <IconButton
            aria-label={isListening ? 'Stop recording' : 'Start recording'}
            icon={isListening ? <FaStop /> : <FaMicrophone />}
            onClick={() => (isListening ? stop() : start())}
            colorScheme={isListening ? 'red' : 'gray'}
            isDisabled={!micEnabled}
          />

          <IconButton
            aria-label={isSpeaking ? 'Stop speaking' : 'Start speaking'}
            icon={
              isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />
            }
            onClick={stopSpeaking}
            isDisabled={!isSpeaking}
          />

        </HStack>
        <HStack spacing={4} fontSize="sm">
          {isListening && (
            <HStack spacing={1}>
              <Box w={2} h={2} bg="red.500" borderRadius="full" animation="pulse 1.5s infinite" />
              <Text>Listening...</Text>
            </HStack>
          )}

          {isSpeaking && (
            <HStack spacing={1}>
              <Box w={2} h={2} bg="blue.500" borderRadius="full" animation="pulse 1.5s infinite" />
              <Text>Speaking...</Text>
            </HStack>
          )}

          {!isListening && !isSpeaking && (
            <Text>Ready for voice input</Text>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}