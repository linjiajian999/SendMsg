import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native'

import {
  theme
} from '../../config'

import {
  _Props,
  _NavigationOptions
} from '../../types'

import {
  SendState
} from './home'

export interface HomeItemProps extends _Props {
  phone: string | number,
  state: SendState
}

class HomeItem extends Component<HomeItemProps, any> {
  constructor(props: HomeItemProps) {
    super(props)
  }
  render() {
    return(
      <View style={ style.container }>
        <View style={ style.left }>
          <Text style={ style.mainText }>
            { this.props.phone }
          </Text>
          <Text style={ style.mainText }>
            { '2018-03-26 18:88:88' }
          </Text>
        </View>
        <View style={ style.right}>
          <Text style={ style.subText }>
            { this.props.state }
          </Text>
        </View>
        <View style={ style.loading }>
          <ActivityIndicator
            animating={ true }
            size="small">
          </ActivityIndicator>
        </View>
      </View>
    )
  }
}
export default HomeItem

const height = 56
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'nowrap',
    height,
    paddingLeft: 16,
    paddingRight: 16
  },
  left: {
    // justifyContent: 'space-between',
    // alignItems:'center',
    height,
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  right: {
    // justifyContent: 'space-between',
    // alignItems:'center',
    height,
    width: 120,
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  loading: {
    height,
    justifyContent: 'center',
  },
  mainText: {
    // alignItems:'center',
    // justifyContent: 'center',
    // height
  },
  subText: {
    // alignItems:'center',
    // justifyContent: 'center',
    // height
  }
})
