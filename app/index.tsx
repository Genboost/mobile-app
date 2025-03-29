import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import { Paragraph } from "@/components/Paragraph";
import { WikipediaSearch } from "@/components/WikipediaSearch";
import { useState } from "react"; 
import { tools } from "@/domain/Tools";

interface WikipediaArticle {
  title: string;
  content: string;
}

export default function Index() {
  const [tool, setTool] = useState<tools>(tools.DEFAULT);
  const [selectedArticle, setSelectedArticle] = useState<WikipediaArticle | null>(null);

  const splitIntoParagraphs = (text: string) => {
    return text.split('\n').filter(paragraph => paragraph.trim());
  };

  return (
    <View style={styles.container}>
      <WikipediaSearch onArticleSelect={setSelectedArticle} />
      <View style={styles.buttonContainer}>
        <Button title="Named Entity" onPress={() => setTool(tools.NAMED_ENTITY)} />
        <Button title="Default" onPress={() => setTool(tools.DEFAULT)} />
      </View>
      <ScrollView style={styles.articleContainer}>
        {selectedArticle ? (
          <>
            <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
            {splitIntoParagraphs(selectedArticle.content).map((paragraph, index) => (
              <View key={index} style={styles.paragraphContainer}>
                <Paragraph tool={tool}>{paragraph}</Paragraph>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.noArticleText}>Aucun article sélectionné</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  articleContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraphContainer: {
    marginBottom: 16,
  },
  noArticleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
