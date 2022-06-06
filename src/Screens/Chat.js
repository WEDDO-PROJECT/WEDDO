import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import "prop-types";

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default class Chat extends Component {
  state = {
    messages: [],
  };

  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.mapView]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
              }}
            />
          </MapView>
        </View>
      );
    }
    return null;
  };

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <>
        {this.state.messages.length === 0 && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                bottom: 50,
              },
            ]}
          >
            <Image
              source={{ uri: "https://i.stack.imgur.com/qLdPt.png" }}
              style={{
                ...StyleSheet.absoluteFillObject,
                resizeMode: "contain",
              }}
            />
          </View>
        )}
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderCustomView={this.renderCustomView}
          user={{
            _id: 1,
          }}
          parsePatterns={(linkStyle) => [
            {
              pattern: /#(\w+)/,
              style: { ...linkStyle, color: "lightgreen" },
              onPress: (props) => alert(`press on ${props}`),
            },
          ]}
        />
      </>
    );
  }
}
