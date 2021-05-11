import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Icon } from "react-native-elements";

interface IObj {
  obj: (string | number)[];
  verdict: boolean;
}

export const Card: React.FC<IObj> = ({ obj, verdict }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://codeforces.com/problemset/problem/" + obj[2] + "/" + obj[3]
          )
        }
      >
        <View
          style={[styles.cardWrapper, verdict ? styles.done : styles.notDone]}
        >
          <Text style={styles.cardText}>{obj[1]}</Text>
          <View style={styles.icon}>
            {verdict && (
              <Icon name="checkmark-outline" type="ionicon" size={30} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
  },
  cardText: {
    width: "80%",
    paddingHorizontal: 20,
    fontSize: 22,
  },
  icon: {
    flex: 1,
  },
  notDone: {
    backgroundColor: "white",
  },
  done: {
    backgroundColor: "#16db65",
  },
});
