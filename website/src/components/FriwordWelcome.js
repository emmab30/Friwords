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

        this.form = null;
    }

    componentDidMount() {
        this.getRandomAlias();
    }

    getRandomAlias = () => {
        this.setState({ isLoading: true });
        Services.Auth.generateRandomAlias((data) => {
            this.setState({ isLoading: false });
            if(data.success) {
                let auth = this.state.auth;
                auth.alias = data.alias;
                this.setState({ auth });

                this.form.setFieldsValue({
                    alias: data.alias
                });
            }
        }, (err) => {
            this.setState({ isLoading: false });
        });
    }

    onFinish = () => {
        if(!this.state.auth.gender) {
            notification.open({
                className: 'error',
                message: <Icons.CloseCircleFilled />,
                description: 'Escoge tu género',
            });
            return;
        };

        this.setState({ isLoading : true });
        Services.Auth.register({
            alias: this.state.auth.alias,
            password: this.state.auth.password,
            gender: this.state.auth.gender
        }, (data) => {
            if(data.success) {
                Services.Base.SetToken(data.token);
                if(this.props.onStart)
                    this.props.onStart();
            } else {
                notification.open({
                    className: 'error',
                    message: <Icons.CloseCircleFilled />,
                    description: data.message,
                });
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

        if(!this.props.isVisible)
            return null;

        return (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100%', zIndex: 99999, backgroundColor: '#25b864', paddingBottom: 20 }}>
                <h1 style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>Ingresa a Friwords</h1>

                <div style={{ width: '100%', height: 10, backgroundColor: 'rgba(255,255,255,.15)', marginBottom: 10, marginTop: 10 }}></div>

                <p style={{ maxWidth: '80%', margin: '0 auto', color: 'rgba(255,255,255,.8)', textAlign: 'center' }}>Crea tu alias y tu contraseña. Recordá que <b>todo será anónimo</b></p>

                <Form
                    ref={(e) => { this.form = e; }}
                    name="login_in"
                    className="login-in"
                    initialValues={{
                        alias: auth.alias
                    }}
                    onFinish={this.onFinish}>

                    <Form.Item
                        name="alias"
                        rules={[{ required: true, message: 'Ingresa tu alias' }]}
                        style={{ width: '90%', margin: '5px auto' }}>
                        <Input
                            onChange={(evt) => {
                                auth.alias = evt.target.value;
                                this.setState({ auth });
                            }}
                            style={{ width: '100%', margin: '0 auto' }}
                            prefix={<span>@</span>} placeholder="Tu alias" />
                    </Form.Item>

                    <a
                        onClick={this.getRandomAlias}
                        style={{ width: '90%', color: 'white', textDecoration: 'underline', marginLeft: '5%', margin: '0 auto', padding: 0, display: 'block', marginBottom: 5 }}
                    >Generar alias al azar</a>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Ingresa una contraseña' }]}
                        style={{ width: '90%', margin: '5px auto' }}>
                        <Input
                            onChange={(evt) => {
                                auth.password = evt.target.value;
                                this.setState({ auth });
                            }}
                            type={'password'}
                            style={{ width: '100%', margin: '0 auto' }}
                            prefix={<Icons.KeyOutlined className="site-form-item-icon" />} placeholder="Contraseña" />
                    </Form.Item>

                    <span style={{ width: '100%', display: 'block', textAlign: 'center', fontWeight: 600, color: 'white' }}>Selecciona tu género</span>
                    <div style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                        <div
                            onClick={() => {
                                auth.gender = 'female';
                                this.setState({ auth });
                            }}
                            style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                style={{ maxWidth: 35, maxHeight: 35, opacity: auth.gender == 'female' ? 1 : 0.6 }}
                                src="https://image.flaticon.com/icons/svg/590/590083.svg"
                            />
                        </div>
                        <div
                            onClick={() => {
                                auth.gender = 'male';
                                this.setState({ auth });
                            }}
                            style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                style={{ maxWidth: 35, maxHeight: 35, opacity: auth.gender == 'male' ? 1 : 0.6 }}
                                src="https://image.flaticon.com/icons/svg/921/921071.svg" />
                        </div>
                    </div>

                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.isLoading} style={{ display: 'flex', width: '75%', margin: '0 auto', backgroundColor: 'white', height: 50, color: 'white', fontWeight: 600, justifyContent: 'center', alignItems: 'center', color: '#00a2ff', marginTop: 15 }}>
                            Registrarme
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(255,255,255,.15)', marginBottom: 10, marginTop: 10 }}></div>

                <Button
                    onClick={() => {
                        this.props.onRequestLogin();
                    }}
                    type="primary"
                    htmlType="submit"
                    loading={this.state.isLoading} style={{ display: 'flex', width: '100%', margin: '0 auto', height: 40, color: 'white', fontWeight: 600, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00a2ff' }}>
                    ¡Ya tengo un alias!
                </Button>
            </div>
        )
    }
};