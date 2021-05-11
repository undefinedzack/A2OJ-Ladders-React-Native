import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { Card } from "./components/Card";

// Data
import { ladders } from "./shared/Data";

export default function App() {
  const [username, setUsername] = useState<string>("undefinedzack");
  const [details, setDetails] = useState([
    {
      id: 77888833,
      contestId: 1340,
      creationTimeSeconds: 1587713653,
      relativeTimeSeconds: 2147483647,
      problem: {
        contestId: 1340,
        index: "C",
        name: "Nastya and Unexpected Guest",
        type: "PROGRAMMING",
        points: 1250.0,
        rating: 2400,
        tags: ["dfs and similar", "dp", "graphs", "shortest paths"],
      },
      author: {
        contestId: 1340,
        members: [{ handle: "Fefer_Ivan" }],
        participantType: "PRACTICE",
        ghost: false,
        startTimeSeconds: 1587653100,
      },
      programmingLanguage: "GNU C++17",
      verdict: "TIME_LIMIT_EXCEEDED",
      testset: "TESTS",
      passedTestCount: 76,
      timeConsumedMillis: 1000,
      memoryConsumedBytes: 40652800,
    },
  ]);
  const [division, setDivision] = useState(ladders.div_a);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = "https://codeforces.com/api/user.status?handle=" + username;
      await axios.get(url).then((res) => setDetails(res.data.result));
    };
    fetchDetails();
  }, [username]);
  const dict = [
    ladders.div_a,
    ladders.div_b,
    ladders.div_c,
    ladders.div_d,
    ladders.div_e,
  ];
  return (
    <>
      {details && (
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>A2OJ Ladders</Text>
          </View>
          <View style={styles.usernameWrapper}>
            <TextInput
              style={styles.username}
              value={username}
              placeholder="username"
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <ButtonGroup
            buttons={["Div A", "Div B", "Div C", "Div D", "Div E"]}
            onPress={(index) => {
              setDivision(dict[index]);
            }}
            containerStyle={styles.buttonGroup}
            selectedTextStyle={styles.selectedTextStyle}
          />
          <View style={styles.cardList}>
            <ScrollView>
              {division.map((prob, index) => {
                const res = details.map((item) => {
                  if (
                    item.problem.contestId.toString() === prob[2] &&
                    item.problem.index.toString() === prob[3] &&
                    item.verdict === "OK"
                  ) {
                    return <Card obj={prob} verdict={true} />;
                  }
                });

                const filtered = res.filter((el) => el === undefined);

                if (filtered.length === details.length)
                  return <Card obj={prob} key={index} verdict={false} />;
                return <Card obj={prob} key={index} verdict={true} />;
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  usernameWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  username: {
    backgroundColor: "pink",
    borderRadius: 15,
    height: 60,
    width: "80%",
    paddingHorizontal: 10,
    fontSize: 28,
    textAlign: "center",
  },
  cardList: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 10,
  },
  buttonGroup: {
    marginTop: 30,
    marginHorizontal: 40,
  },
  selectedTextStyle: {
    fontWeight: "bold",
  },
});
