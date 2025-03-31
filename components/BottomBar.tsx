import { View, StyleSheet } from 'react-native';

interface BottomBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function BottomBar({ left, center, right }: BottomBarProps) {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.leftSpace}>
        {left}
      </View>
      <View style={styles.centerSpace}>
        {center}
      </View>
      <View style={styles.rightSpace}>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    backgroundColor: '#eaecf0',
    padding: 2,
    height: 50,
    paddingHorizontal: 16,
  },
  leftSpace: {
    flex: 1,
  },
  centerSpace: {
    flex: 1,
    alignItems: 'center',
  },
  rightSpace: {
    flex: 1,
    alignItems: 'flex-end',
  },
}); 