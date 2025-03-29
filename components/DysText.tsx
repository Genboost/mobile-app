import { Text, TextStyle, StyleProp } from "react-native";

export const DysText = ({ children, style, numberOfLines }: { children?: React.ReactNode, style?: StyleProp<TextStyle>, numberOfLines?: number }) => {
	return <Text style={[{ fontFamily: 'OpenDyslexic-Regular' }, style]} numberOfLines={numberOfLines}>{children}</Text>;
};

