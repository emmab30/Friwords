import React from 'react';
import {
    Row,
    Col,
    Card,
    Avatar,
    Modal,
    Button,
    Form,
    Input,
    Select,
    notification
} from 'antd';

// Components
import FriwordComment from './FriwordComment';

// Modules
import moment from 'moment';
import * as Icons from '@ant-design/icons';
import { Spin } from 'antd';

import '../App.css';

// Services
import * as Services from '../services'

const { Meta } = Card;
const { Option } = Select;
const { TextArea } = Input;

export default class FriwordsNotificationsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            notifications: []
        };

        this.form = null;
    }

    componentDidMount() {
        this.checkProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkProps(nextProps);
    }

    checkProps = (props) => {
        this.setState({ isVisible : props.isVisible });
        if(props.isVisible == true && this.state.isVisible == false) {
            this.getNotifications();
        }
    }

    getNotifications = () => {
        this.setState({ isLoading : true });
        Services.Notifications.getNotifications((data) => {
            if(data.success) {
                this.setState({
                    notifications: data.notifications,
                    isLoading: false
                });

                // Mark as seen
                for(var idx in data.notifications) {
                    Services.Notifications.updateNotification({
                        id: data.notifications[idx].id,
                        seen: true
                    }, (response) => {
                        let notifications = this.state;
                        notifications[idx].seen = true;
                        this.setState({ notifications });
                    });
                }
            }
        }, (err) => {
            this.setState({
                notifications: [],
                isLoading: false
            });
            // Do nothing
        });
    }

    onFinish = () => {
        if(this.isValid()) {
            this.setState({ isLoading : true });

            const { friword } = this.state;
            // friword.title = friword.text.substring(0, 12) + '...';

            Services.Friwords.postFriword(friword, (data) => {
                this.setState({ isLoading : false });
                if(data.success) {
                    this.setState({
                        isVisible: false,
                        friword: {}
                    });

                    // Reset form
                    if(this.form)
                        this.form.resetFields();

                    this.props.onCreated(data.friword);
                } else {
                    notification.open({
                        className: 'error',
                        message: 'Oops',
                        description: data.message,
                    });
                }
            }, (err) => {
                // Do nothing
                this.setState({ isLoading : false });
                notification.open({
                    className: 'error',
                    message: 'Oops',
                    description:
                        'Tu friword no pudo ser creado ahora. Intenta en unos momentos.',
                });
            });
        }
    }

    isValid = () => {
        const { friword } = this.state;
        /*if(friword.gender == null) {
            notification['error']({
                message: 'El género',
                description:
                    'Selecciona tu género',
            });

            return false;
        }*/

        if(!friword || !friword.text || friword.text.length < 10) {
            notification.open({
                className: 'error',
                message: 'Oops',
                description: 'Escribe un texto de al menos 10 caracteres',
            });

            return false;
        }

        return true;
    }

    render() {
        const {
            notifications,
            friword
        } = this.state;

        return (
            <Modal
                title={`Tus notificaciones`}
                visible={this.state.isVisible}
                closable={true}
                onCancel={() => {
                    this.props.onRequestClose()
                }}
                footer={null}>

                { notifications && notifications.length > 0 && notifications.map((notification) => {
                    return (
                        <div style={{ width: '100%', marginBottom: 10, position: 'relative', backgroundColor: !notification.seen ? 'rgba(255, 160, 0, .15)' : 'white', padding: 10, borderRadius: 5 }}>

                            <div style={{ width: '100%', borderBottomWidth: 5, borderBottomColor: 'rgba(0,0,0,.05)' }} dangerouslySetInnerHTML={{ __html: notification.html }}></div>

                            <span style={{ display: 'block', width: '100%', fontSize: 11, marginTop: 5, textAlign: 'right' }}>{ moment(notification.created_at).fromNow() }</span>

                            <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(0,0,0,0.1)', marginTop: 10 }}></div>
                        </div>
                    );
                })}

                { !notifications || notifications.length == 0 &&
                    <span>¡Aún no tienes notificaciones para revisar!</span>
                }

            </Modal>
        )
    }
};