import { StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Menu from "../components/Menu";

import { styles } from "../styles";

export default function Home({ navigation }) {
  return (
    <ScrollView
      style={styles.containerScroll}
      contentContainerStyle={styles.contentContainer}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 0, bottom: 0 }}
    >
      <Header style={styles} navigation={navigation} allowProfile={true} />
      <Hero style={styles} />
      <Menu style={styles} />
    </ScrollView>
  );
}
