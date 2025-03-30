import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { api } from "@/infrastructure/Api";

import BoostedRhese from "./BoostedRhese";

export default function BoostedParagraph({ 
  children, 
}: { 
  children: React.ReactNode;
}) {
    const [boostedParagraph, setBoostedParagraph] = useState<Array<string>>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBoostedParagraph = async () => {
            setIsLoading(true);
            try {
                const boostedParagraph = await api.getBoostedParagraph(children?.toString() ?? "");
                setBoostedParagraph(boostedParagraph);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBoostedParagraph();
    }, [children]);

    const handleRhesePress = (index: number) => {
        setHighlightedIndex(highlightedIndex === index ? null : index);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    }

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

const styles = StyleSheet.create({
    loadingContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
