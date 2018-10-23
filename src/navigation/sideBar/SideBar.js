import React, { Component } from "react"
import { connect } from 'react-redux'
import { Image } from "react-native"
import { Actions } from 'react-native-router-flux'
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base"
import styles from "./style"
import { taxonomiesFetch } from '../../redux/actions'

const drawerCover = require("../../assets/images/drawer-cover.png")
const drawerImage = require("../../assets/images/logo-kitchen-sink.png")
const datas = [
  {
    name: "Home",
    route: ()=>Actions.popTo('ProductsList'),
    icon: "home",
    bg: "#C5F442"
  },
]

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
  }

  componentWillMount() {
    this.props.taxonomiesFetch()
  }

  render() {
    const { taxonomies } = this.props
    console.log("taxonomies", taxonomies)
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={data.route}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { taxonomies } = state
  return { taxonomies }
}

export default connect(mapStateToProps, { taxonomiesFetch })(SideBar)