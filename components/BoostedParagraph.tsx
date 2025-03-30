import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { api } from "@/infrastructure/Api";

import BoostedRhese from "./BoostedRhese";

export default function BoostedParagraph({ children }: { children: React.ReactNode }) {
    const [boostedParagraph, setBoostedParagraph] = useState<Array<string>>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchBoostedParagraph = async () => {
            const boostedParagraph = await api.getBoostedParagraph(children?.toString() ?? "");
            setBoostedParagraph(boostedParagraph);
        }
        fetchBoostedParagraph();
    }, [children]);

    const handleRhesePress = (index: number) => {
        setHighlightedIndex(highlightedIndex === index ? null : index);
    };

    return (
        <View>
            {boostedParagraph.map((rhese, index) => (
                <BoostedRhese 
                    key={index} 
                    isHighlighted={highlightedIndex === index}
                    onPress={() => handleRhesePress(index)}
                >
                    {rhese}
                </BoostedRhese>
            ))}
        </View>
    )
}
