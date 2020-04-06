import React from 'react';
import {
    Row,
    Col,
    Card,
    Avatar
} from 'antd';

import moment from 'moment';
import 'moment/locale/es';
import * as Icons from '@ant-design/icons';

import '../App.css';

const { Meta } = Card;
const RANDOM_COLORS = ['#f69600', '#f66200', '#edf600', '#00f6a8', '#00b9f6', '#1700f6', '#8b00f6', '#f600e2', '#f60057']

export default class FriwordComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomColor: RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]
        };
    }
    render() {
        const { comment } = this.props;

        return (
            <div style={{ marginBottom: 15 }}>
                {/*<div style={{ width: '95%', marginLeft: '2%', height: 3, backgroundColor: 'rgba(0,0,0,.005)', marginTop: 5, marginBottom: 0 }} />*/}
                <div className={`custom-card ${comment && comment.user && comment.user.gender == 'female' ? 'female' : 'male'}`} style={{ width: '100%', paddingLeft: 10, marginBottom: 10, backgroundColor: 'rgba(0,0,0,.02)', borderRadius: 1 }}>
                    <Row gutter={24}>
                        <Col span={24} justify={'center'}>
                            <span
                                dangerouslySetInnerHTML={{ __html: comment.html }}
                                style={{ color: 'rgba(0,0,0,.75)', fontSize: 12, fontFamily: 'Open Sans', marginLeft: 0, marginTop: 5, fontWeight: 400 }}></span>

                            { false && comment && comment.user && comment.user.country_code != null &&
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <img
                                        style={{ width: 20 }}
                                        src={`https://www.countryflags.io/${comment.user.country_code}/shiny/64.png`}
                                    />
                                </div>
                            }

                            { comment && comment.user_alias &&
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 0, marginTop: 15, padding: 5 }}>
                                    <span style={{ display: 'flex', flex: 0, marginTop: 0, fontSize: 12, textAlign: 'left' }}><span style={{ color: `${comment && comment.user && comment.user.gender == 'male' ? '#3483db' : '#ff8b9a'}`, fontWeight: 600 }}>@{ comment.user_alias }</span></span>
                                    { false && comment && comment.user && comment.user.gender != null &&
                                        <Avatar
                                            src={comment.user.gender == 'female' ? 'https://image.flaticon.com/icons/svg/2284/2284897.svg' : 'https://image.flaticon.com/icons/svg/2284/2284900.svg'}
                                            size={'small'}
                                            style={{ borderRadius: 0, width: 15, height: 15, marginLeft: 5, opacity: .25 }}
                                        />
                                    }
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
            </div>
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