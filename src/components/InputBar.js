import { HStack, IconButton, Input } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useSpeechRecognition } from '../hooks/useSpeech';

export default function InputBar({ onSend }) {
  const [text, setText] = useState('');
  const { listening, transcript } = useSpeechRecognition();
  const { addUserMessage } = useChat();

  // Update text as transcript comes in
  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  // Auto-submit when recording stops and text exists
  useEffect(() => {
    if (!listening && text.trim()) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    addUserMessage(t);
    onSend(t);
    setText('');
  };

  return (
    <HStack p={4} borderTopWidth="1px" spacing={3} flexShrink={0}>
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
  );
}
