import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  WebView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65
  },
  loading: {
    marginTop: 20
  }
})

export default class Recipe extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: this.props.recipie.source_url}}
          startInLoadingState={true}
          renderLoading={() => {return (<ActivityIndicator style={styles.loading} size="small" />)}}
        />
      </View>
    );
  }
}
