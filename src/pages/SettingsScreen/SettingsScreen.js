/* import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const handleRoutesPage = (navigation) => (

    navigation.navigate('ProfileRoutes')

)

const handleMarkersPage = (navigation) => (

    navigation.navigate('ProfileMarkers')

)

const SettingsScreen = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>SettingsScreen</Text>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleRoutesPage(props.navigation)}>
            <Text>Ver suas rotas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => handleMarkersPage(props.navigation)}>
            <Text>Ver seus marcadores cadastrados</Text>
        </TouchableOpacity>
    </View>
);

export default SettingsScreen */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";

import Snackbar from "react-native-snackbar";

import Icon from "react-native-vector-icons/MaterialIcons";

import RouteItem from "../../components/RouteItem";
import MarkerItem from "../../components/MarkerItem";

class SettingsScreen extends Component {
  availableFilters = [
    { state: "routes", label: "Rotas" },
    { state: "markers", label: "Marcadores" }
  ];

  state = {
    cards: [],
    filter: "routes",
    loading: false
  };

  async componentDidMount() {
    const filter =
      (await AsyncStorage.getItem("@RoutesApp:filter")) || "routes";

    Snackbar.show({
      title: "Carregando",
      duration: Snackbar.LENGTH_LONG
    });

    await this.props.getRoutes();

    this.setState({ filter }, this.loadListCard);
  }

  handleChangeFilter = async filter => {
    await AsyncStorage.setItem("@RoutesApp:filter", filter);

    this.setState({ filter }, this.loadListCard);
  };

  loadListCard = async () => {
    this.setState({ loading: true });

    await this.props.getMarkers();

    const { filter } = this.state;

    if (filter === "routes") {
      const lastRoutes = this.props.routes.slice(0, 2);

      alert(JSON.stringify(lastRoutes));

      this.setState({ cards: lastRoutes });
    } else if (filter === "markers") {
      const lastMarkers = this.props.markers.slice(0, 2);

      this.setState({ cards: lastMarkers });
    }
  };

  render() {
    const { filter: activeFilter } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
            }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <View style={styles.socialRow}>
                <View>
                  <Icon
                    size={30}
                    type="entypo"
                    color="#3B5A98"
                    name="facebook-with-circle"
                    onPress={() => console.log("facebook")}
                  />
                </View>
                <View style={styles.socialIcon}>
                  <Icon
                    size={30}
                    type="entypo"
                    color="#56ACEE"
                    name="twitter-with-circle"
                    onPress={() => console.log("twitter")}
                  />
                </View>
                <View>
                  <Icon
                    size={30}
                    type="entypo"
                    color="#DD4C39"
                    name="google--with-circle"
                    onPress={() => console.log("google")}
                  />
                </View>
              </View>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
                electram expetendis, omittam deseruisse consequuntur ius an,
              </Text>
            </View>
            <View style={styles.tabContainer}>
              <View style={styles.filtersContainer}>
                {this.availableFilters.map(filter => (
                  <TouchableOpacity
                    key={filter.state}
                    onPress={() => this.handleChangeFilter(filter.state)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        filter.state === activeFilter
                          ? styles.activeFilterText
                          : {}
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.cardContainer}>
              {this.state.filter === "routes" &&
                this.state.cards.map(card => (
                  <RouteItem key={card._id} route={card} />
                ))}
              {this.state.filter === "markers" &&
                this.state.cards.map(card => (
                  <MarkerItem key={card._id} marker={card} />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 100
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 30
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  socialRow: {
    flexDirection: "row",
    marginBottom: 30
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  tabContainer: {   
    marginTop: 10
  },
  filtersContainer: {
    flexDirection: "row",
    backgroundColor: "#00BFFF",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  filterText: {
    color: "#FFF"
  },
  activeFilterText: {
    color: "#666",
    fontWeight: "bold"
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#00BFFF",
    marginHorizontal: 20
  }
});

const mapStateToProps = state => ({
  routes: state.routes.data || [],
  markers: state.colorMarker.data || [],
  loadingRoutes: state.routes.loading,
  loadingMarkers: state.colorMarker.loading
});

export default connect(
  mapStateToProps,
  null
)(SettingsScreen);
