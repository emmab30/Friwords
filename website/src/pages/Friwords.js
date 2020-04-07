import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Slider,
    Button,
    Typography,
    Tabs,
    notification,
    Spin
} from 'antd';

import axios from 'axios';
import Lottie from 'react-lottie';
import * as Icons from '@ant-design/icons';
import * as animationLoadingData from '../assets/animations/load.json'
import _ from 'lodash';
import CountUp from 'react-countup';
import ScrollManager from '../utils/ScrollManager'

// Cards
import FriwordWelcome from '../components/FriwordWelcome';
import FriwordLogin from '../components/FriwordLogin';
import FriwordCreatePost from '../components/FriwordCreatePost';
import FriwordCard from '../components/FriwordCard';
import FriwordsNotificationsPanel from '../components/FriwordsNotificationsPanel';

// Services
import * as Services from '../services'

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs;

export default class Friwords extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friwords: [],
            filters: {
                listing_mode : 1,
                page: 0
            },
            tabActiveKey: '1',
            isViewingNotifications: false,
            isWelcome: false,
            isCreating: false,
            isLoggingIn: false,
            isLoading: true,
            hasUpdates: false,
            /*previousOnlineUsers: 132,
            newOnlineUsers: 132,*/
            user: null,
            currentFriwordId: null
        };
    }

    componentDidMount() {
        this.getFriwords();
        this.getMe();

        setInterval(this.getMe, 10000);
    }

    getMe = () => {
        Services.Auth.getMe((data) => {
            if(data.success) {
                if(data.user != null) {
                    this.setState({ user: data.user });

                    Services.Auth.user = data.user;

                    if(data.user && !data.user.country_code && !data.user.ip) {
                        const apiKey = '45c816eed2d04a8b96e59ff177c609af';
                        axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&fields=geo&output=json`).then((data) => {
                            if(data && data.data) {
                                const ipInfo = data.data;
                                Services.Auth.updateMe({
                                    country_name: ipInfo && ipInfo.country_name,
                                    country_code: ipInfo && ipInfo.country_code2,
                                    ip: ipInfo && ipInfo.ip
                                }, (success) => {
                                    if(success.success) {
                                        this.setState({ user : success.user });
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });
    }

    /*getUsersOnline = () => {
        let onlineUsers = this.state.previousOnlineUsers;
        let offsetIncrement = 5;
        let operator = Math.random() < 0.5 ? 1 : -1;
        let newUsers = (onlineUsers + ((Math.floor(Math.random() * offsetIncrement) + 1) * operator));

        this.setState({
            newOnlineUsers: newUsers,
            previousOnlineUsers: onlineUsers
        });
    }*/

    getFriwords = () => {
        // this.getUsersOnline()
        this.setState({ isLoading : true, hasUpdates: false });
        Services.Friwords.getFriwordsByFilter(this.state.filters, (data) => {

            // Check those which have comments. If they have comments loaded, then we need to pull the new comments for those
            let promises = [];
            let friwords = [];
            for(var idx in data.friwords) {
                const friword = data.friwords[idx];
                if(_.some(this.state.friwords, (e) => e.id == friword.id && e.comments && e.comments.length > 0)) {
                    promises.push(new Promise((resolve, reject) => {
                        Services.Friwords.getFriwordById(friword.id, (friword) => {
                            if(friword.success) {
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

                // If there are friwords on the state, we need to append this list (since it's a new page)
                if(this.state.friwords && this.state.friwords.length > 0 && this.state.filters.page > 0)
                    ordered = this.state.friwords.concat(ordered);

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

    getFriwordById = (id, displayOnlyThis = false) => {
        Services.Friwords.getFriwordById(id, (data) => {
            if(data.success) {
                if(displayOnlyThis) {
                    let index = _.findIndex(this.state.friwords, (e) => e.id == data.friword.id);
                    let friwords = [data.friword];
                    this.setState({
                        friwords,
                        currentFriwordId: id,
                        isLoading: false
                    }, this.getMe);
                } else {
                    let index = _.findIndex(this.state.friwords, (e) => e.id == data.friword.id);
                    let friwords = this.state.friwords;
                    friwords[index] = data.friword;
                    this.setState({
                        friwords,
                        isLoading: false
                    });
                }
            }
        }, (err) => {
            // Do nothing
        });
    }

    refresh = () => {
        this.getFriwords();
        this.getMe();
    }

    isAuthenticated = () => {
        return Services.Auth.isAuthenticated();
    }

    render() {
        const {
            friwords,
            filters
        } = this.state;

        if(this.state.isWelcome) {
            return this.renderWelcome();
        }

        const hasNoticicationsUnread = this.state.user != null && this.state.user.unread_notifications > 0;

        return (
            <div className="friwords-container">
                <div style={{ width: '100%', height: 45, display: 'flex', flexDirection: 'row', position: 'fixed', top: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, backgroundColor: 'white', zIndex: 9999 }}>
                    <div
                        style={{ height: 45, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 0, borderBottomLeftRadius: 10, cursor: 'pointer', zIndex: 9999, borderLeft: '2px solid rgba(0,0,0,.05)', borderBottom: '2px solid rgba(0,0,0,.05)' }}>
                        <span style={{ fontWeight: 500, fontSize: '0.6em' }}>{ this.state.user && this.state.user.alias ? `@${this.state.user.alias}` : '-' }</span>
                        <a
                            style={{ textDecorationLine: 'underline', fontSize: '0.6em' }}
                            href="#"
                            onClick={() => {
                                if(this.isAuthenticated()) {
                                    this.setState({ isLoggingIn : true });
                                } else {
                                    this.setState({ isWelcome : true });
                                }
                            }}
                        >{ this.isAuthenticated() ? 'Cambiar' : 'Registrar alias' }</a>
                    </div>
                    <div
                        className="counter-online-users"
                        onClick={() => {
                            if(this.isAuthenticated()) {
                                this.setState({ isViewingNotifications : true });
                            } else {
                                this.setState({ isWelcome : true });
                            }
                        }}
                        style={{ height: 45, display: 'flex', flex: hasNoticicationsUnread ? 1 : 0, justifyContent: 'center', alignItems: 'center', backgroundColor: hasNoticicationsUnread ? '#fccf84' : 'white', borderTopLeftRadius: 0, cursor: 'pointer', zIndex: 9999, borderLeft: '2px solid rgba(0,0,0,.05)', borderBottom: '2px solid rgba(0,0,0,.05)', paddingLeft: 10, paddingRight: 10 }}>
                        <p style={{ fontWeight: 600, margin: 0, padding: 0, fontSize: '0.75em' }}>{ hasNoticicationsUnread ? `${this.state.user.unread_notifications} nueva${this.state.user.unread_notifications > 1 ? 's' : ''}` : 0 }</p>
                        <img
                            style={{ width: 20, height: 20, marginLeft: 5, opacity: 1 }}
                            src={`/img/bell-${hasNoticicationsUnread ? 'on' : 'off'}.png`} />
                    </div>
                    <div
                        onClick={this.refresh}
                        style={{ height: 45, display: 'flex', flex: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#25b864', cursor: 'pointer', zIndex: 9999, borderBottomRightRadius: 10, borderLeft: '0px solid rgba(0,0,0,.05)', borderBottom: '2px solid rgba(0,0,0,.2)', paddingLeft: 10, paddingRight: 10 }}>
                        <img
                            style={{ width: 25, height: 25, marginLeft: 0, opacity: this.state.isLoading ? .1 : 1 }}
                            src="/img/update.png" />
                    </div>
                </div>

                <section style={{ textAlign: 'center', marginTop: 80, marginBottom: 20 }}>
                    <Title level={2} className="Title">
                        Friwords
                    </Title>
                </section>

                <div className="scroll-container">
                    <FriwordsNotificationsPanel
                        isVisible={this.state.isViewingNotifications}
                        user={this.state.user}
                        onRequestClose={() => {
                            this.setState({ isViewingNotifications : false }, this.getMe);
                        }}
                        onClickNotification={(e) => {
                            if(e.redirect_to != null) {
                                if(e.redirect_to.indexOf('friword/') > -1) {
                                    this.setState({ isLoading : true, isViewingNotifications: false });
                                    this.getFriwordById(e.redirect_to.replace('friword/', ''), true);
                                }
                            }
                        }}
                    />

                    <FriwordLogin
                        isVisible={this.state.isLoggingIn}
                        onRequestClose={() => {
                            this.setState({ isLoggingIn : false });
                            /*if(!this.state.user || !this.state.user.is_configured) {
                                this.setState({ isWelcome : true });
                            }*/
                        }}
                        onLoggedIn={(user) => {
                            this.setState({ user, isLoggingIn: false }, this.refresh);
                        }}
                    />

                    <FriwordCreatePost
                        isVisible={this.state.isCreating}
                        onRequestClose={() => {
                            this.setState({ isCreating : false });
                        }}
                        user={this.state.user}
                        onCreated={(friword) => {
                            this.setState({ isCreating : false });

                            // Reset filters and then fetch the first page
                            filters.page = 0;
                            filters.listing_mode = 1;
                            this.setState({ filters, tabActiveKey: '1' }, this.refresh);
                            notification.open({
                                className: 'success',
                                message: <Icons.HeartTwoTone twoToneColor="#eb2f96" />,
                                description: 'Tu friword fue publicado exitosamente en la sección `Recientes`',
                            });
                        }}
                    />

                    { this.state.currentFriwordId != null && [
                        <div style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                onClick={() => {
                                    this.setState({ currentFriwordId: null }, this.refresh);
                                }}
                                type="primary"
                                icon={<Icons.RollbackOutlined />}
                                style={{ display: 'flex', width: '80%', margin: '0 auto', marginBottom: 20, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                                Volver atrás
                            </Button>
                        </div>,
                        <FriwordCard
                            loading={this.state.isLoading}
                            friword={this.state.friwords[0]}
                            comments={this.state.friwords[0].comments}
                            likes={this.state.friwords[0].likes_qty}
                            dislikes={this.state.friwords[0].dislikes_qty}
                            commentsQty={this.state.friwords[0].comments_qty}
                            user={this.state.user}
                            onLike={() => {
                                Services.Friwords.likeById(this.state.friwords[0].id, (success) => {
                                    setTimeout(() => {
                                        this.getFriwordById(this.state.friwords[0].id, true);
                                        this.getMe();
                                    }, 500);
                                });
                            }}
                            onRequestComments={() => {
                                this.getFriwordById(this.state.friwords[0].id, true);
                            }}
                            onPostedComment={this.getMe}
                        />
                    ]}

                    { this.state.currentFriwordId == null && [
                        <div style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                disabled={this.state.user == null}
                                onClick={() => {
                                    if(this.isAuthenticated()) {
                                        this.setState({ isCreating : true });
                                    } else {
                                        this.setState({ isWelcome : true });
                                    }
                                }}
                                type="primary"
                                icon={<Icons.PlusOutlined />}
                                style={{ display: 'flex', width: '80%', margin: '0 auto', justifyContent: 'center', alignItems: 'center', height: 40 }}>
                                Publicar friword
                            </Button>
                        </div>,
                        (this.state.user == null &&
                            <a
                                onClick={() => {
                                    this.setState({ isWelcome : true })
                                }}
                                style={{ display: 'block', textAlign: 'center', marginTop: 15, fontWeight: 600, marginRight: 0, textDecoration: 'underline' }}>
                                Registrá un alias para comentar y publicar nuevos Friwords
                            </a>
                        ),
                        <Tabs
                            style={{ marginTop: 20 }}
                            activeKey={this.state.tabActiveKey}
                            type={'card'}
                            onTabClick={(val) => {
                                if(val == 2) {
                                    filters.only_me = true;
                                    filters.page = 0;
                                } else {
                                    filters.only_me = false;
                                    filters.listing_mode = val;
                                    filters.page = 0;
                                }
                                this.setState({
                                    filters,
                                    tabActiveKey: val
                                }, this.getFriwords);
                            }}
                            defaultActiveKey={'1'}>
                            <TabPane
                                tab={
                                    <span>
                                        <Icons.HeartOutlined />
                                            Más destacados
                                        </span>
                                    }
                                key={'0'}>
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
                                                    this.getMe();
                                                }, 500);
                                            });
                                        }}
                                        onRequestComments={() => {
                                            this.getFriwordById(e.id);
                                        }}
                                        onPostedComment={this.getMe}
                                        refreshFriword={() => {
                                            this.getFriwordById(e.id, false);
                                        }}
                                    />
                                ))}

                                <Button
                                    onClick={() => {
                                        filters.page += 1;
                                        this.setState({ filters }, this.getFriwords);
                                    }}
                                    loading={this.state.isLoading}
                                    type="primary"
                                    icon={<Icons.ReloadOutlined />}
                                    style={{ display: 'flex', width: '80%', margin: '0 auto', marginBottom: 20, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                                    Cargar más
                                </Button>
                            </TabPane>

                            <TabPane
                                tab={
                                    <span>
                                        <Icons.FieldTimeOutlined />
                                            Recientes
                                        </span>
                                    }
                                key={'1'}>
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
                                        onRequestComments={() => {
                                            this.getFriwordById(e.id);
                                        }}
                                        onPostedComment={this.getMe}
                                        refreshFriword={() => {
                                            this.getFriwordById(e.id, false);
                                        }}
                                    />
                                ))}

                                <Button
                                    onClick={() => {
                                        filters.page += 1;
                                        this.setState({ filters }, this.getFriwords);
                                    }}
                                    type="primary"
                                    icon={<Icons.ReloadOutlined />}
                                    loading={this.state.isLoading}
                                    style={{ display: 'flex', width: '80%', margin: '0 auto', marginBottom: 20, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                                    Cargar más
                                </Button>
                            </TabPane>

                            <TabPane
                                tab={
                                    <span>
                                        <Icons.FieldTimeOutlined />
                                            Míos
                                        </span>
                                    }
                                key={'2'}>
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
                                        onRequestComments={() => {
                                            this.getFriwordById(e.id);
                                        }}
                                        onPostedComment={this.getMe}
                                        refreshFriword={() => {
                                            this.getFriwordById(e.id, false);
                                        }}
                                    />
                                ))}

                                <Button
                                    onClick={() => {
                                        filters.page += 1;
                                        this.setState({ filters }, this.getFriwords);
                                    }}
                                    type="primary"
                                    loading={this.state.isLoading}
                                    icon={<Icons.ReloadOutlined />}
                                    style={{ display: 'flex', width: '80%', margin: '0 auto', marginBottom: 20, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                                    Cargar más
                                </Button>
                            </TabPane>
                        </Tabs>
                    ]}

                    { this.state.isLoading &&
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Spin indicator={
                                <Icons.LoadingOutlined style={{ fontSize: 24 }} spin />
                            } />
                        </div>
                    }
                </div>
            </div>
        );
    }

    renderWelcome() {
        return (
            <div className="friwords-container">
                <FriwordWelcome
                    isVisible={this.state.isWelcome}
                    onStart={() => {
                        this.setState({ isWelcome : false }, this.getMe);
                        notification.open({
                            className: 'success',
                            message: <Icons.HeartTwoTone twoToneColor="#eb2f96" />,
                            description:
                                'Bienvenid@ a Friwords. Empieza leyendo y publicando',
                        });

                        setTimeout(() => {
                            this.getFriwords();
                        }, 3000);
                    }}
                    onRequestLogin={() => {
                        this.setState({ isLoggingIn : true, isWelcome: false });
                    }}
                />
            </div>
        );
    }
};