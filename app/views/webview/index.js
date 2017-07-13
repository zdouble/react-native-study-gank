import React, { Component } from 'react'
import {
    WebView
} from 'react-native'
import Loading from '../../components/loading'

class WebViewPage extends Component {
    render() {
        return (
            <WebView
                style={{ flex: 1 }}
                source={{ uri: this.props.navigation.state.params.url }}
                startInLoadingState
                renderLoading={() => <Loading size="large" />}
            />
        )
    }
}

export default WebViewPage