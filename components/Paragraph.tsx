import { api } from "@/infrastructure/Api";
import { useEffect, useState } from "react";
import { StyleSheet, View, StyleProp, ActivityIndicator } from "react-native";
import { Rhese } from "./Rhese";
import { tools } from "@/domain/Tools";
import { NamedEntity } from "./NamedEntity";
import { NamedEntity as NamedEntityType } from "@/domain/Api";

export const Paragraph = ({ children, tool }: { children: React.ReactNode, tool: tools }) => {
    const [rhese, setRhese] = useState<Array<string>>([]);
    const [namedEntities, setNamedEntities] = useState<Array<NamedEntityType>>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        setIsLoading(true);
        if (tool === tools.NAMED_ENTITY) {
            api.getNamedEntity((children || '').toString())
                .then(setNamedEntities)
                .finally(() => setIsLoading(false));
        } else {
            api.getRhese((children || '').toString())
                .then(setRhese)
                .finally(() => setIsLoading(false));
        }
    }, [tool]);
    
    if (isLoading) {
        return (
            <View style={[styles.paragraph, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return <View style={[styles.paragraph]}>
        {tool === tools.NAMED_ENTITY ? (
            namedEntities.map((namedEntity) => (
                <NamedEntity key={namedEntity.text} namedEntity={namedEntity} />
            ))
        ): rhese.map((rhese, index) => (
            <Rhese key={rhese} rhese={rhese} color={index % 2} />
        ))}
    </View>;
};

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 100,
    },
});


