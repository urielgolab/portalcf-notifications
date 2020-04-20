/// <reference path="./Notification.d.ts" />
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Button, Badge } from 'react-bootstrap';


interface NotificationBadgeProps { 
    notifications?: NotificationPortal[]
 }

export const NotificationBadge = (props: NotificationBadgeProps) => {    
    return(
        <Button variant="light" style={{padding: '1px', marginRight: '10px'}}>
            <FontAwesomeIcon color="grey" icon={faEnvelope} size="2x" />
            <Badge variant="danger" style={{marginLeft: '-10px', top: '-18px'}} pill>99</Badge>
        </Button>
    );
}