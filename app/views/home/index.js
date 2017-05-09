import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import http from '../../server'
import WelCome from './welcome'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show: true
        }
    }
    hide = () => {
        this.setState({
            show: false
        })
    }
    test = () => {

    }
    componentDidMount() {
        this.wel.show(() => {
            http('http://gank.io/api/day/history')
                .then(res => {
                    this.setState({
                        dateArr: res.results
                    })
                    this.wel.hide(() => this.setState({ loading: false }))
                })
        })

    }

    render() {
        let content = (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <View style={styles.content}>
                    <View style={styles.item1}></View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.goHistory}
                        onPress={this.test}
                    >
                        <Text style={styles.goHistoryText}>查看往期</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                {content}
                {this.state.loading ? <WelCome ref={wel => this.wel = wel} /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252528'
    },
    header: {
        flex: 4,
    },
    content: {
        flex: 3,
    },
    item1: {
        flex: 2,
        backgroundColor: '#434243',
        marginVertical: 10
    },
    goHistory: {
        flex: 1,
        backgroundColor: '#434243',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    goHistoryText: {
        fontSize: 20,
        color: '#fff'
    }
});

export default Home;
