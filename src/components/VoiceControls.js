import React from 'react';
import {
    Box,
    Button,
    VStack,
    HStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

import { FaMicrophone, FaStop } from 'react-icons/fa';

const VoiceControls = ({ isListening, onToggleListening }
) => {
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.500', 'gray.400');

    return (
        <div>
            <Box
                borderTopWidth="1px"
                borderColor={borderColor}
                bg={bgColor}
                p={4}
            >
                <VStack spacing={3}>
                    {/* Main controls */}
                    <HStack spacing={4} justify="center">
                        {/* Microphone button */}
                        <Button
                            onClick={onToggleListening}
                            borderRadius="full"
                            p={4}
                            colorScheme={isListening ? 'red' : 'gray'}
                            variant={isListening ? 'solid' : 'outline'}
                            position="relative"
                            title={isListening ? 'Stop listening' : 'Start listening'}
                            opacity={0.5}
                            cursor="not-allowed"
                        >
                            {isListening ? <FaStop /> : <FaMicrophone />}

                            {/* Recording indicator */}
                        </Button>
                    </HStack>
                    <HStack spacing={4} fontSize="sm" color={textColor}>
                        {isListening && (
                            <HStack spacing={1}>
                                <Box w={2} h={2} bg="red.500" borderRadius="full" animation="pulse 1.5s infinite" />
                                <Text>Listening...</Text>
                            </HStack>
                        )}
                    </HStack>
                    <HStack spacing={4} fontSize="xs" color={textColor}>
                        <HStack spacing={1}>
                            <FaMicrophone />
                            <Text>Voice Input: Off</Text>
                        </HStack>
                    </HStack>
                </VStack>
                {/* CSS for pulse animation */}
                <style jsx>{`
                    @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                    }
                `}
                </style>
            </Box>
        </div >
    );
}

export default VoiceControls