import { Href, useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface CardProps {
  title: string;
  image?: string;
  url: Href;
}

export default function Card(props: CardProps) {
  const router = useRouter();

  const handleOpen = () => {
    router.push(props.url)
  }

  return (
    <Pressable onPressOut={handleOpen}>
      <ThemedView style={styles.container}>
        <ImageBackground 
          source={props.image ?? require('@/assets/images/icon.png')}
          style={styles.coverImage}
          imageStyle={{
            resizeMode: 'cover',
          }}
        />
        <ThemedView style={styles.content}>
          <ThemedText>
            {props.title}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexDirection: 'row',
    minHeight: 100,
  },
  content: {
    flex: 1,
  },
  coverImage: {
    width: 100, 
    height: '100%', 
  },
})