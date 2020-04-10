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

// Animations
import * as animationData from '../assets/animations/like.json'

// Modules
import Lottie from 'react-lottie';
import moment from 'moment';
import 'moment/locale/es';
import * as Icons from '@ant-design/icons';
import { Spin } from 'antd';
import ReadMore from '@crossfield/react-read-more';

// Services
import * as Services from '../services'

import '../App.css';

const { Meta } = Card;
const { TextArea } = Input;
const { Option, getMentions } = Mentions;
const MAX_CHARACTERS_FOR_TRUNCATE = 80;

export default class FriwordImageLightbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            visible: false
        };
    }

    componentDidMount() {
        if(this.props.url != null) {
            this.setState({ url : this.props.url });
        }

        if(this.props.visible != null) {
            this.setState({ visible : this.props.visible });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.url != null) {
            this.setState({ url : nextProps.url });
        }

        if(nextProps.visible != null) {
            this.setState({ visible : nextProps.visible });
        }
    }

    render() {
        const {
            url,
            visible
        } = this.state;

        if(!url || !visible)
            return null;

        return (
            <div className={`image-lightbox`}>
                <img
                    src={url}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                <Button
                    onClick={() => {
                        this.props.onDismiss()
                    }}
                    type="primary"
                    style={{ display: 'flex', width: '90%', margin: '0 auto', justifyContent: 'center', alignItems: 'center', height: 40, marginTop: 20 }}>
                    Cerrar
                </Button>
            </div>
        )
    }
};