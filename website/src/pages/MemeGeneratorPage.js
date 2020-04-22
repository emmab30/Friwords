import React from 'react';
import axios from 'axios';
import {
    Input
} from 'antd'

// Services
import * as Services from '../services'
import _ from 'lodash';

import '../App.css';

var COLORS = [
    '#222',
    '#fff'
];

export default class MemeGeneratorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memeTemplates: [],
            memeSelected: null,
            boxText1: null,
            boxText2: null,
            textColor1: COLORS[0],
            textColor2: COLORS[0]
        };
    }

    componentDidMount() {
        axios.get('https://api.imgflip.com/get_memes').then((response) => {
            if(response.status == 200) {
                let twoBoxes = _.filter(response.data.data.memes, (e) => e.box_count == 2);
                this.setState({ memeTemplates: twoBoxes });
            }
        });

        setTimeout(() => {
            axios.post('https://api.imgflip.com/caption_image', {
                template_id: this.state.memeTemplates[0].id,
                username: 'eabuslaiman',
                password: 'iloveyou30',
                text0: 'Algo aca',
                text1: 'Algo por aca',
                font: 'impact'
            }).then((response) => {
                console.log(response);
            }).catch((err) => {
                console.log(err);
            });
        }, 5000);
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {
            memeTemplates
        } = this.state;

        if(this.state.memeSelected)
            return this.renderConfiguration();


        return (
            <div className={`meme-generator`}>
                <h3 style={{ marginBottom: 10, fontSize: 20, textAlign: 'center', marginBottom: 10 }}>Selecciona el meme</h3>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    { memeTemplates && memeTemplates.length > 0 && memeTemplates.map((e) => {
                        return (
                            <div
                                onClick={() => {
                                    this.setState({ memeSelected : e });
                                }}
                                style={{ width: 170, height: 170, padding: 10, backgroundColor: '#222', marginRight: 10, marginBottom: 10 }}>
                                <div style={{ width: 150, height: 150, background: `url(${e.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'relative', padding: 0, display: 'flex', flexDirection: 'column' }}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    renderConfiguration() {
        let {
            memeSelected,
            boxText1,
            boxText2
        } = this.state;

        console.log(window.innerWidth)

        return (
            <div className={`meme-generator`}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 5, borderColor: 'rgba(0,0,0,.5)', marginBottom: 20 }}>
                    <div style={{ width: window.innerWidth, height: window.innerWidth, background: `url(${memeSelected.url})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', position: 'relative', padding: 0, display: 'flex', flexDirection: 'column' }}>
                        { boxText1 &&
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <h2 style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: this.state.textColor1, padding: 5, borderRadius: 10, padding: 10 }} dangerouslySetInnerHTML={{ __html: boxText1 }}></h2>
                            </div>
                        }

                        { boxText2 &&
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <h2 style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: this.state.textColor2, padding: 5, borderRadius: 10, padding: 10 }}>{ boxText2 }</h2>
                            </div>
                        }
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20, paddingLeft: 5, paddingRight: 5 }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Input
                                onChange={(evt) => {
                                    boxText1 = evt.target.value;
                                    boxText1 = boxText1.replace(/\*/g, "&nbsp;");
                                    this.setState({ boxText1 })
                                }}
                                style={{ width: '100%', margin: '0 auto' }}
                                placeholder="Texto 1"
                            />
                            <div style={{ marginLeft: 5, marginRight: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                { COLORS.map((e) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                this.setState({ textColor1 : e })
                                            }}
                                            style={{ width: 16, height: 16, borderRadius: 8, marginLeft: 10, border: '2px solid #222', backgroundColor: e }}>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                            <Input
                                onChange={(evt) => {
                                    boxText2 = evt.target.value;
                                    boxText2 = boxText2.replace('*', ' ');

                                    this.setState({ boxText2 })
                                }}
                                style={{ width: '100%', margin: '0 auto' }}
                                placeholder="Texto 1"
                            />
                            <div style={{ marginLeft: 5, marginRight: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                { COLORS.map((e) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                this.setState({ textColor2 : e })
                                            }}
                                            style={{ width: 16, height: 16, borderRadius: 8, marginLeft: 10, border: '2px solid #222', backgroundColor: e }}>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};