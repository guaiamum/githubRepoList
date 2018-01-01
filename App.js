import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  Container,
  Content,
  Header,
  Tabs,
  Tab,
  Title,
  Body,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Thumbnail
} from 'native-base';

export default class App extends Component {
  state = {
    repos: [],
    users: [],
  }

  async componentDidMount(){
    const isOnline = false;

    if(isOnline) {
      const baseURL = 'https://api.github.com';
      const options = {
        header : {
          'User-Agent': 'githubRepoList',
        },
      };

      const reposResponse = await fetch(`${baseURL}/orgs/rocketseat/repos`, options);
      const userResponse = await fetch(`${baseURL}/orgs/rocketseat/members`, options);

      this.setState({
        repos: await reposResponse.json(),
        users: await userResponse.json(),
      })
    }
    else {
      // console.warn("Applicaion Offline, loading demo");
      this.setState({
        repos: [
          {id: 123, name: "oi", html_url: "lalala.com"},
          {id: 321, name: "tchau", html_url: "oioioi.com"}
        ],
         users: [
           {id: 123, login: "usuário1", html_url: "lalala.com",avatar_url: "/src/img/face.jpg"},
           {id: 321, login: "usuário2", html_url: "oioioi.com",avatar_url: "/src/img/face.jpg"}
         ],
      });
    }
  }

  render() {
    return (
      <Container>

        <Header hasTabs style={styles.container}>
          <Body>
            <Title>Github</Title>
          </Body>
        </Header>

        <Tabs>
          <Tab heading="Repositórios">
            <Content>
              <List>
                { this.state.repos.map(repo => (
                  <ListItem key={repo.id}>
                    <Body>
                      <Text>{repo.name}</Text>
                      <Text note>{repo.html_url}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </Content>
          </Tab>
          <Tab heading="Usuários">
            <Content>
              <List>
                {this.state.users.map(user => (
                  <ListItem avatar key={user.id}>
                    <Left>
                      <Thumbnail small source= {{uri:user.avatar_url}}/>
                    </Left>
                    <Body>
                      <Text>{user.login}</Text>
                      <Text note>{user.html_url}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#61089f'
  },
});
