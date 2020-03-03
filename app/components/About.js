import React from "react";
import { Text, View, ScrollView, Linking, StyleSheet } from "react-native";
import Field from "./Field";

export default class About extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text style={styles.subtitle}>General Information</Text>
        <Text style={styles.aboutText}>
          Co-operative education at the University of Ottawa allows you to apply
          concepts learned in class during paid work terms. After about four
          years of study, you will have not only a diploma that indicates you
          participated in a CO-OP program but also approximately 16 months of
          experience in your field of study and a network of valuable contacts.
          All of these factors will contribute to helping you find a job more
          easily after graduation.
        </Text>
        <Text style={styles.subtitle}>Contact Information</Text>
        <Field
          field="Email"
          fieldValue={
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("mailto:coop@uottawa.ca")}
            >
              coop@uottawa.ca
            </Text>
          }
        />
        <Field
          field="Telephone"
          fieldValue={
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("tel:613-562‑5741")}
            >
              613-562‑5741
            </Text>
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  aboutText: {
    padding: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "justify"
  },
  subtitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#a9343a"
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 18
  }
});
