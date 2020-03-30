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

export default class FriwordLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
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
            let friword = this.state.friword;
            friword.user_alias = props.user.alias;
            this.setState({ friword });
        }

        this.setState({ isVisible : props.isVisible });
    }

    onFinish = () => {
        Services.Auth.signInWithAlias(this.state.auth, (data) => {
            if(data.success) {
                Services.Base.SetToken(data.token);
                this.props.onLoggedIn(data.user);
            }
        }, (err) => {
             notification['error']({
                message: 'Uups',
                description:
                    'Esa cuenta no es válida',
            });

            return false;
        });
    }

    isValid = () => {
        return true;
    }

    render() {
        const {
            auth
        } = this.state;

        return (
            <Modal
                title={`Ingresá con tu alias`}
                visible={this.state.isVisible}
                closable={true}
                onCancel={() => {
                    this.props.onRequestClose()
                }}
                footer={null}>
                <Form
                    name="login_in"
                    className="login-in"
                    onFinish={this.onFinish}>

                    <div style={{ marginBottom: 10, backgroundColor: 'rgba(0,0,0,.03)', padding: 10 }}>
                        <span>¿Tienes un alias distinto? Ingresa tu alias y la contraseña que se te pidió al crearlo.</span>
                    </div>

                    <Form.Item
                        name="alias"
                        rules={[{ required: true, message: 'Ingresa tu alias' }]}>
                        <Input
                            onChange={(evt) => {
                                auth.alias = evt.target.value;
                                this.setState({ auth });
                            }}
                            prefix={<Icons.UserSwitchOutlined className="site-form-item-icon" />} placeholder="Alias" />
                    </Form.Item>

                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Ingresa la contraseña' }]}>
                        <Input
                            onChange={(evt) => {
                                auth.password = evt.target.value;
                                this.setState({ auth });
                            }}
                            type={'password'}
                            prefix={<Icons.KeyOutlined className="site-form-item-icon" />} placeholder="Contraseña" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.isLoading}>
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
};