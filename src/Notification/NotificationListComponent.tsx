/// <reference path="./Notification.d.ts" />
import React, {useState, useEffect} from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getNotifications } from './NotificationService';
import { formatDate } from '../Common/Date';

interface NotificationListProps { 
    notifications: NotificationPortal[],
    filterText: string,
 }

const NotificationList = (props: NotificationListProps) => {    
    let term = props.filterText.toLocaleLowerCase();
    const [ notifications, setNotifications ] = useState<Array<NotificationPortal>>([]);

    useEffect(() => {
        async function loadNotifications() {
            try {
                const response = await getNotifications();
                if(response?.status === 200) {
                    setNotifications(response.data);
                }
                return response;
            } catch (error) {
                setNotifications([{to: 1, from: 1,title: 'error',text: 'Error', sent: new Date(), type: 0}]);
                // alert('Error al conectarse con el servidor');
            }
        }

        loadNotifications();
    }, []);

    return(
        <Container> 
        {
            notifications
            .filter(notification => { return notification.title.toLowerCase().includes(term) })
            .map((notification, idx) => (
                <Container key={idx}>
                    <Row>
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
                                        <p>{notification.text}</p>
                                        <small>
                                            <b>Fecha: </b> {formatDate(notification.sent)} 
                                            {notification.read && (<><b>- Leído:</b> {formatDate(notification.read)} </>)}
                                        </small>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br />
                        </>
                        </Col>
                    </Row>
                </Container>
        ))
        }
        </Container>
    );
}

export default NotificationList;