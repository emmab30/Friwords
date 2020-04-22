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

export default class MemeGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div className={`meme-generator`}>
                <p>hola</p>
            </div>
        )
    }
};