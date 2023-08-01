import { StyleSheet, Text, View, ScrollView } from "react-native";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Info from "../components/Info";

import { styles } from "../styles";

export default function Onboarding({ navigation }) {
  return (
    <ScrollView
      style={styles.containerScroll}
      contentContainerStyle={styles.contentContainer}
    >
      <Header style={styles} allowProfile={false} />
      <Hero style={styles} />
      <Info navigation={navigation} />
    </ScrollView>
  );
}
