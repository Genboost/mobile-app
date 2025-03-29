import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    title: "Genboost",
    headerStyle: {
      backgroundColor: '#eaecf0'
    },
    headerTitleStyle: {
      fontFamily: 'LinLibertine',
      fontSize: 30,
    },
    contentStyle: {
      backgroundColor: 'white'
    }
  }} />;
}
