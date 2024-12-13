import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>GATINHO.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 100,
    color: 'red'
  }
})
