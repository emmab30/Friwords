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
const { TextArea } = Input;

export default class FriwordCreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            friword: {}
        };

        this.form = null;
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
        if(this.isValid()) {
            this.setState({ isLoading : true });
            Services.Friwords.postFriword(this.state.friword, (data) => {
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
                }
            }, (err) => {
                // Do nothing
                this.setState({ isLoading : false });
                 notification['error']({
                    message: 'Oops',
                    description:
                        'Tu friword no pudo ser creado ahora. Intenta en unos momentos.',
                });
            });
        }
    }

    isValid = () => {
        const { friword } = this.state;
        if(friword.gender == null) {
            notification['error']({
                message: 'El género',
                description:
                    'Selecciona tu género',
            });

            return false;
        }

        return true;
    }

    render() {
        const {
            friword
        } = this.state;

        return (
            <Modal
                title={`Publica tu friword`}
                visible={this.state.isVisible}
                closable={true}
                onCancel={() => {
                    this.props.onRequestClose()
                }}
                footer={null}>
                <Form
                    ref={(e) => { this.form = e; }}
                    name="post_friword"
                    className="post-friword"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}>

                    <div style={{ marginBottom: 10, backgroundColor: 'rgba(0,0,0,.03)', padding: 10 }}>
                        <span>¡Recuerda! Esto es totalmente anónimo, y tu friword aparecerá creado por <b>{friword.user_alias != null ? friword.user_alias : ''}</b></span>
                    </div>

                    {/*<div style={{ width: '100%', height: 8, backgroundColor: 'rgba(0,0,0,0.01)', marginTop: 10, marginBottom: 10 }}></div>*/}

                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Ingresa un título' }]}>
                        <Input
                            onChange={(evt) => {
                                friword.title = evt.target.value;
                                this.setState({ friword });
                            }}
                            prefix={<Icons.QuestionCircleOutlined className="site-form-item-icon" />} placeholder="Título" />
                    </Form.Item>

                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Ingresa el texto' }]}>
                        <TextArea
                            placeholder="Tu texto"
                            autoSize={{ minRows: 2, maxRows: 8 }}
                            maxLength={500}
                            onChange={(evt) => {
                                friword.text = evt.target.value;
                                this.setState({ friword });
                            }}
                            prefix={<Icons.QuestionCircleOutlined className="site-form-item-icon" />}
                        />
                        {/*<Input
                            onChange={(evt) => {
                                friword.text = evt.target.value;
                                this.setState({ friword });
                            }}
                            prefix={<Icons.QuestionCircleOutlined className="site-form-item-icon" />} placeholder="Texto" />*/}
                    </Form.Item>
                    <span>{500 - (friword && friword.text && friword.text.length ? friword.text.length : 0)} caracteres restantes</span>

                    <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(0,0,0,0.05)', marginTop: 20, marginBottom: 20 }}></div>

                    <span style={{ width: '100%', display: 'block', textAlign: 'center', fontWeight: 600 }}>Selecciona tu género</span>
                    <div style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                        <div
                            onClick={() => {
                                friword.gender = 'female';
                                this.setState({ friword });
                            }}
                            style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                style={{ maxWidth: 35, maxHeight: 35, opacity: friword.gender == 'female' ? 1 : 0.5 }}
                                src="https://image.flaticon.com/icons/svg/590/590083.svg"
                            />
                        </div>
                        <div
                            onClick={() => {
                                friword.gender = 'male';
                                this.setState({ friword });
                            }}
                            style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                style={{ maxWidth: 35, maxHeight: 35, opacity: friword.gender == 'male' ? 1 : 0.5 }}
                                src="https://image.flaticon.com/icons/svg/921/921071.svg" />
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.isLoading}>
                            Publicar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
};