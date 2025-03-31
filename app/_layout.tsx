import { Stack } from "expo-router";
import { HeaderTitle } from "@/components/HeaderTitle";
import Entypo from '@expo/vector-icons/Entypo';
import { View, useWindowDimensions } from 'react-native';
import { SearchOverlay } from "@/components/SearchOverlay";
import { SoundProvider } from '@/contexts/SoundContext';
import { SearchProvider, useSearch } from '@/contexts/SearchContext';

function RootLayoutContent() {
  const title = "WIKIPEDYS";
  const { setIsSearchVisible } = useSearch();
  const { width } = useWindowDimensions();
  
  return (
    <View style={{ flex: 1, width: width > 600 ? 600 : '100%', alignSelf: 'center' }}>
      <Stack screenOptions={{
        title: title,
        headerTitle: () => <HeaderTitle title={title} />,
        headerStyle: {
          backgroundColor: '#eaecf0',
          height: 55
        },
        headerTitleStyle: {
          fontFamily: 'LinLibertine',
          fontSize: 30,
        },
        contentStyle: {
          backgroundColor: 'white'
        },
        headerRight: () => (
          <Entypo 
            name="magnifying-glass" 
            size={24} 
            color="#54595d" 
            style={{ marginRight: 15 }}
            onPress={() => setIsSearchVisible(true)}
          />
        )
      }} />
    </View>
  );
}

function SearchOverlayWrapper() {
  const { isSearchVisible } = useSearch();
  return isSearchVisible ? <SearchOverlay /> : null;
}

export default function RootLayout() {
  return (
    <SoundProvider>
      <SearchProvider>
        <RootLayoutContent />
        <SearchOverlayWrapper />
      </SearchProvider>
    </SoundProvider>
  );
}
