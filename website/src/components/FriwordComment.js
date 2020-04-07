import React from 'react';
import {
    Row,
    Col,
    Card,
    Avatar,
    Timeline
} from 'antd';

import Lottie from 'react-lottie';
import moment from 'moment';
import 'moment/locale/es';
import * as Icons from '@ant-design/icons';

// Animations
import * as animationData from '../assets/animations/like.json'

import '../App.css';

const { Meta } = Card;
const RANDOM_COLORS = ['#f69600', '#f66200', '#edf600', '#00f6a8', '#00b9f6', '#1700f6', '#8b00f6', '#f600e2', '#f60057']

export default class FriwordComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomColor: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)],
            isPlayingAnimation: false
        };

        this.heartAnimation = null;
    }

    onLike = () => {
        if(this.props.onLikeComment)
            this.props.onLikeComment(this.props.comment);
    }

    componentDidMount() {
        const { comment } = this.props;

        if(comment.liked == true) this.playHeart();
        else this.stopHeart();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.comment) {

            if(nextProps.comment.liked == true) this.playHeart();
            else this.stopHeart();
        } else {
            this.stopHeart()
        }
    }

    playHeart = () => {
        this.setState({ isPlayingAnimation : true });
    }

    stopHeart = () => {
        this.setState({ isPlayingAnimation : false });
    }

    render() {
        const { comment } = this.props;
        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: animationData.default,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return (
            <Timeline.Item
                dot={
                    <div style={{ marginTop: 5, width: 10, height: 10, borderRadius: 5, backgroundColor: comment && comment.user && comment.user.gender == 'female' ? '#ff8b9a' : '#8baeff' }}></div>
                }>
                <div style={{ marginBottom: 0 }}>
                    {/*<div style={{ width: '95%', marginLeft: '2%', height: 3, backgroundColor: 'rgba(0,0,0,.005)', marginTop: 5, marginBottom: 0 }} />*/}
                    <div className={`custom-card`} style={{ width: '100%', padding: 5, marginBottom: 0, backgroundColor: 'white', borderRadius: 2 }}>
                        <Row gutter={24}>
                            <Col span={24} justify={'center'}>

                                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                                        { comment && comment.user_alias &&
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', flex: 1, marginBottom: 0, backgroundColor: 'white' }}>
                                                    <span style={{ display: 'block', marginTop: 0, fontSize: 13, textAlign: 'left', color: comment && comment.user && comment.user.gender == 'female' ? '#ff8b9a' : '#8baeff', fontWeight: 500 }}>@{ comment.user_alias }</span>
                                                </div>

                                                <div
                                                    onClick={this.onLike}
                                                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0, marginBottom: 0 }}>
                                                    <Lottie
                                                        ref={(e) => { this.heartAnimation = e; }}
                                                        options={defaultOptions}
                                                        height={20}
                                                        width={35}
                                                        isStopped={!this.state.isPlayingAnimation}
                                                    />
                                                    <span style={{ color: '#f87676', marginLeft: -5, fontWeight: 800, fontSize: '0.75em' }}>{ comment.likes_qty }</span>
                                                </div>
                                            </div>
                                        }

                                        <div style={{ width: 'auto', marginBottom: 0, backgroundColor: 'white' }}>
                                            <span style={{ display: 'block', marginTop: 2, marginBottom: 5, fontSize: 10, textAlign: 'left' }}>{ moment(comment.created_at).fromNow() }</span>
                                        </div>

                                        <span
                                            dangerouslySetInnerHTML={{ __html: comment.html }}
                                            style={{ color: 'rgba(0,0,0,.75)', fontSize: 13, fontFamily: 'Open Sans', marginLeft: 0, marginTop: 0, fontWeight: 400 }}></span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Timeline.Item>
        )
    }
};

function hexToRgbA(hex, opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + opacity + ')';
    }
    throw new Error('Bad Hex');
}