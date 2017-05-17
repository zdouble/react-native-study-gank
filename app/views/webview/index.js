import React, { Component } from 'react'
import {
    WebView
} from 'react-native'

class WebViewPage extends Component {
    render() {
        return (
            <WebView
                style={{ flex: 1 }}
                source={{ uri: this.props.navigation.state.params.url }}
            />
        )
    }
}

export default WebViewPage