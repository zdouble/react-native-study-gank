import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Easing,
} from 'react-native'

class WelCome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            layoutAni: new Animated.Value(1),
            LogoAni: new Animated.Value(0),
            TextAni: new Animated.Value(0),
        }
    }

    hide(cb) {
        Animated.timing(this.state.layoutAni, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear
        }).start(() => cb && cb())
    }

    show(cb) {
        let timing = Animated.timing
        Animated.parallel([
            timing(this.state.LogoAni, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear
            }),

            timing(this.state.TextAni, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear
            })
        ]).start(() => cb && cb())
    }

    componentDidMount() {
        this.show()
    }

    logo() {
        return (
            <Animated.Image
                source={require('../../../images/gank_launcher.png')}
                style={[styles.logo, {
                    transform: [
                        {
                            translateX: this.state.LogoAni.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-40, 0]
                            })
                        }
                    ]
                }]}
            />
        )
    }

    text() {
        return (
            <Animated.View
                style={[styles.textBox, {
                    opacity: this.state.TextAni,
                    transform: [{
                        translateX: this.state.TextAni.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 40]
                        })
                    }]
                }]}
            >
                <Text style={styles.text}>这是一段文字</Text>
                <Text style={styles.text}>这是一段文字</Text>
            </Animated.View>
        )
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, { opacity: this.state.layoutAni }]}
            >
                {this.logo()}
                {this.text()}
            </Animated.View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
    textBox: {
        width: '100%',
        position: 'absolute',
        bottom: 20
    },
    text: {
        color: '#fff',
        fontSize: 20,
    }
})

export default WelCome;
