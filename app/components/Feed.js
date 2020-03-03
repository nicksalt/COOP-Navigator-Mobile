import React from "react";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Swipeable from "react-native-swipeable";

export default class Feed extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.notifications}
        renderItem={({ item }) => <FeedItem notification={item} />}
        keyExtractor={(item, key) => key.toString()}
      />
    );
  }
}

class FeedItem extends React.Component {
  render() {
    return (
      <View style={styles.parentView}>
        <Swipeable
          rightButtons={[
            <TouchableOpacity>
              <View
                style={[
                  styles.rightSwipeButtons,
                  { backgroundColor: "#d3d3d3" }
                ]}
              >
                <MaterialIcon name={"pin"} style={styles.rightSwipeIcons} />
                <Text style={styles.rightSwipeText}>Pin</Text>
              </View>
            </TouchableOpacity>,
            <TouchableOpacity>
              <View
                style={[
                  styles.rightSwipeButtons,
                  { backgroundColor: "#a9343a" }
                ]}
              >
                <MaterialIcon
                  name={"check-all"}
                  style={styles.rightSwipeIcons}
                />
                <Text style={styles.rightSwipeText}>Clear</Text>
              </View>
            </TouchableOpacity>
          ]}
        >
          <View style={styles.tile}>
            <View style={styles.tileHeader}>
              <Text style={styles.title}>
                <Icon name={this.props.notification.icon} style={styles.icon} />
                {"  " + this.props.notification.title}
              </Text>
              <Text style={styles.date}>{this.props.notification.date}</Text>
            </View>
            <Text style={styles.description}>
              {this.props.notification.description}
            </Text>
            <View style={styles.tileFooter}>
              <Text style={styles.footerText}>
                {this.props.notification.footerText}
              </Text>
            </View>
          </View>
        </Swipeable>
      </View>
    );
  }
}

Feed.propTypes = {
  notifications: PropTypes.array
};

FeedItem.propTypes = {
  notification: PropTypes.object
};

const styles = StyleSheet.create({
  /* 
    TILE STYLING PROPERTIES
  */
  parentView: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10
  },
  tile: {
    width: "95%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  icon: {
    fontSize: 18,
    color: "black"
  },
  tileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    color: "#a9343a"
  },
  date: {
    fontSize: 12,
    color: "gray"
  },
  description: {
    textAlign: "justify",
    marginBottom: 10
  },
  tileFooter: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerText: {
    fontSize: 12,
    color: "gray"
  },
  /*
    SWIPER STYLING
  */
  rightSwipeButtons: {
    height: "100%",
    padding: 10,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center"
  },
  rightSwipeText: {
    color: "white",
    fontSize: 20
  },
  rightSwipeIcons: {
    color: "white",
    fontSize: 30
  }
});
