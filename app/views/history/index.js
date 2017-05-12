import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableHighlight,
    StatusBar
} from 'react-native'

import { getDayData } from '../../server'

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            data: [],
            historyDate: this.props.navigation.state.params.historyDate,
            moreLoading: false,
            refreshing: false
        }
    }

    async fetchData() {
        let dateArr = this.state.historyDate.slice((this.state.page - 1) * 20, this.state.page * 20)
        let data = await getDayData(dateArr)

        let dataBlog = []
        let i = this.state.data.length
        data.map((item) => {
            dataBlog.push({
                key: i,
                value: item
            })
            i++;
        })

        if (this.state.moreLoading) {
            this.setState({ data: [...this.state.data, ...dataBlog] })
        } else {
            this.setState({ data: dataBlog })
        }

        this.setState({
            moreLoading: false,
            refreshing: false
        })
    }

    _renderItem(data) {
        let { index, item: { value: { results } } } = data
        let title = results['休息视频'] ? results['休息视频'][0].desc : 'gank.io'
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Detail', { data: results })}>
                <View>
                    <View style={styles.listTextWrap}>
                        <Text style={styles.listText}>{this.state.historyDate[index]}</Text>
                        <Text style={styles.listText}>{title}</Text>
                    </View>

                    <Image
                        source={{ uri: results['福利'][0].url }}
                        style={{ width: null, height: 260, }}
                    />
                </View>
            </TouchableHighlight>
        )
    }

    _onEndReached() {
        this.setState({
            page: ++this.state.page,
            moreLoading: true
        }, () => {
            this.fetchData()
        })
    }

    _onRefresh() {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.fetchData()
        })

    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='transparent'
                    barStyle='dark-content'
                    animated
                    translucent
                />
                {
                    this.state.data.length ?
                        <FlatList
                            data={this.state.data}
                            renderItem={(item) => this._renderItem(item)}
                            onEndReached={() => this._onEndReached()}
                            onRefresh={() => this._onRefresh()}
                            refreshing={this.state.refreshing}
                        /> : null
                }
                {
                    this.state.moreLoading ? <Text style={{ textAlign: 'center' }}>正在加载</Text> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#252527',
        flex: 1
    },
    listTextWrap: {
        alignItems: 'center',
        padding: 20
    },
    listText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default History
