import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

class Detail extends Component {
    constructor(props) {
        super(props)
    }
    contentBox(data) {
        let arr = []
        for (key in data) {
            if (key != '福利') {
                arr.push(
                    <View key={key} style={styles.contentBox}>
                        <Text style={styles.ItemTitle}>{key}</Text>
                        {
                            data[key].map(item => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => this.props.navigation.navigate('WebViewPage', { title: item.desc, url: item.url })}
                                        key={item._id}
                                        style={styles.ItemContent}
                                        underlayColor='transparent'
                                    >
                                        <Text >{`*${item.desc}`}</Text>
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </View>)
            }
        }

        return arr
    }
    _onScroll = (event) => {
        console.log(event.nativeEvent)
    }
    render() {
        const data = this.props.navigation.state.params.data
        return (
            <ScrollView
                contentContainerStyle={styles.scroll}
                onScroll={this._onScroll}
                scrollEventThrottle={5}
            >
                <View style={styles.fuli}>
                    <Image
                        source={{ uri: data['福利'][0].url }}
                        style={{ flex: 1 }}
                    />
                </View>
                {
                    this.contentBox(data)
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#252527',
        paddingBottom: 10
    },
    fuli: {
        height: 300,
        marginBottom: 10
    },
    contentBox: {
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 10,
        marginTop: 10,
        padding: 8
    },
    ItemTitle: {
        fontSize: 18,
        marginBottom: 5
    },
    ItemContent: {
        marginBottom: 5
    }
})

export default Detail