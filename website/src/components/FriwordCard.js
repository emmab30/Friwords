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
        Services.Friwords.getPossibleMentionsByFriwordId(this.props.friword.id, (data) => {
            if(data.success) {
                this.setState({ mentions : data.mentions });
            }
        }, (err) => {
            // Do nothing
        });
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

        return (
            <FadeInSection key={friword.id}>
                <div className={`data-node-${friword.id}`} style={{ marginBottom: 20 }}>
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

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, marginBottom: 20 }}>
                                <ParticleEffectButton
                                    color='rgb(37, 184, 100)'
                                    duration={250}
                                    type={'rectangle'}
                                    particlesAmountCoefficient={1}
                                    oscillationCoefficient={5}
                                    hidden={this.state.hideLikeBtn}>
                                    <div
                                        onClick={this.onLike}
                                        style={{ display: 'flex', flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#25b864', width: 60, height: 30, borderRadius: 2, marginRight: 10, cursor: 'pointer', opacity: (this.props.likes > 0 ? 1 : .75) }}>
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
                                        style={{ display: 'flex', flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff2452', width: 60, height: 30, borderRadius: 2, cursor: 'pointer', opacity: (this.props.dislikes > 0 ? 1 : .75) }}>
                                        <Icons.DislikeOutlined style={{ color: 'white' }} />
                                        <span style={{ color: 'white', marginLeft: 5 }}>{ this.props.dislikes }</span>
                                    </div>
                                </ParticleEffectButton>
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
                                    style={{ display: 'block', marginLeft: 0, marginTop: 5, fontWeight: 500 }}>
                                    Ver { friword.comments_qty } comentarios
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
                                    { this.state.showComments && friword.comments != null && friword.comments.length > 0 && friword.comments.map((e) => {
                                        return (
                                            <FriwordComment
                                                comment={e}
                                            />
                                        );
                                    })}
                                </Timeline>
                            </div>

                            { this.state.canLeaveComment &&
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
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