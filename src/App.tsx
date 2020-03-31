/// <reference path="./Notification/Notification.d.ts" />
import React from 'react';
import './App.css';
import { Header } from './Components/Header';
import NotificationList from './Notification/NotificationListComponent';
import { NotificationService } from './Notification/NotificationService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import TestDanComponent from './Notification/TestDanComponent'

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

  componentDidMount() {
    this.setState({
        notifications: new NotificationService().getNotifications()
    });
  }

  filterText(term: any) {
    this.setState({ filterText: term.target.value })
  }


  render () {
    return (
      <Container fluid>
          <Header Title="Portal de notificaciones" onFilterText={ (term: string) => this.filterText(term) } />
        <Row>
          
          <NotificationList notifications={this.state.notifications} filterText={this.state.filterText} />
          <TestDanComponent notifications={this.state.notifications} filterText={this.state.filterText}/>
        </Row>
      </Container>
    );
  } 
}

export default App;
