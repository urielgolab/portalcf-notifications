import React, { useState } from 'react';
import {Container, Button,  Col, Dropdown, Form, FormGroup, FormLabel } from "react-bootstrap";
import CuitSelector from '../Components/CuitSelector';
import DatePicker from  'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from  'react-datepicker';
import es from 'date-fns/locale/es';
import "../Static/customDatePicker.css";
import {postNotification} from "../Notification/NotificationService";


interface INotificationPostProps {

}

interface INotificationPostState { 
    submitSuccess?: boolean;
    values: IValues;
    errors: IErrors;    
}

export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
    sent: Date,
    read: Date
}

export interface IErrors {
    /* The validation error messages for each field (key is the field name */
    [key: string]: string;
}

class NotificationPost extends React.Component<INotificationPostProps, INotificationPostState > {    
    constructor(props: INotificationPostProps) {
        super(props);

        const errors: IErrors = {};
        const values: IValues = {
            sent: new Date(),
            read: new Date(),
        };

        this.state = {
            values,
            errors,
        }

        
        registerLocale('es', es);
    }

    private validateForm(): boolean {
        // TODO - validate form
        return true;
    }    
    
    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    
        if (this.validateForm()) {
          const submitSuccess: boolean = await this.post();
          this.setState({ submitSuccess });
        }
    };

    /**
     * Returns whether there are any errors in the errors object that is passed in
     * @param {IErrors} errors - The field errors
     */
    private haveErrors(errors: IErrors) {
        let haveError: boolean = false;
        Object.keys(errors).map((key: string) => {
            if (errors[key].length > 0) {
            haveError = true;
            }
        });
        return haveError;
    }

    private async post(): Promise<boolean> {
        let notification: any = {...{to:0, from:0, title: '', text: '', type: 0},...this.state.values};
        // let destination: number[] = this.state.values.to;
        const response = await postNotification(notification).then(() => {return true}).catch(() => {return false});

        return response;
    }

    onChange = (event: any) => {
        console.log('Field change:' + event);

        //cambio en alguno de los campos estándar del form. 
        if(event.target && event.target.name && event.target.value) {
            let newValues = {[event.target.name]: event.target.value};
            this.setState({values: {...this.state.values, ...newValues}});
        }

        //cambio en CuitSelector
        if(event.actionMeta) {
            let newState = {values: {...this.state.values, ...{to: event.newValue.map((x: any) => { return parseInt(x.value) })}}};
            this.setState(newState)
        }
            
    }

    render() {
        const {submitSuccess, errors} = this.state;

        return (
            <Container>
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                    Notificacion enviada correctamente!
                    </div>
                )}
                {submitSuccess === false &&
                    !this.haveErrors(errors) && (
                    <div className="alert alert-danger" role="alert">
                        Sorry, an unexpected error has occurred
                    </div>
                    )}
                {submitSuccess === false &&
                    this.haveErrors(errors) && (
                    <div className="alert alert-danger" role="alert">
                        Sorry, the form is invalid. Please review, adjust and try again
                    </div>
                )}                
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formDest">
                        <Form.Label>Destinatario</Form.Label>
                        <CuitSelector onChange={ (e:any) => this.onChange(e) } />
                        <Form.Text className="text-muted" style={{"cursor": "pointer"}} onDoubleClick={()=> {alert('subir archivo();')}}>
                            También puedes adjuntar un archivo TXT con un CUIT por fila haciendo doble-click acá.
                        </Form.Text>
                        {/* <input type="file" style={"visible": "hidden"} /> */}
                    </Form.Group>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" placeholder="Título" name="title" onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label>Contenido</Form.Label>
                        <Form.Control as="textarea"  name="text" rows="3" onChange={this.onChange} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formFechaEnviado">
                            <Form.Label>Enviado</Form.Label>
                            <div className="customDatePicker">
                                <DatePicker
                                    selected={this.state.values.sent}
                                    className={'form-control'}
                                    onChange={date => date && this.setState( { values: {...this.state.values, ...{ sent: date }}})}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    locale="es"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    />
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formFechaLeido">
                            <Form.Label>Leído</Form.Label>
                            <div className="customDatePicker">
                                <DatePicker
                                    selected={this.state.values.read}
                                    className={'form-control'}
                                    onChange={date => date && this.setState({values: {...this.state.values,...{read: date}}})}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    locale="es"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    />
                            </div>
                        </Form.Group>                        
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default NotificationPost;