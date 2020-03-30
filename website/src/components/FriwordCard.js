import React from 'react';
import {
    Row,
    Col,
    Card,
    Avatar,
    Button,
    Form,
    Input,
    notification
} from 'antd';

// Components
import FriwordComment from './FriwordComment';
import FadeInSection from './FadeInSection'

// Modules
import moment from 'moment';
import 'moment/locale/es';
import * as Icons from '@ant-design/icons';
import { Spin } from 'antd';
import ParticleEffectButton from 'react-particle-effect-button'

// Services
import * as Services from '../services'

import '../App.css';

const { Meta } = Card;

export default class FriwordCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComments: false,
            hideDislikeBtn: false,
            hideLikeBtn: false,
            isSendingComment: false,
            canLeaveComment: true,
            comment: '',
            showComments: false,

            // False both
            hasDisliked: false,
            hasLiked: false
        };
    }

    componentDidMount() {

    }

    onDislike = () => {
        if(this.state.hasLiked || this.state.hasDisliked)
            return;

        this.props.onDislike();
        this.setState({ hideDislikeBtn : true, hasDisliked : true }, () => {
            setTimeout(() => {
                this.setState({ hideDislikeBtn : false });
            }, 1000);
        });
    }

    onLike = () => {
        if(this.state.hasLiked || this.state.hasDisliked)
            return;

        this.props.onLike();
        this.setState({ hideLikeBtn : true, hasLiked : true }, () => {
            setTimeout(() => {
                this.setState({ hideLikeBtn : false });
            }, 1000);
        });
    }

    render() {
        const {
            friword
        } = this.props;

        let sendCommentSuffix = (
            <div
                onClick={() => {
                    // Create comment
                    if(!this.state.comment || this.state.comment.length < 2) {
                        notification['error']({
                            message: 'El comentario..',
                            description:
                                'A tu comentario le falta un poco de magia. Complétalo',
                        });
                        return;
                    }
                    Services.Friwords.postComment({
                        text: this.state.comment,
                        user_alias: this.props.user != null && this.props.user.alias != null ? this.props.user.alias : '',
                        friword_id: friword.id,
                        likes: 0,
                        dislikes: 0
                    }, (data) => {
                        this.props.onRequestComments();
                        this.setState({
                            canLeaveComment : false,
                            isSendingComment: true
                        });

                        notification.open({
                            className: 'success',
                            message: <Icons.HeartTwoTone twoToneColor="#eb2f96" />,
                            description: 'Tu comentario ya está visible',
                        });
                    }, (err) => {
                        // Do nothing
                    });
                }}
                style={{ backgroundColor: 'white', padding: 0, marginTop: 5 }}>
                <Icons.SendOutlined style={{ color: 'rgba(0,0,0,.75)' }} />
            </div>
        );

        if(this.state.isSendingComment) {
            sendCommentSuffix = (
                <div style={{ backgroundColor: 'white', padding: 0, marginTop: 5 }}>
                    <Icons.SendOutlined spin style={{ color: 'rgba(0,0,0,.75)' }} />
                </div>
            );
        }

        return (
            <FadeInSection key={friword.id}>
                <div className={`data-node-${friword.id}`} style={{ marginBottom: 5 }}>
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%', height: 10, backgroundColor: 'rgba(0,0,0,.075)' }}></div>
                        <Card
                            bordered={false}
                            // loading={this.props.loading}
                            bodyStyle={{ padding: 10, opacity: this.props.loading ? .1 : 1 }}>
                            <Meta
                                avatar={
                                    <Avatar
                                        src={friword.gender == 'female' ? 'https://image.flaticon.com/icons/svg/590/590083.svg' : 'https://image.flaticon.com/icons/svg/921/921071.svg'}
                                        size={'small'}
                                        shape={'circle'}
                                        style={{ width: 30, height: 30, borderRadius: 15 }}
                                    />
                                }
                                title={
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>
                                            { friword.title }
                                        </span>
                                    </div>
                                }
                                description={friword.text}
                            />

                            <span style={{ display: 'block', marginTop: 5, fontSize: 12, textAlign: 'right' }}>{ moment(friword.created_at).fromNow() }</span>
                            { friword && friword.user_alias &&
                                <span style={{ display: 'block', marginTop: 5, fontSize: 12, textAlign: 'right' }}>por <i>@{ friword.user_alias }</i></span>
                            }

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, marginBottom: 20 }}>
                                <ParticleEffectButton
                                    color='#008bdb'
                                    duration={250}
                                    type={'rectangle'}
                                    particlesAmountCoefficient={1}
                                    oscillationCoefficient={5}
                                    hidden={this.state.hideLikeBtn}>
                                    <div
                                        onClick={this.onLike}
                                        style={{ display: 'flex', flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#008bdb', width: 100, height: 30, borderRadius: 10, marginRight: 10, cursor: 'pointer', opacity: (this.props.likes > 0 ? 1 : .5) }}>
                                        <Icons.LikeOutlined style={{ color: 'white' }} />
                                        <span style={{ color: 'white', marginLeft: 5 }}>{ this.props.likes }</span>
                                    </div>
                                </ParticleEffectButton>

                                <ParticleEffectButton
                                    color='#ff2452'
                                    duration={250}
                                    type={'rectangle'}
                                    particlesAmountCoefficient={1}
                                    oscillationCoefficient={5}
                                    hidden={this.state.hideDislikeBtn}>
                                    <div
                                        onClick={this.onDislike}
                                        style={{ display: 'flex', flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff2452', width: 100, height: 30, borderRadius: 10, cursor: 'pointer', opacity: (this.props.dislikes > 0 ? 1 : .5) }}>
                                        <Icons.DislikeOutlined style={{ color: 'white' }} />
                                        <span style={{ color: 'white', marginLeft: 5 }}>{ this.props.dislikes }</span>
                                    </div>
                                </ParticleEffectButton>
                            </div>

                            { this.state.showComments && friword.comments != null && friword.comments.length > 0 && friword.comments.map((e) => {
                                return (
                                    <FriwordComment
                                        comment={e}
                                    />
                                );
                            })}

                            { this.state.isLoadingComments && (!friword.comments || !friword.comments.length) &&
                                <Icons.LoadingOutlined style={{ fontSize: 24, color: '#ff306f', marginTop: 10 }} spin />
                            }

                            { !this.state.isLoadingComments && !this.state.showComments && friword.comments_qty > 0 &&
                                <a
                                    onClick={() => {
                                        this.setState({
                                            isLoadingComments: true,
                                            showComments: true
                                        });
                                        this.props.onRequestComments();
                                    }}
                                    style={{ display: 'block', marginLeft: 0, marginTop: 20, fontWeight: 500 }}>
                                    Ver { friword.comments_qty } comentarios
                                </a>
                            }

                            { this.state.canLeaveComment &&
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <div style={{ height: 50 }}>
                                        <Avatar
                                            src="https://image.flaticon.com/icons/svg/402/402256.svg"
                                            size={'small'}
                                            shape={'circle'}
                                            style={{ width: 30, height: 30, borderRadius: 15 }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flex: 1 }}>
                                        <Form
                                            name="post_comment"
                                            style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
                                            <Form.Item
                                                name="comment"
                                                rules={[{ required: true, message: 'Ingresa un comentario' }]}>
                                                <Input
                                                    suffix={sendCommentSuffix}
                                                    placeholder="Deja tu comentario"
                                                    onChange={(evt) => {
                                                        this.setState({ comment: evt.target.value });
                                                    }}
                                                    style={{ borderRadius : 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', height: 40 }}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            }

                            {/*<div style={{ width: '100%' }}>
                                <Button
                                    onClick={() => {
                                        this.setState({ isCreating : true });
                                    }}
                                    type="primary"
                                    icon={<Icons.PlusOutlined />}
                                    size={20}
                                    style={{ display: 'flex', width: 'auto', marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    Dejar comentario
                                </Button>
                            </div>*/}

                        </Card>
                    </div>
                </div>
            </FadeInSection>
        )
    }
};