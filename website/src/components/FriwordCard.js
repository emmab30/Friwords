import React from 'react';
import {
    Row,
    Col,
    Card,
    Avatar,
    Button,
    Form,
    Input,
    notification,
    Mentions,
    Timeline
} from 'antd';

// Components
import FriwordComment from './FriwordComment';
import FadeInSection from './FadeInSection'

// Animations
import * as animationData from '../assets/animations/like.json'

// Modules
import Lottie from 'react-lottie';
import moment from 'moment';
import 'moment/locale/es';
import * as Icons from '@ant-design/icons';
import { Spin } from 'antd';
import ParticleEffectButton from 'react-particle-effect-button'

// Services
import * as Services from '../services'

import '../App.css';

const { Meta } = Card;
const { TextArea } = Input;
const { Option, getMentions } = Mentions;

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
            mentions: [],

            // False both
            hasDisliked: false,
            hasLiked: false
        };
    }

    componentDidMount() {
        // Get possible mentions
        if(this.props.user != null) {
            Services.Friwords.getPossibleMentionsByFriwordId(this.props.friword.id, (data) => {
                if(data.success) {
                    this.setState({ mentions : data.mentions });
                }
            }, (err) => {
                // Do nothing
            });
        }
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
        if(this.props.user == null){
            notification.open({
                className: 'error',
                message: 'Oops',
                description: 'No se pudo dar like. Debes ingresar con tu alias para hacer esto',
            });
            return;
        } else if(this.state.hasLiked || this.state.hasDisliked) {
            return;
        }

        this.setState({ hideLikeBtn : true, hasLiked : true });
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
        const { mentions } = this.state;

        let sendCommentSuffix = (
            <div
                onClick={() => {

                    if(this.props.user == null) {
                        notification.open({
                            className: 'error',
                            message: 'Ingresa primero',
                            description:
                                'Ingresa o crea tu alias para dejar comentarios',
                        });
                        return;
                    }

                    // Create comment
                    if(!this.state.comment || this.state.comment.length < 2) {
                        notification.open({
                            className: 'error',
                            message: 'El comentario..',
                            description:
                                'A tu comentario le falta un poco de magia. Complétalo',
                        });
                        return;
                    }

                    this.setState({ isSendingComment : true });
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
                            isSendingComment: false,
                            showComments: true
                        });

                        notification.open({
                            className: 'success',
                            message: <Icons.HeartTwoTone twoToneColor="#eb2f96" />,
                            description: 'Tu comentario ya está visible',
                        });

                        if(this.props.onPostedComment)
                            this.props.onPostedComment();
                    }, (err) => {
                        console.log(err);
                        // Do nothing
                    });
                }}
                style={{ backgroundColor: 'transparent', padding: 0, marginTop: 0, display: 'flex', flex: 1 }}>
                <a style={{ fontWeight: 800, padding: 15 }}>Enviar</a>
                {/*<Icons.SendOutlined style={{ color: 'rgba(0,0,0,.75)' }} />*/}
            </div>
        );

        if(this.state.isSendingComment) {
            sendCommentSuffix = (
                <div style={{ backgroundColor: 'white', padding: 0, marginTop: 5 }}>
                    <Icons.SendOutlined spin style={{ color: 'rgba(0,0,0,.75)' }} />
                </div>
            );
        }

        let isMale = friword && friword.user && friword.user.gender == 'male';
        let isFemale = friword && friword.user && friword.user.gender == 'female';
        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: animationData.default,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return (
            <FadeInSection key={friword.id}>
                <div className={`data-node-${friword.id}`}>
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%', height: 5, backgroundColor: 'rgba(0,0,0,.025)' }}></div>
                        <Card
                            bordered={false}
                            // loading={this.props.loading}
                            bodyStyle={{ padding: 10, opacity: this.props.loading ? .1 : 1 }}>
                            <Meta
                                avatar={
                                    <Avatar
                                        src={friword && friword.user && friword.user.gender == 'female' ? 'https://image.flaticon.com/icons/svg/2284/2284897.svg' : 'https://image.flaticon.com/icons/svg/2284/2284900.svg'}
                                        size={'large'}
                                        style={{ borderRadius: 0, width: 30, height: 30 }}
                                    />
                                }
                                title={
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <span>
                                            { `${friword.text.substring(0, 30)}...` }
                                        </span>
                                    </div>
                                }
                                description={
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9em' }}>{ `${friword.text}` }</span>
                                    </div>
                                }
                            />

                            <span style={{ display: 'block', marginTop: 10, fontSize: 10, textAlign: 'right' }}>{ moment(friword.created_at).fromNow() }</span>

                            { friword && friword.user_alias &&
                                <span style={{ display: 'block', marginTop: 0, fontSize: 10, textAlign: 'right' }}>por <span style={{ color: '#25b864', fontWeight: 600 }}>@{ friword.user_alias }</span></span>
                            }

                            <div
                                onClick={this.onLike}
                                style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                <Lottie
                                    options={defaultOptions}
                                    autoplay={false}
                                    height={50}
                                    width={32}
                                    isStopped={!friword.liked}
                                />
                                <span style={{ color: '#f87676', marginLeft: 5, fontWeight: 800 }}>{ this.props.likes } like{this.props.likes > 1 ? 's' : ''}</span>
                            </div>

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
                                    style={{ display: 'block', marginLeft: 0, marginTop: 0, marginBottom: 10, marginLeft: 7, fontWeight: 400, textDecoration: 'underline' }}>
                                    Ver { friword.comments_qty } comentario{friword.comments_qty > 1 ? 's' : ''}
                                </a>
                            }

                            { friword.comments != null && friword.comments.length > 0 && this.state.showComments &&
                                <a
                                    onClick={() => {
                                        this.setState({
                                            isLoadingComments: false,
                                            showComments: false
                                        });
                                    }}
                                    style={{ display: 'block', marginLeft: 0, marginBottom: 15, fontWeight: 500 }}>
                                    Ocultar comentarios
                                </a>
                            }

                            <div style={{ marginLeft: 5 }}>
                                <Timeline>
                                    { this.state.showComments && friword.comments != null && friword.comments.length > 0 && friword.comments.map((e, index) => {
                                        return (
                                            <FriwordComment
                                                key={`comment_${e.id}`}
                                                comment={e}
                                                onLikeComment={(comment) => {
                                                    if(this.props.user != null) {
                                                        Services.Friwords.likeCommentById(comment.id, (data) => {
                                                            this.props.refreshFriword();
                                                        }, (err) => {
                                                            this.props.refreshFriword();
                                                        });
                                                    } else {
                                                        notification.open({
                                                            className: 'error',
                                                            message: 'Oops',
                                                            description: 'No se pudo dar like. Debes ingresar con tu alias para hacer esto',
                                                        });
                                                        return;
                                                    }
                                                }}
                                            />
                                        );
                                    })}
                                </Timeline>
                            </div>

                            { this.state.canLeaveComment &&
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0, marginBottom: 0 }}>
                                    <div style={{ display: 'flex', flex: 1 }}>
                                        <Form
                                            name="post_comment"
                                            style={{ width: '100%', paddingLeft: 0, paddingRight: 0, position: 'relative' }}>
                                            <Form.Item
                                                name="comment"
                                                rules={[{ required: true, message: 'Ingresa un comentario' }]}
                                                style={{ marginBottom: 0, paddingBottom: 0 }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Mentions
                                                        onChange={(comment) => {
                                                            this.setState({ comment });
                                                        }}
                                                        className="input-comment"
                                                        placeholder="Deja tu comentario"
                                                        autoSize={{ minRows: 1, maxRows: 3 }}
                                                        maxLength={750}>
                                                        { mentions && mentions.map((e) => {
                                                            return (
                                                                <Option value={e.alias}>{e.alias}</Option>
                                                            );
                                                        })}
                                                    </Mentions>

                                                    { sendCommentSuffix }
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            }

                            { this.props.user == null &&
                                <div style={{ width: '100%', backgroundColor: '#25b864', padding: 5, marginTop: 10, borderRadius: 2 }}>
                                    <span style={{ display: 'block', fontSize: 12, fontWeight: 600, textAlign: 'left', color: 'white' }}>Creá tu alias anónimo para dejar un comentario</span>
                                </div>
                            }

                        </Card>
                    </div>
                </div>
            </FadeInSection>
        )
    }
};