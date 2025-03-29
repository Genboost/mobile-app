import { Text, Pressable, View, StyleSheet } from "react-native";
import { NamedEntity as NamedEntityType } from "@/domain/Api";
import * as Speech from 'expo-speech';
import { useState, useEffect } from "react";

const SpeakableText = ({ text, children }: { text: string; children: React.ReactNode }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handlePress = () => {
		Speech.speak(text, {
			language: 'fr',
			pitch: 1,
			rate: 1,
		});
		setShowTooltip(true);
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (showTooltip) {
			timeout = setTimeout(() => {
				setShowTooltip(false);
			}, 5000);
		}
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [showTooltip]);

	return (
		<Pressable onPress={handlePress}>
			<View>
				{children}
				{showTooltip && (
					<View style={styles.tooltip}>
						<Text style={styles.tooltipText}>{text}</Text>
					</View>
				)}
			</View>
		</Pressable>
	);
};

export const NamedEntity = ({ namedEntity }: { namedEntity: NamedEntityType }) => {
	const regex = /\[(.*?)\]\((.*?)\)/g;
	const matches = [];
	let match;
	
	while ((match = regex.exec(namedEntity.text)) !== null) {
		matches.push({
			text: match[0],
			startIndex: match.index,
			endIndex: match.index + match[0].length,
			content: match[1],
			explanation: match[2]
		});
	}

	// Sort matches by startIndex to process them in order
	matches.sort((a, b) => a.startIndex - b.startIndex);

	// Build the text with speakable elements
	let lastIndex = 0;
	const elements = [];

	for (const match of matches) {
		// Add text before the match
		if (match.startIndex > lastIndex) {
			elements.push(
				<Text key={`text-${lastIndex}`}>
					{namedEntity.text.slice(lastIndex, match.startIndex)}
				</Text>
			);
		}

		// Add the matched text with speech
		elements.push(
			<SpeakableText key={`speak-${match.startIndex}`} text={match.explanation}>
				<Text style={styles.highlightedText}>{match.content}</Text>
			</SpeakableText>
		);

		lastIndex = match.endIndex;
	}

	// Add remaining text after last match
	if (lastIndex < namedEntity.text.length) {
		elements.push(
			<Text key={`text-${lastIndex}`}>
				{namedEntity.text.slice(lastIndex)}
			</Text>
		);
	}

	return <View style={styles.container}>{elements}</View>;
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	highlightedText: {
		backgroundColor: '#e6f3ff',
		paddingHorizontal: 4,
		borderRadius: 2,
	},
	tooltip: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		padding: 8,
		borderRadius: 4,
		zIndex: 1000,
		bottom: '100%',
		left: 0,
		marginBottom: 4,
		width: 200,
	},
	tooltipText: {
		color: 'white',
		fontSize: 14,
	},
});
