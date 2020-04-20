/// <reference path="./Notification/Notification.d.ts" />
import React from 'react';
import './App.css';
import { Header } from './Components/Header';
import NotificationList from './Notification/NotificationListComponent';
// import { NotificationService } from './Notification/NotificationService';
import {Container, Row } from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NotificationPost from './NotificationPost/NotificationPost';

interface AppState {
  filterText: string,
  notifications: NotificationPortal[]
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      filterText: '',
      notifications: [],
    };
  }

  filterText(term: any) {
    this.setState({ filterText: term.target.value })
  }

  render () {
    return (
      <Router>
        <Container fluid>
            <Header Title="Portal de notificaciones" onFilterText={ (term: string) => this.filterText(term) } />
            <Row style={{paddingTop: '20px'}}>
              <Switch>
                  <Route exact path="/"
                    render={(props) => <NotificationList notifications={this.state.notifications} filterText={this.state.filterText} /> }
                  />
                  <Route path="/post" component={NotificationPost} />
              </Switch>
            </Row>
        </Container>
      </Router>
    );
  } 
}

export default App;
