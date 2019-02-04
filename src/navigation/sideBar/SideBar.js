import React, { Component } from "react"
import { connect } from 'react-redux'
import { Image, Text } from "react-native"
import { Actions } from 'react-native-router-flux'
import {
  Content,
  //Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Body,
  Badge,
  Card,
  CardItem,
  Grid,
  Col,
  Button
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
    const { taxonomies, user } = this.props
    console.log("taxonomies", taxonomies)

    //Render Login menu
    //If not logged in show buttons
    let loginMenu = null
    // if (user.isLoggedIn) {

    // } else {
      loginMenu = 
        <Container style={styles.drawerContainer}>
            <Grid style={{alignItems: 'center'}}>
              <Col>
                <Icon name='person' style={{fontSize: 80, color: 'white'}}/>
                </Col>
                <Col>
                  <Grid style={{alignItems: 'center'}}>
                  <Col >
                    <Text style={{color: 'white'}}>Hola. </Text>
                  </Col>
                  <Col >
                    {
                      user.isLoggedIn 
                      ? 
                        <Text style={{color: 'white'}}>{user.email.substr(0, user.email.indexOf('@'))}</Text>
                      :
                        <Button
                          //style={{flex: 1}}
                          transparent 
                          title="Go to Login" 
                          onPress={() => Actions.login({ data: 'Custom data', title: 'Custom title' })}
                        >
                          <Text style={{color: 'white'}}>Login</Text>
                        </Button>
                    }
                  </Col>
                  </Grid>
                </Col>
              
              </Grid>  
        </Container>
    //}


    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          {loginMenu}
          {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}

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
  const { taxonomies, user } = state
  return { taxonomies, user }
}

export default connect(mapStateToProps, { taxonomiesFetch })(SideBar)