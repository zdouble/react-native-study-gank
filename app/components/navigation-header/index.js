import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

class NavigationHeader extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        leftText: '',
        leftPress() {
            this.navigation.goBack()
        },
        rightText: '',
        rightPress() {
            this.navigation.goBack()
        }
    }

    leftContent() {
        let content = this.props.leftComponent ? this.props.leftComponent :
            <TouchableOpacity style={styles.leftRightBase} onPress={() => this.props.leftPress()}>
                <Icon name={"chevron-small-left"} size={30} color="#000" />
                <Text style={styles.baseText}>{this.props.leftText}</Text>
            </TouchableOpacity>

        return content
    }

    rightContent() {
        let content = this.props.rightComponent ? this.props.rightComponent :
            <TouchableOpacity style={[styles.leftRightBase, styles.right]} onPress={() => this.props.rightPress()}>
                <Text style={styles.baseText}>{this.props.rightText}</Text>
            </TouchableOpacity>
            
        return content
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftWrap}>
                    {this.leftContent()}
                </View>
                <View style={styles.centerWrap}>
                    <Text numberOfLines={1} style={styles.baseText}>{this.props.title}</Text>
                </View>
                <View style={styles.rightWrap}>
                    {this.rightContent()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    baseText: {
        color: '#000',
        fontSize: 18
    },
    leftWrap: {
        flex: 1,
        paddingLeft: 10
    },
    centerWrap: {
        flex: 2,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    rightWrap: {
        flex: 1,
        paddingRight: 10
    },
    rightText: {
        textAlign: 'right'
    },
    leftRightBase: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        justifyContent: 'flex-end'
    }
})

export default NavigationHeader