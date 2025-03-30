import { Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Speech from 'expo-speech';
import { useId, useState } from "react";
import useHighlighting from "@/hooks/useHighlighting";

export default function BoostedRhese({ 
    children, 
}: { 
    children: React.ReactNode, 
    isHighlighted?: boolean,
    onPress?: () => void 
}) {
    const id = useId();
    const { isHighlighted, pickMe } = useHighlighting(id);
    
    const textWithoutLinks = children?.toString().replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
    const handlePress = () => {
        Speech.speak(textWithoutLinks || '', {
            language: 'fr',
            pitch: 1,
            rate: 1,
        });
        pickMe();
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.paragraph, isHighlighted && styles.highlighted]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 22,
        lineHeight: 48,
        letterSpacing: 2,
        padding: 4,
    },
    highlighted: {
        backgroundColor: 'rgba(255, 182, 193, 0.3)', // Soft pink with transparency
        borderRadius: 4,
    }
})