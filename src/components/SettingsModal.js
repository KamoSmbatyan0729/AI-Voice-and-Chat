import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Switch,
  Select,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  HStack,
  useColorModeValue,
  Box
} from '@chakra-ui/react';
import { useSettings } from '../context/SettingsContext';

export default function SettingsModal({ isOpen, onClose }) {
  const { voiceEnabled, micEnabled, speechRate, language, voiceType, setSettings } = useSettings();

  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <Box>
              <FormLabel htmlFor="voiceEnabled" mb="0">
                Voice Output
              </FormLabel>
              <FormHelperText mt={0} color={secondaryTextColor}>
                Enable text-to-speech for AI responses
              </FormHelperText>
            </Box>
            <Switch
              id="voiceEnabled"
              isChecked={voiceEnabled}
              onChange={(e) => setSettings({ voiceEnabled: e.target.checked })}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <Box>
              <FormLabel htmlFor="micEnabled" mb="0">
                Voice Input
              </FormLabel>
              <FormHelperText mt={0} color={secondaryTextColor}>
                Enable speech-to-text functionality
              </FormHelperText>
            </Box>
            <Switch
              id="micEnabled"
              isChecked={micEnabled}
              onChange={(e) => setSettings({ micEnabled: e.target.checked })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Language</FormLabel>
            <Select
              value={language}
              onChange={(e) => setSettings({ language: e.target.value })}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish (ES)</option>
              <option value="fr-FR">French (FR)</option>
              <option value="de-DE">German (DE)</option>
              <option value="hi-IN">Hindi (IN)</option>
              <option value="ja-JP">Japanese (JP)</option>
              <option value="zh-CN">Chinese (CN)</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Voice Type</FormLabel>
            <Select
              value={voiceType}
              onChange={(e) => setSettings({ voiceType: e.target.value })}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Speech Rate: {speechRate.toFixed(2)}</FormLabel>
            <HStack>
              <Slider
                min={0.5}
                max={2}
                step={0.05}
                value={speechRate}
                onChange={(v) => setSettings({ speechRate: v })}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </HStack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


