import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { HeaderTitle } from "@/components/HeaderTitle";
import BottomBar from '@/components/BottomBar';
import Entypo from '@expo/vector-icons/Entypo';
import { useSearch } from '@/contexts/SearchContext';

export default function Index() {
  const { setIsSearchVisible } = useSearch();
  
  useFonts({
    'LinLibertine': require('../assets/fonts/LinLibertine_R.ttf'),
    'linLibertineBold': require('../assets/fonts/LinLibertine_RB.ttf'),
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <HeaderTitle title="WIKIPEDYS" />
          <Text style={styles.subtitle}>L'encyclopédie libre adaptée pour la dyslexie</Text>
          <View style={styles.awardBadge}>
            <Text style={styles.awardText}>Projet lauréat du Hackathon SHIFT IA Gen Nantes 2025</Text>
          </View>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Né lors d'un Hackathon</Text>
          <Text style={styles.contentText}>
            WikipedyS a été créé en seulement 48 heures lors du Hackathon SHIFT IA Gen de Nantes, où notre équipe a remporté la première place. 
            Le défi ? Développer une solution utilisant l'intelligence artificielle pour aider les collégiens atteints de dyslexie à accéder plus facilement au savoir.
          </Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>À propos de WikipedyS</Text>
          <Text style={styles.contentText}>
            WikipedyS est une version adaptée de Wikipédia, spécialement conçue pour les personnes atteintes de dyslexie.
          </Text>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Comment ça marche ?</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Une interface simplifiée avec un texte découpé en fonction du sens, pour alléger l'effort de lecture des personnes Dys</Text>
            <Text style={styles.featureItem}>• Une vocalisation complète du contenu : chaque section peut être écoutée pour soulager la charge cognitive liée au déchiffrage</Text>
            <Text style={styles.featureItem}>• Une détection intelligente par IA des "zones sombres" - ces passages difficiles à décoder ou à comprendre :</Text>
            <View style={styles.subFeaturesList}>
              <Text style={styles.subFeatureItem}>• Vocabulaire complexe ou technique</Text>
              <Text style={styles.subFeatureItem}>• Sens non explicite (comme les pronoms ambigus)</Text>
              <Text style={styles.subFeatureItem}>• Mots contenant des morphèmes importants pour la compréhension</Text>
            </View>
            <Text style={styles.featureItem}>• Des info-bulles explicatives qui apparaissent sur ces zones sombres, rendant le contenu de Wikipédia véritablement accessible à tous</Text>
          </View>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Notre équipe</Text>
          <View style={styles.teamList}>
            <Text style={styles.teamMember}>Marion Berthaut - Product Owner</Text>
            <Text style={styles.teamMember}>Antoine Mairesse - Backend</Text>
            <Text style={styles.teamMember}>Josselin Tillay - Frontend</Text>
            <Text style={styles.teamMember}>Gaëtan Faure - Backend</Text>
            <Text style={styles.teamMember}>Aurélie Auzas - Prompt Engineer</Text>
            <Text style={styles.teamMember}>Heejung Kim - Mockup Designer</Text>
          </View>
        </View>
      </ScrollView>
    
      <BottomBar
        left={<View />}
        center={
          <Pressable onPress={() => setIsSearchVisible(true)}>
            <Entypo name="magnifying-glass" size={24} color="#54595d" />
          </Pressable>
        }
        right={<View />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    fontFamily: 'LinLibertine',
    alignItems: "baseline",
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    marginBottom: 8,
  },
  awardBadge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  awardText: {
    color: '#333',
    fontWeight: 'bold',
  },
  contentBox: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  featuresList: {
    marginLeft: 16,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  subFeaturesList: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  subFeatureItem: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  teamList: {
    marginLeft: 16,
  },
  teamMember: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
