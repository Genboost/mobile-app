import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

interface WikipediaArticle {
  title: string;
  content: Array<string>;
}

export default function Article() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const [article, setArticle] = useState<WikipediaArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${encodeURIComponent(title)}&format=json&origin=*&formatversion=2&explaintext=1`
        );
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const articleData = pages[pageId];
        
        setArticle({
          title: articleData.title,
          content: (articleData.extract as string).split('\n').filter((line: string) => line.trim() !== '')
        });
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Article non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <View style={[styles.separator, {marginBottom: 16}]} />
      {article.content.map((paragraph, index) => (
        <WikiParagraph key={index}>{paragraph}</WikiParagraph>
      ))}
    </ScrollView>
  );
}

function WikiParagraph({children}: {children: React.ReactNode}) {
  if (children?.toString().match(/^={2} /)) {
    const clearTitle = children?.toString().replace(/=*/gi, '');
    return (<>
      <Text style={styles.title2}>
        {clearTitle}
      </Text>
      <View style={styles.separator} />
    </>
    )
  }
  if (children?.toString().match(/^===/)) {
    const clearTitle = children?.toString().replace(/=*/gi, '');
    return (
      <Text style={styles.title3}>
        {clearTitle}
      </Text>
    )
  }
  return (
    <Text style={styles.paragraph}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontFamily: 'LinLibertine',
    paddingTop: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 16,
  },
  title2: {
    fontSize: 28,
    fontFamily: 'LinLibertine',
  },
  title3: {
    fontSize: 21,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
}); 