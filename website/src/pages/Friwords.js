import React from 'react';
import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button, Typography, notification } from 'antd';
import Lottie from 'react-lottie';
import * as Icons from '@ant-design/icons';
import * as animationLoadingData from '../assets/animations/load.json'
import _ from 'lodash';
import CountUp from 'react-countup';
import ScrollManager from '../utils/ScrollManager'
import '../App.css';

// Cards
import FriwordCreatePost from '../components/FriwordCreatePost';
import FriwordCard from '../components/FriwordCard';

// Services
import * as Services from '../services'

const { Option } = Select;
const { Title } = Typography;

export default class Friwords extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friwords: [],
            isCreating: false,
            isLoading: true,
            hasUpdates: false,
            previousOnlineUsers: 132,
            newOnlineUsers: 132,
            updateListText: 'Actualizar',
            user: null
        };
    }

    componentDidMount() {
        this.getFriwords();

        setInterval(() => {
            if(this.state.friwords && this.state.friwords.length > 0) {
                Services.Friwords.hasUpdatesAvailable(_.first(this.state.friwords).id, (data) => {
                    if(data.success) {
                        this.setState({ hasUpdates : data.hasUpdates });
                    }
                });
            }
        }, 10000);

        this.getUsersOnline();
        setInterval(this.getUsersOnline, 10000);

        Services.firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });

        Services.firebase.auth().onAuthStateChanged((user, err) => {
            if (user) {
                // User is signed in.
                let userState = {
                    type: 'anonymous',
                    uid: user.uid
                };
                this.setState({ user: userState });

                Services.Auth.signInAnonymously(userState, (data) => {
                    if(data.success){
                        this.setState({ user : data.user });
                    }
                }, (err) => {
                    // Do nothing
                });
            }
        });
    }

    getUsersOnline = () => {
        let onlineUsers = this.state.previousOnlineUsers;
        let offsetIncrement = 5;
        let operator = Math.random() < 0.5 ? 1 : -1;
        let newUsers = (onlineUsers + ((Math.floor(Math.random() * offsetIncrement) + 1) * operator));

        this.setState({
            newOnlineUsers: newUsers,
            previousOnlineUsers: onlineUsers
        });
    }

    getFriwords = () => {
        this.getUsersOnline()
        this.setState({ isLoading : true, hasUpdates: false });
        Services.Friwords.getFriwords((data) => {

            // Check those which have comments. If they have comments loaded, then we need to pull the new comments for those
            let promises = [];
            let friwords = [];
            for(var idx in data.friwords) {
                const friword = data.friwords[idx];
                if(_.some(this.state.friwords, (e) => e.id == friword.id && e.comments && e.comments.length > 0)) {
                    console.log(`Setting promises`);
                    promises.push(new Promise((resolve, reject) => {
                        Services.Friwords.getFriwordById(friword.id, (friword) => {
                            if(friword.success) {
                                console.log("Friword a pushear", friword);
                                friwords.push(friword.friword);
                                resolve();
                            } else {
                                friwords.push(friword.friword);
                                resolve();
                            }
                        }, (err) => {
                            friwords.push(friword.friword);
                            resolve();
                        });
                    }));
                } else {
                    friwords.push(friword);
                }
            }

            Promise.all(promises).then((info) => {
                let ordered = _.orderBy(friwords, ['created_at'], ['desc'])
                this.setState({
                    isLoading : false,
                    friwords: ordered
                });
            });
        }, (err) => {
            alert(`Estamos teniendo algunos problemas en este momento. Refresca la página en unos segundos.`);
            this.setState({ isLoading : false });
        });
    }

    getFriwordById = (id) => {
        Services.Friwords.getFriwordById(id, (data) => {
            if(data.success) {
                let index = _.findIndex(this.state.friwords, (e) => e.id == data.friword.id);
                let friwords = this.state.friwords;
                friwords[index] = data.friword;
                this.setState({ friwords });
            }
        }, (err) => {
            // Do nothing
        });
    }

    render() {
        const { friwords } = this.state;
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationLoadingData
        };

        return (
            <div className="friwords-container">

                <ScrollManager scrollKey="friwords-list" />

                <div style={{ width: '100%', height: 60, display: 'flex', flexDirection: 'row', position: 'fixed', top: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, backgroundColor: 'white', zIndex: 9999 }}>
                    <div
                        style={{ height: 60, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 10, cursor: 'pointer', zIndex: 9999, borderLeft: '2px solid rgba(0,0,0,.05)', borderBottom: '2px solid rgba(0,0,0,.05)' }}>
                        <span style={{ fontWeight: 500, fontSize: '0.75em' }}>{ this.state.user && this.state.user.alias ? `@${this.state.user.alias}` : '-' }</span>
                    </div>
                    <div
                        style={{ height: 60, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 10, cursor: 'pointer', zIndex: 9999, borderLeft: '2px solid rgba(0,0,0,.05)', borderBottom: '2px solid rgba(0,0,0,.05)' }}>
                        <CountUp
                            start={this.state.previousOnlineUsers}
                            end={this.state.newOnlineUsers}
                        />
                        <img
                            style={{ width: 30, height: 30, marginLeft: 10, opacity: .5 }}
                            src="https://image.flaticon.com/icons/svg/745/745205.svg" />
                    </div>
                    <div
                        onClick={this.getFriwords}
                        style={{ height: 60, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#25b864', cursor: 'pointer', zIndex: 9999, borderBottomRightRadius: 10, borderLeft: '2px solid rgba(0,0,0,.05)', borderBottom: '2px solid rgba(0,0,0,.05)', opacity: this.state.hasUpdates ? 1 : .6 }}>
                        <span style={{ fontWeight: 500, fontSize: '1.2em', color: 'white' }}>{ this.state.isLoading ? 'Actualizando..' : 'Actualizar' }</span>
                        <img
                            style={{ width: 30, height: 30, marginLeft: 10 }}
                            src="https://image.flaticon.com/icons/svg/1688/1688988.svg" />
                    </div>
                </div>

                <section style={{ textAlign: 'center', marginTop: 80, marginBottom: 20 }}>
                    <Title level={2} className="Title">
                        Friwords
                    </Title>
                </section>

                <div className="scroll-container">
                    <FriwordCreatePost
                        isVisible={this.state.isCreating}
                        onRequestClose={() => {
                            this.setState({ isCreating : false });
                        }}
                        user={this.state.user}
                        onCreated={(friword) => {
                            this.setState({ isCreating : false });

                            this.getFriwords();
                            notification.open({
                                message: <Icons.HeartTwoTone twoToneColor="#eb2f96" />,
                                description:
                                    'Tu friword fue publicado exitosamente',
                            });
                        }}
                    />

                    <div style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            onClick={() => {
                                this.setState({ isCreating : true });
                            }}
                            type="primary"
                            icon={<Icons.PlusOutlined />}
                            style={{ display: 'flex', width: '80%', margin: '0 auto', marginBottom: 20, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                            Escribir algo
                        </Button>
                    </div>

                    { friwords && friwords.map((e, index) => (
                        <FriwordCard
                            loading={this.state.isLoading}
                            friword={e}
                            comments={e.comments}
                            likes={e.likes_qty}
                            dislikes={e.dislikes_qty}
                            commentsQty={e.comments_qty}
                            user={this.state.user}
                            onLike={() => {
                                Services.Friwords.likeById(e.id, (success) => {
                                    setTimeout(() => {
                                        this.getFriwordById(e.id);
                                    }, 500);
                                });
                            }}
                            onDislike={() => {
                                Services.Friwords.dislikeById(e.id, (success) => {
                                    setTimeout(() => {
                                        this.getFriwordById(e.id);
                                    }, 500);
                                });
                            }}
                            onRequestComments={() => {
                                this.getFriwordById(e.id);
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }
};