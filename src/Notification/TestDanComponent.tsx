/// <reference path="./Notification.d.ts" />
import React from 'react'
import {Card, Container, Row, Col} from 'react-bootstrap'

interface Props {
  notifications: NotificationPortal[]
  filterText: string
}

const TestDanComponent: React.FunctionComponent<Props> = props => {
  return (
    <div>
      {
        props.notifications
          .filter(notification => { return notification.title.toLowerCase().includes(props.filterText) })
          .map((notification, idx) => (
              <Container style={{paddingTop: '20px'}}>
                  <Row key={idx}>
                      <Col>
                      <>
                          <Card
                              bg={'light'}
                              key={idx}
                              text={'dark'}
                          >
                              <Card.Header>
                                  <b>{notification.title}</b>
                              </Card.Header>
                              <Card.Body>
                              {/* <Card.Title>{notification.title}</Card.Title> */}
                                  <Card.Text>
                                      {notification.text}
                                  </Card.Text>
                              </Card.Body>
                              <Card.Footer className={'notificationFooter'}>
                                  <b>Fecha: </b> {notification.sent.toLocaleString()} 
                                  {notification.read && (<><b>- Leído:</b> {notification.read.toLocaleString()} </>)}
                              </Card.Footer>
                          </Card>
                          <br />
                      </>
                      </Col>
                  </Row>
              </Container>
      ))
      }
    </div>
  )
}

export default TestDanComponent