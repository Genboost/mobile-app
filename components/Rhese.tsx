import { Text, StyleSheet } from "react-native";

export const Rhese = ({ rhese, color }: { rhese: string, color: number }) => {
  const backgroundColor = color === 0 ? styles.color1 : styles.color2;
  return <Text style={[backgroundColor]}>{rhese} </Text>;
};

const styles = StyleSheet.create({
  color1: {
    backgroundColor: '#f0f0f0',
  },
  color2: {
    backgroundColor: '#e0e0e0',
  },
});

