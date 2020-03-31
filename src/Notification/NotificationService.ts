/// <reference path="./Notification.d.ts" />
import { ApiService } from "../Common/ApiService";

export class NotificationService extends ApiService {

    getNotifications(): NotificationPortal[] {
        // fetch('')
        // .then((data) => {
        //     return data.json();
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

        return [
            {
                to: 20319823973,
                from: 20319823973,
                text: 'Notificacion 1',
                title: 'Titulo 1',
                type: 'text',
                sent: new Date(),
                read: undefined,
            },
            {
                to: 20319823973,
                from: 20319823973,
                text: 'Notificacion 2',
                title: 'Titulo 2',
                type: 'text',
                sent: new Date(),
                read: new Date(),
            }        
        ];
    }
}