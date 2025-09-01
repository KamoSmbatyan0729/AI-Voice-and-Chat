import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import InputBar from './components/InputBar'
import SettingsModal from './components/SettingsModal'
import { SettingsProvider } from './context/SettingsContext'
import { ChatProvider, useChat } from './context/ChatContext'
import { useSpeechSynthesisContext, SpeechSynthesisProvider } from './context/SpeechSynthesisContext';
import { createChatCompletion } from './lib/openai'


function InnerApp() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { addAssistantMessage, clearHistory, messages } = useChat();
  const { speak } = useSpeechSynthesisContext();

  const sendToAI = async (text) => {
    try {
      const content = await createChatCompletion([
        { role: 'system', content: 'You are a helpful AI assistant.' },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: text },
      ]);
      addAssistantMessage(content);
      speak(content);
    } catch (error) {
      const msg = error?.message || 'Failed to get response';
      addAssistantMessage(`Error: ${msg}`);
    }
  };

  return (
    <VStack h="100vh" w="100vw" spacing={0} align="stretch" position="fixed" top={0} left={0}>
      <Header onOpenSettings={() => setIsSettingsOpen(true)} onClearHistory={() => clearHistory()} />
      <ChatWindow />
      <InputBar onSend={sendToAI} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </VStack>
  )
}

export default function App() {
  return (
    <SpeechSynthesisProvider>
      <SettingsProvider>
        <ChatProvider>
          <InnerApp />
        </ChatProvider>
      </SettingsProvider>
    </SpeechSynthesisProvider>
  );
}
