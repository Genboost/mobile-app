import { View, StyleSheet, ScrollView, Alert, Text, Pressable } from "react-native";
import { Paragraph } from "@/components/Paragraph";
import { WikipediaSearch } from "@/components/WikipediaSearch";
import { useState } from "react"; 
import { tools } from "@/domain/Tools";
import { DysText } from "@/components/DysText";
import { useFonts } from 'expo-font';
import { Button } from "@/components/Button";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";

interface WikipediaArticle {
  title: string;
  content: string;
}

export default function Index() {
  const [tool, setTool] = useState<tools>(tools.DEFAULT);
  const [selectedArticle, setSelectedArticle] = useState<WikipediaArticle | null>(null);
  const [loaded] = useFonts({
    'OpenDyslexic-Regular': require('../assets/fonts/OpenDyslexic-Regular.otf'),
    'OpenDyslexic-Bold': require('../assets/fonts/OpenDyslexic-Bold.otf'),
    'LinLibertine': require('../assets/fonts/LinLibertine_R.ttf'),
  });
  const [assets] = useAssets([
    require('../assets/images/icon_1.png'),
  ]);
  const [dysplay, setDysplay] = useState<boolean>(false);
  const splitIntoParagraphs = (text: string) => {
    return text.split('\n').filter(paragraph => paragraph.trim());
  };

  return (
    <View style={styles.container}>
      <WikipediaSearch onArticleSelect={(article) => {
        setSelectedArticle(null);
        setSelectedArticle(article);
      }} />
      {/*<View style={styles.buttonContainer}>
        <Button title="Named Entity" onPress={() => setTool(tools.NAMED_ENTITY)}  />
        <Button title="Default" onPress={() => setTool(tools.DEFAULT)} />
      </View>*/}
      <ScrollView style={styles.articleContainer}>
        {selectedArticle ? (
          <>
            <View style={{display: dysplay ? 'flex' : 'none'}}>
              <DysText style={styles.articleTitle}>{selectedArticle.title}</DysText>
              {splitIntoParagraphs(selectedArticle.content).map((paragraph, index) => (
                <View key={selectedArticle.title + index} style={styles.paragraphContainer}>
                  <Paragraph tool={tool}>{paragraph}</Paragraph>
                </View>
              ))}
            </View>
            <View style={{display: dysplay ? 'none' : 'flex'}}>
              <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
              {
                selectedArticle?.content.split('\n').map((paragraph, index) => (
                  <Text key={selectedArticle.title + index} style={styles.paragraphContainer}>{paragraph}</Text>
                ))
              }
            </View>
          </>
        ) : (
          dysplay ? (
            <DysText style={styles.noArticleText}>Aucun article sélectionné</DysText>
          ) : (
            <Text style={styles.noArticleText}>Aucun article sélectionné</Text>
          )
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => setDysplay(!dysplay)}
        >
          <Image  
            source={assets?.[0]}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  articleContainer: {
    flex: 1,
    padding: 16,
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
  button: {
    fontFamily: 'OpenDyslexic-Regular',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    backgroundColor: '#eaecf0',
  },
  icon: {
    width: 60,
    height: 60,
  },
});
