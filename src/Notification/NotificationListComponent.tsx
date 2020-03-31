/// <reference path="./Notification.d.ts" />
import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

enum Colors {'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'};

interface NotificationListProps { 
    notifications?: NotificationPortal[] | undefined,
    filterText: string,
 }

const NotificationList = (props: NotificationListProps) => {    
    let notifications = props.notifications;
    let term = props.filterText.toLocaleLowerCase();

    return(
        <div>
        {
            notifications && notifications
            .filter(notification => { return notification.title.toLowerCase().includes(term) })
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
    );
}

export default NotificationList;