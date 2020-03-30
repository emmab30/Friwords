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
import * as Icons from '@ant-design/icons';
import { Spin } from 'antd';

import '../App.css';

// Services
import * as Services from '../services'

const { Meta } = Card;
const { Option } = Select;

export default class FriwordWelcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isLoading: false,
            auth: {}
        };
    }

    componentDidMount() {
        this.checkProps(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.checkProps(nextProps)
    }

    checkProps = (props) => {
        if(props.user && props.user.alias) {
            this.setState({ user: props.user });
        }

        this.setState({ isVisible : props.isVisible });
    }

    onFinish = () => {
        this.setState({ isLoading : true });
        Services.Auth.setPasswordAnonymousUser({
            alias: this.state.user.alias,
            password: this.state.auth.password
        }, (data) => {
            if(data.success) {
                Services.Base.SetToken(data.token);
                if(this.props.onStart)
                    this.props.onStart();
            }

            this.setState({ isLoading : false });
        }, (err) => {
            // Do nothing

            this.setState({ isLoading : false });
        });
    }

    render() {
        const {
            auth
        } = this.state;

        if(!this.state.user)
            return null;
        else if(!this.props.isVisible)
            return null;

        return (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 99999, backgroundColor: '#25b864' }}>
                <h1 style={{ textAlign: 'center' }}>¡Hola!</h1>
                <h4 style={{ textAlign: 'center' }}>¡Déjame explicarte brevemente como funciona Friwords!</h4>

                <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(255,255,255,.15)', marginBottom: 10, marginTop: 10 }}></div>

                <p style={{ maxWidth: '80%', margin: '0 auto', color: 'rgba(255,255,255,.8)', textAlign: 'center' }}>A partir de este momento, <span style={{ color: 'rgba(255,255,255,1)', fontWeight: 800, fontSize: '1.2em' }}>@{ this.props.user.alias }</span> es tu alias anónimo. Ese alias es el que te identificará de acá en adelante, así que anótalo y recuérdalo. Puedes publicar preguntas y recibir respuestas, y todo esto será totalmente anónimo.</p>

                <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(255,255,255,.15)', marginBottom: 10, marginTop: 10 }}></div>

                <p style={{ maxWidth: '80%', margin: '0 auto', color: 'rgba(255,255,255,.8)', textAlign: 'center' }}>Ingresa una contraseña, y <b>¡NO LA OLVIDES!</b></p>

                <Form
                    name="login_in"
                    className="login-in"
                    onFinish={this.onFinish}>

                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Ingresa una contraseña' }]}
                        style={{ width: '90%', margin: '20px auto' }}>
                        <Input
                            onChange={(evt) => {
                                auth.password = evt.target.value;
                                this.setState({ auth });
                            }}
                            type={'password'}
                            style={{ width: '100%', margin: '0 auto' }}
                            prefix={<Icons.KeyOutlined className="site-form-item-icon" />} placeholder="Contraseña" />
                    </Form.Item>

                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button type="primary" htmlType="submit" loading={this.state.isLoading} style={{ display: 'flex', width: '100%', margin: '0 auto', backgroundColor: 'white', height: 50, color: '#25b864', fontWeight: 600, justifyContent: 'center', alignItems: 'center' }}>
                            ¡Empezar!
                        </Button>
                    </Form.Item>
                </Form>

                <Button
                    onClick={() => {
                        this.props.onRequestLogin();
                    }}
                    type="primary"
                    htmlType="submit"
                    loading={this.state.isLoading} style={{ display: 'flex', width: '75%', margin: '0 auto', backgroundColor: 'white', height: 50, color: 'white', fontWeight: 600, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00a2ff' }}>
                    Ya tengo un alias
                </Button>
            </div>
        )
    }
};