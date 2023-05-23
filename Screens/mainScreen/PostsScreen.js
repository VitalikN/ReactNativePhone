import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const mapNavigate = () => {
    navigation.navigate("MapScreen");
  };
  const commentsNavigate = () => {
    navigation.navigate("CommentsScreen");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image source={{ uri: item.photo }} style={styles.takePhoto} />
            <View style={styles.containerIcon}>
              <FontAwesome
                name="comment-o"
                size={24}
                color="black"
                onPress={commentsNavigate}
              />
              <EvilIcons
                name="location"
                size={24}
                color="black"
                onPress={mapNavigate}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default PostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  takePhoto: {
    // borderWidth: 1,
    // borderColor: "#fff",
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  containerIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
