import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native'

class Detail extends Component {
    contentBox(data) {
        let arr = []
        for (key in data) {
            if (key != '福利') {
                arr.push(<View key={key}>
                    <Text>{key}</Text>
                    <View>
                        {data[key].map(item => <Text key={item._id}>{`*${item.desc}`}</Text>)}
                    </View>
                </View>)
            }
        }

        return arr
    }
    render() {
        const data = this.props.navigation.state.params.data
        console.log(data)
        return (
            <ScrollView>
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
    fuli: {
        height: 300
    }
})

export default Detail