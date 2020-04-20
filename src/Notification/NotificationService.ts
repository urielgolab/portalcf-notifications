import axios from 'axios';
import {Config} from '../Common/Constants';


const baseUrl = Config.REACT_APP_API_BASE_URL; //TODO: process.env.REACT_APP_API_BASE_URL;

export async function getNotifications () {
    try {
        const response = await axios({
            url: `${baseUrl}/notification`,
            method: 'GET'
        })

        return response;
    } catch (error) {
        throw error;
    }
}

export async function postNotification (notification: any) {
    try {
        const response = await axios({
            url: `${baseUrl}/notification`,
            method: 'POST',
            data: notification
        })

        return response;
    } catch (error) {
        return false;
    }
}
