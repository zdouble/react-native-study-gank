import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import http from '../../server'
import WelCome from './welcome'
import { getHistoryDate, getDayData } from '../../server'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show: true
        }
    }

     componentDidMount() {
        this.wel.show(async () => {
            let historyDate = (await getHistoryDate()).results
            this.setState({ 
                dateArr: historyDate,
            })
            let dayDate = (await getDayData(historyDate[0])).results
            this.setState({ 
                data: dayDate
            })
            this.wel.hide(() => this.setState({ 
                loading: false,
            }))
            // getHistoryDate()
            //     .then(res => {
            //         this.setState({
            //             dateArr: res.results
            //         })
            //         return getDayData(res.results[0])
            //     })
            //     .then(res => {
            //         this.setState({ data: res.results })
            //         this.wel.hide(() => this.setState({ loading: false }))
            //     })
        })
    }

    goHistory = () => {
        this.props.navigation.navigate('History')
    }

    render() {
        let content = <View></View>
        if (this.state.data) {
            content = (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: this.state.data['福利'][0].url }}
                            style={{ flex: 1 }}
                        />
                        <View style={styles.headerFoot}>
                            <Text style={styles.headerFootText}>{`via.${this.state.data['福利'][0].who}`}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.video}>
                            <View style={styles.videoDesc}>
                                <Text
                                    style={styles.videoDescText}
                                    numberOfLines={4}
                                >
                                    {this.state.data['休息视频'][0].desc}
                                </Text>
                            </View>
                            <View style={styles.videoFoot}>
                                <Text style={styles.videoFootText}>{`${this.state.dateArr[0]} via.${this.state.data['休息视频'][0].who}`}</Text>
                                <Text style={[styles.videoFootText, { textAlign: 'right' }]}>去看视频</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.goHistory}
                            onPress={this.goHistory}
                        >
                            <Text style={styles.goHistoryText}>查看往期</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (

            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='transparent'
                    translucent
                />
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
        position: 'relative'
    },
    content: {
        flex: 3,
    },
    headerFoot: {
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        paddingRight: 10
    },
    headerFootText: {
        color: '#fff',
        textAlign: 'right'
    },
    video: {
        flex: 2,
        backgroundColor: '#434243',
        marginVertical: 10,
        padding: 10
    },
    videoDesc: {
        flex: 2,
    },
    videoDescText: {
        color: '#fff',
        lineHeight: 18
    },
    videoFoot: {
        flex: 1,
        justifyContent: 'space-between'
    },
    videoFootText: {
        color: '#fff'
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

export default Home
