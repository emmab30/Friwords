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
    notification,
    Upload
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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class FriwordCreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            friword: {},
            previewVisible: false,
            previewImage: '',
            fileList: []
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

            const { friword } = this.state;

            const _postFriword = (friword) => {
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

            if(this.state.fileList && this.state.fileList.length > 0) {
                this.uploadImage((data) => {
                    alert(`OK ${JSON.stringify(data)}`);
                    friword.image = data.downloadURL;
                    _postFriword(friword);
                }, (err) => {
                    alert(`Err ${JSON.stringify(err)}`);
                });
            } else {
                _postFriword(friword);
            }
        }
    }

    uploadImage = (success, err, options) => {
        // Upload image
        const storage = Services.Firebase.services().storage();

        const file = this.state.fileList[0].originFileObj;
        const storageRef = storage.ref(`${process.env.REACT_APP_STORAGE_FIREBASE_CONTAINER}/${file.name}`)
        const task = storageRef.put(file)
        task.on('state_changed', (snapshot) => {
            // Se lanza durante el progreso de subida
            if(options && options.onProgress)
                options.onProgress(snapshot);
        }, (error) => {
            if(err)
                err(error);
        }, (data) => {
            if(success){
                task.snapshot.ref.getDownloadURL().then((data) => {
                    success({
                        downloadURL: data
                    });
                });
            }
        });
    }

    isValid = () => {
        const { friword } = this.state;

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

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

         this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    };

    render() {
        const { friword, previewVisible, previewImage, fileList } = this.state;

        return (
            <Modal
                style={{ top: 50, height: '100%' }}
                bodyStyle={{ paddingBottom: 30 }}
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

                    { this.props.topics != null &&
                        <Select
                            defaultValue="Escoge un tópico"
                            style={{ width: '100%', marginBottom: 15 }}
                            onChange={(value) => {
                                friword.topic_id = value;
                                this.setState({ friword });
                            }}>
                            { this.props.topics.map((e) => {
                                return (
                                    <Option value={ e.id }>#{e.name}</Option>
                                );
                            })}
                        </Select>
                    }

                    <TextArea
                        placeholder="Escribe tu friword"
                        autoSize={{ minRows: 2, maxRows: 8 }}
                        maxLength={750}
                        onChange={(evt) => {
                            friword.text = evt.target.value;
                            this.setState({ friword });
                        }}
                        prefix={<Icons.QuestionCircleOutlined className="site-form-item-icon" />}
                        style={{ marginBottom: 5 }}
                    />
                    <span>{750 - (friword && friword.text && friword.text.length ? friword.text.length : 0)} caracteres restantes</span>

                    <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(0,0,0,0.05)', marginTop: 5, marginBottom: 10 }}></div>

                    <Upload
                        accept={".png, .jpeg, .jpg, .JPG, .JPEG"}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        beforeUpload={ (file) => {
                            this.setState(state => ({
                                fileList: [...state.fileList, file],
                            }));
                            return false;
                        }}>
                        {fileList.length >= 8 ? null : (
                            <div>
                                <Icons.PlusOutlined />
                                <div className="ant-upload-text">{ fileList.length > 0 ? 'Reemplazar imagen' : 'Subir imagen (opcional)' }</div>
                            </div>
                        )}
                    </Upload>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.isLoading}
                            style={{ width: '100%' }}>
                            Publicar friword
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
};