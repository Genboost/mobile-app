import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAssets } from 'expo-asset';
import { Image } from "expo-image";
import BoostedParagraph from '@/components/BoostedParagraph';
interface WikipediaArticle {
  title: string;
  content: Array<string>;
}

export default function BoostedArticle() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const [article, setArticle] = useState<WikipediaArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [assets] = useAssets([
    require('@/assets/images/icon_1.png'),
  ]);

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
          content: (articleData.extract as string)
            .split('\n')
            .filter((line: string) => line.trim() !== '')
            .slice(0, 3)
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
    <View style={styles.container}>
      <ScrollView style={styles.articleContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <View style={[styles.separator, {marginBottom: 16}]} />
        {article.content.map((paragraph, index) => (
          <WikiParagraph key={index}>{paragraph}</WikiParagraph>
        ))}
      </ScrollView>
    
      <View style={styles.bottomBar}>
        <Link href={`/article/${title}`} asChild>
            <Image source={assets?.[0]} style={styles.icon}/>
        </Link>
      </View>
    </View>
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
    <BoostedParagraph>{children}</BoostedParagraph>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  articleContainer: {
    padding: 16,
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
    fontSize: 22,
    lineHeight: 48,
    letterSpacing: 2,
    marginBottom: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    backgroundColor: '#eaecf0',
    padding: 2,
    height: 50,
  },
  icon: {
    width: 35,
    height: 35,
  },
}); 