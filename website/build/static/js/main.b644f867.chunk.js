(this["webpackJsonpantd-demo"]=this["webpackJsonpantd-demo"]||[]).push([[0],{209:function(e,t,s){e.exports=s(434)},214:function(e,t,s){},287:function(e){e.exports=JSON.parse("{}")},433:function(e,t,s){},434:function(e,t,s){"use strict";s.r(t);var i={};s.r(i),s.d(i,"SetToken",(function(){return H})),s.d(i,"ApiService",(function(){return J})),s.d(i,"setBaseUrl",(function(){return Q})),s.d(i,"getBaseUrl",(function(){return G})),s.d(i,"encodeQueryData",(function(){return X}));var a=s(0),n=s.n(a),o=s(6),r=s.n(o),l=(s(214),s(186),s(119)),c=(s(76),s(35)),d=(s(221),s(204)),m=(s(66),s(20)),h=(s(67),s(19)),g=(s(149),s(81)),p=s(107),u=s.n(p),f=(s(241),s(442)),y=s(444),w=s(447),E=s(437),b=s(436),C=s(435),k=(s(287),s(91)),x=s.n(k),S=(s(288),s(207)),v=s(206),I=s(21),L=s.n(I);const T={data:new Map,get(e){return e&&this.data.get(e)||null},set(e,t){if(e)return this.data.set(e,t)}};class B extends n.a.Component{constructor(e){super(...arguments),this.connectScrollTarget=this.connectScrollTarget.bind(this),this._target=window}connectScrollTarget(e){this._target=e}restoreScrollPosition(e){e=e||this.props.scrollStore.get(this.props.scrollKey),this._target&&e&&L()(()=>{var t,s,i;t=this._target,s=e.x,i=e.y,t instanceof window.Window?t.scrollTo(s,i):(t.scrollLeft=s,t.scrollTop=i)})}saveScrollPosition(e){if(this._target){const t=function(e){if(e instanceof window.Window)return{x:e.scrollX,y:e.scrollY};return{x:e.scrollLeft,y:e.scrollTop}}(this._target);e=e||this.props.scrollKey,this.props.scrollStore.set(e,t)}}componentDidMount(){this.restoreScrollPosition()}UNSAFE_componentWillReceiveProps(e){this.props.scrollKey!==e.scrollKey&&this.saveScrollPosition()}componentDidUpdate(e){this.props.scrollKey!==e.scrollKey&&this.restoreScrollPosition()}componentWillUnmount(){this.saveScrollPosition()}render(){const e=this.props,t=e.children,s=void 0===t?null:t,i=Object(v.a)(e,["children"]);return s&&s(Object(S.a)({},i,{connectScrollTarget:this.connectScrollTarget}))}}B.defaultProps={scrollStore:T};s(99);var _=s(22),R=(s(65),s(36)),A=(s(74),s(33)),F=(s(170),s(54)),N=(s(171),s(34)),W=s(85),D=s.n(W);s(172),s(59);A.a.Meta;const j=["#f69600","#f66200","#edf600","#00f6a8","#00b9f6","#1700f6","#8b00f6","#f600e2","#f60057"];class V extends n.a.Component{constructor(e){super(e),this.state={randomColor:j[Math.floor(Math.random()*j.length)]}}render(){const e=this.props.comment;return n.a.createElement("div",{style:{marginBottom:15}},n.a.createElement("div",{style:{width:"95%",marginLeft:"2%",borderLeft:"4px solid ".concat(M(this.state.randomColor,.2)),paddingLeft:10,marginTop:0}},n.a.createElement(F.a,{gutter:24},n.a.createElement(N.a,{span:24,justify:"center"},e&&e.user_alias&&n.a.createElement("span",{style:{display:"block",marginTop:0,fontSize:10,textAlign:"left"}},n.a.createElement("span",{style:{color:"#25b864",fontWeight:600}},"@",e.user_alias)),n.a.createElement("span",{style:{color:"rgba(0,0,0,.75)",fontSize:12,fontFamily:"Open Sans",marginLeft:0,marginTop:5}},e.text),!1))))}}function M(e,t){var s;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(e))return 3==(s=e.substring(1).split("")).length&&(s=[s[0],s[0],s[1],s[1],s[2],s[2]]),"rgba("+[(s="0x"+s.join(""))>>16&255,s>>8&255,255&s].join(",")+","+t+")";throw new Error("Bad Hex")}var P=s(443),q=s(438),z=s(190),O=s.n(z),K="https://api.friwords.com/api/v1/",U=K;function H(e){localStorage.setItem("JWT_TOKEN",e),e}function J(e=15e3,t){t||(t={Accept:"application/json","Content-Type":"application/json"},localStorage.getItem("JWT_TOKEN")&&(t.Authorization="Bearer "+localStorage.getItem("JWT_TOKEN")));var s=u.a.create({baseURL:G(),timeout:e,headers:t});return s.interceptors.response.use(e=>e,e=>e),O()(s,{retries:5,retryDelay:e=>1e3*e}),s}function Q(e){U=null==e?K:e}function G(){return U}function X(e){let t=[];for(let s in e)t.push(encodeURIComponent(s)+"="+encodeURIComponent(e[s]));return t.join("&")}var Y={user:null,isAuthenticated:()=>null!=Y.user,register:function(e,t,s){J().post("auth/register",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},signInWithAlias:function(e,t,s){J().post("auth/sign_in",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},getMe:function(e,t){J().get("profile/me").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})},updateMe:function(e,t,s){J().post("profile/me",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},generateRandomAlias:function(e,t){J().get("auth/generate_alias").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})}},$=Y,Z={getFriwords:function(e,t){J().get("friwords").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})},getFriwordsByFilter:function(e,t,s){J().post("friwords/filter",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},getFriwordById:function(e,t,s){let i="friwords/".concat(e);J().get(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},likeById:function(e,t,s){let i="friwords/".concat(e,"/like");J().post(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},dislikeById:function(e,t,s){let i="friwords/".concat(e,"/dislike");J().post(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},postFriword:function(e,t,s){J().post("friwords",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},postComment:function(e,t,s){let i="friwords/".concat(e.friword_id,"/comments");J().post(i,e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},hasUpdatesAvailable:function(e,t,s){let i="friwords/updates_available/".concat(e);J().get(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})}},ee={getNotifications:function(e,t){J().get("notifications/me").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})},updateNotification:function(e,t,s){let i="notifications/".concat(e.id,"/update");J().post(i,e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})}},te=s(146);s(325);te.initializeApp({apiKey:"AIzaSyCSAjJKGPVlX6zNOHWT2Otg2nXljs5f_lA",authDomain:"friwords-a3536.firebaseapp.com",databaseURL:"https://friwords-a3536.firebaseio.com",projectId:"friwords-a3536",storageBucket:"friwords-a3536.appspot.com",messagingSenderId:"882500991771",appId:"1:882500991771:web:f125ad3a2aa021a0eaf1be",measurementId:"G-P8SQZY3BKH"});A.a.Meta,c.a.Option;class se extends n.a.Component{constructor(e){super(e),this.getRandomAlias=()=>{this.setState({isLoading:!0}),$.generateRandomAlias(e=>{if(this.setState({isLoading:!1}),e.success){let t=this.state.auth;t.alias=e.alias,this.setState({auth:t}),this.form.setFieldsValue({alias:e.alias})}},e=>{this.setState({isLoading:!1})})},this.onFinish=()=>{this.state.auth.gender?(this.setState({isLoading:!0}),$.register({alias:this.state.auth.alias,password:this.state.auth.password,gender:this.state.auth.gender},e=>{e.success?(i.SetToken(e.token),this.props.onStart&&this.props.onStart()):h.a.open({className:"error",message:n.a.createElement(P.a,null),description:e.message}),this.setState({isLoading:!1})},e=>{this.setState({isLoading:!1})})):h.a.open({className:"error",message:n.a.createElement(P.a,null),description:"Escoge tu g\xe9nero"})},this.state={isVisible:!1,isLoading:!1,auth:{}},this.form=null}componentDidMount(){this.getRandomAlias()}render(){const e=this.state.auth;return this.props.isVisible?n.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",minHeight:"100%",zIndex:99999,backgroundColor:"#25b864",paddingBottom:20}},n.a.createElement("h1",{style:{textAlign:"center",color:"white",marginTop:10}},"Ingresa a Friwords"),n.a.createElement("div",{style:{width:"100%",height:10,backgroundColor:"rgba(255,255,255,.15)",marginBottom:10,marginTop:10}}),n.a.createElement("p",{style:{maxWidth:"80%",margin:"0 auto",color:"rgba(255,255,255,.8)",textAlign:"center"}},"Crea tu alias y tu contrase\xf1a. Record\xe1 que ",n.a.createElement("b",null,"todo ser\xe1 an\xf3nimo")),n.a.createElement(_.a,{ref:e=>{this.form=e},name:"login_in",className:"login-in",initialValues:{alias:e.alias},onFinish:this.onFinish},n.a.createElement(_.a.Item,{name:"alias",rules:[{required:!0,message:"Ingresa tu alias"}],style:{width:"90%",margin:"5px auto"}},n.a.createElement(R.a,{onChange:t=>{e.alias=t.target.value,this.setState({auth:e})},style:{width:"100%",margin:"0 auto"},prefix:n.a.createElement("span",null,"@"),placeholder:"Tu alias"})),n.a.createElement("a",{onClick:this.getRandomAlias,style:{width:"90%",color:"white",textDecoration:"underline",marginLeft:"5%",margin:"0 auto",padding:0,display:"block",marginBottom:5}},"Generar alias al azar"),n.a.createElement(_.a.Item,{name:"password",rules:[{required:!0,message:"Ingresa una contrase\xf1a"}],style:{width:"90%",margin:"5px auto"}},n.a.createElement(R.a,{onChange:t=>{e.password=t.target.value,this.setState({auth:e})},type:"password",style:{width:"100%",margin:"0 auto"},prefix:n.a.createElement(q.a,{className:"site-form-item-icon"}),placeholder:"Contrase\xf1a"})),n.a.createElement("span",{style:{width:"100%",display:"block",textAlign:"center",fontWeight:600,color:"white"}},"Selecciona tu g\xe9nero"),n.a.createElement("div",{style:{width:"100%",height:40,display:"flex",flexDirection:"row",marginBottom:20}},n.a.createElement("div",{onClick:()=>{e.gender="female",this.setState({auth:e})},style:{display:"flex",flex:1,flexDirection:"row",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{style:{maxWidth:35,maxHeight:35,opacity:"female"==e.gender?1:.6},src:"https://image.flaticon.com/icons/svg/590/590083.svg"})),n.a.createElement("div",{onClick:()=>{e.gender="male",this.setState({auth:e})},style:{display:"flex",flex:1,flexDirection:"row",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{style:{maxWidth:35,maxHeight:35,opacity:"male"==e.gender?1:.6},src:"https://image.flaticon.com/icons/svg/921/921071.svg"}))),n.a.createElement(_.a.Item,{style:{display:"flex",justifyContent:"center",alignItems:"center"}},n.a.createElement(m.a,{type:"primary",htmlType:"submit",loading:this.state.isLoading,style:{display:"flex",width:"75%",margin:"0 auto",backgroundColor:"white",height:50,color:"white",fontWeight:600,justifyContent:"center",alignItems:"center",color:"#00a2ff",marginTop:15}},"Registrarme"))),n.a.createElement("div",{style:{width:"100%",height:5,backgroundColor:"rgba(255,255,255,.15)",marginBottom:10,marginTop:10}}),n.a.createElement(m.a,{onClick:()=>{this.props.onRequestLogin()},type:"primary",htmlType:"submit",loading:this.state.isLoading,style:{display:"flex",width:"100%",margin:"0 auto",height:40,color:"white",fontWeight:600,justifyContent:"center",alignItems:"center",backgroundColor:"#00a2ff"}},"\xa1Ya tengo un alias!")):null}}s(140);var ie=s(79),ae=s(446);A.a.Meta,c.a.Option;class ne extends n.a.Component{constructor(e){super(e),this.checkProps=e=>{if(e.user&&e.user.alias){let t=this.state.friword;t.user_alias=e.user.alias,this.setState({friword:t})}this.setState({isVisible:e.isVisible})},this.onFinish=()=>{$.signInWithAlias(this.state.auth,e=>{e.success?(i.SetToken(e.token),this.props.onLoggedIn(e.user)):h.a.open({className:"error",message:n.a.createElement(P.a,null),description:e.message})},e=>(h.a.open({className:"error",message:n.a.createElement(P.a,null),description:"Ese alias no es v\xe1lido"}),!1))},this.isValid=()=>!0,this.state={isVisible:!1,auth:{}}}componentDidMount(){this.checkProps(this.props)}componentWillReceiveProps(e){this.checkProps(e)}render(){const e=this.state.auth;return n.a.createElement(ie.a,{title:"Ingres\xe1 con tu alias",visible:this.state.isVisible,closable:!0,onCancel:()=>{this.props.onRequestClose()},footer:null},n.a.createElement(_.a,{name:"login_in",className:"login-in",onFinish:this.onFinish},n.a.createElement("div",{style:{marginBottom:10,backgroundColor:"rgba(0,0,0,.03)",padding:10}},n.a.createElement("span",null,"\xbfTienes un alias distinto? Ingresa tu alias y la contrase\xf1a que se te pidi\xf3 al crearlo.")),n.a.createElement(_.a.Item,{name:"alias",rules:[{required:!0,message:"Ingresa tu alias"}]},n.a.createElement(R.a,{onChange:t=>{e.alias=t.target.value,this.setState({auth:e})},prefix:n.a.createElement(ae.a,{className:"site-form-item-icon"}),placeholder:"Alias"})),n.a.createElement(_.a.Item,{name:"text",rules:[{required:!0,message:"Ingresa la contrase\xf1a"}]},n.a.createElement(R.a,{onChange:t=>{e.password=t.target.value,this.setState({auth:e})},type:"password",prefix:n.a.createElement(q.a,{className:"site-form-item-icon"}),placeholder:"Contrase\xf1a"})),n.a.createElement(_.a.Item,null,n.a.createElement(m.a,{type:"primary",htmlType:"submit",loading:this.state.isLoading},"Ingresar"))))}}var oe=s(445);A.a.Meta,c.a.Option;const re=R.a.TextArea;class le extends n.a.Component{constructor(e){super(e),this.checkProps=e=>{if(e.user&&e.user.alias){let t=this.state.friword;t.user_alias=e.user.alias,this.setState({friword:t})}this.setState({isVisible:e.isVisible})},this.onFinish=()=>{if(this.isValid()){this.setState({isLoading:!0});const e=this.state.friword;Z.postFriword(e,e=>{this.setState({isLoading:!1}),e.success?(this.setState({isVisible:!1,friword:{}}),this.form&&this.form.resetFields(),this.props.onCreated(e.friword)):h.a.open({className:"error",message:"Oops",description:e.message})},e=>{this.setState({isLoading:!1}),h.a.open({className:"error",message:"Oops",description:"Tu friword no pudo ser creado ahora. Intenta en unos momentos."})})}},this.isValid=()=>{const e=this.state.friword;return!(!e||!e.text||e.text.length<10)||(h.a.open({className:"error",message:"Oops",description:"Escribe un texto de al menos 10 caracteres"}),!1)},this.state={isVisible:!1,friword:{}},this.form=null}componentDidMount(){this.checkProps(this.props)}componentWillReceiveProps(e){this.checkProps(e)}render(){const e=this.state.friword;return n.a.createElement(ie.a,{title:"Publica tu friword",visible:this.state.isVisible,closable:!0,onCancel:()=>{this.props.onRequestClose()},footer:null},n.a.createElement(_.a,{ref:e=>{this.form=e},name:"post_friword",className:"post-friword",initialValues:{remember:!0},onFinish:this.onFinish},n.a.createElement("div",{style:{marginBottom:10,backgroundColor:"rgba(0,0,0,.03)",padding:10}},n.a.createElement("span",null,"\xa1Recuerda! Esto es totalmente an\xf3nimo, y tu friword aparecer\xe1 creado por ",n.a.createElement("b",null,null!=e.user_alias?e.user_alias:""))),n.a.createElement(_.a.Item,{name:"text",rules:[{required:!0,message:"Ingresa el texto"}]},n.a.createElement(re,{placeholder:"Tu texto",autoSize:{minRows:2,maxRows:8},maxLength:500,onChange:t=>{e.text=t.target.value,this.setState({friword:e})},prefix:n.a.createElement(oe.a,{className:"site-form-item-icon"})})),n.a.createElement("span",null,500-(e&&e.text&&e.text.length?e.text.length:0)," caracteres restantes"),n.a.createElement("div",{style:{width:"100%",height:5,backgroundColor:"rgba(0,0,0,0.05)",marginTop:20,marginBottom:20}}),n.a.createElement(_.a.Item,null,n.a.createElement(m.a,{type:"primary",htmlType:"submit",loading:this.state.isLoading},"Publicar"))))}}s(424);var ce=s(199),de=s(205);function me(e){const t=n.a.useState(!0),s=Object(de.a)(t,2),i=s[0],a=s[1],o=n.a.useRef();return n.a.useEffect(()=>{const e=new IntersectionObserver(e=>{e.forEach(e=>a(e.isIntersecting))});return e.observe(o.current),()=>e.unobserve(o.current)},[]),n.a.createElement("div",{className:"fade-in-section ".concat(i?"is-visible":""),ref:o},e.children)}var he=s(441),ge=s(440),pe=s(439),ue=s(147);const fe=A.a.Meta,ye=R.a.TextArea;class we extends n.a.Component{constructor(e){super(e),this.onDislike=()=>{this.state.hasLiked||this.state.hasDisliked||(this.props.onDislike(),this.setState({hideDislikeBtn:!0,hasDisliked:!0},()=>{setTimeout(()=>{this.setState({hideDislikeBtn:!1})},1e3)}))},this.onLike=()=>{this.state.hasLiked||this.state.hasDisliked||(this.props.onLike(),this.setState({hideLikeBtn:!0,hasLiked:!0},()=>{setTimeout(()=>{this.setState({hideLikeBtn:!1})},1e3)}))},this.state={isLoadingComments:!1,hideDislikeBtn:!1,hideLikeBtn:!1,isSendingComment:!1,canLeaveComment:!0,comment:"",showComments:!1,hasDisliked:!1,hasLiked:!1}}componentDidMount(){}render(){const e=this.props.friword;let t=n.a.createElement("div",{onClick:()=>{null!=this.props.user?!this.state.comment||this.state.comment.length<2?h.a.open({className:"error",message:"El comentario..",description:"A tu comentario le falta un poco de magia. Compl\xe9talo"}):(this.setState({isSendingComment:!0}),Z.postComment({text:this.state.comment,user_alias:null!=this.props.user&&null!=this.props.user.alias?this.props.user.alias:"",friword_id:e.id,likes:0,dislikes:0},e=>{this.props.onRequestComments(),this.setState({canLeaveComment:!1,isSendingComment:!1,showComments:!0}),h.a.open({className:"success",message:n.a.createElement(f.a,{twoToneColor:"#eb2f96"}),description:"Tu comentario ya est\xe1 visible"}),this.props.onPostedComment&&this.props.onPostedComment()},e=>{console.log(e)})):h.a.open({className:"error",message:"Ingresa primero",description:"Ingresa o crea tu alias para dejar comentarios"})},style:{backgroundColor:"transparent",padding:0,marginTop:0,display:"flex",flex:1}},n.a.createElement("a",{style:{fontWeight:800,padding:15}},"Enviar"));return this.state.isSendingComment&&(t=n.a.createElement("div",{style:{backgroundColor:"white",padding:0,marginTop:5}},n.a.createElement(he.a,{spin:!0,style:{color:"rgba(0,0,0,.75)"}}))),n.a.createElement(me,{key:e.id},n.a.createElement("div",{className:"data-node-".concat(e.id),style:{marginBottom:5}},n.a.createElement("div",{style:{width:"100%"}},n.a.createElement("div",{style:{width:"100%",height:10,backgroundColor:"rgba(0,0,0,.075)"}}),n.a.createElement(A.a,{bordered:!1,bodyStyle:{padding:10,opacity:this.props.loading?.1:1}},n.a.createElement(fe,{avatar:n.a.createElement(ce.a,{src:e&&e.user&&"female"==e.user.gender?"https://image.flaticon.com/icons/svg/590/590083.svg":"https://image.flaticon.com/icons/svg/921/921071.svg",size:"small",shape:"circle",style:{width:30,height:30,borderRadius:15}}),title:n.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},e&&e.user&&null!=e.user.country_code&&n.a.createElement("img",{style:{width:23,marginRight:5},src:"https://www.countryflags.io/".concat(e.user.country_code,"/shiny/64.png")}),n.a.createElement("span",null,"".concat(e.text.substring(0,30),"..."))),description:n.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},n.a.createElement("span",{style:{fontSize:"0.9em"}},"".concat(e.text)))}),e&&e.user_alias&&n.a.createElement("span",{style:{display:"block",marginTop:0,fontSize:10,textAlign:"right"}},"por ",n.a.createElement("span",{style:{color:"#25b864",fontWeight:600}},"@",e.user_alias)),n.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start",marginTop:20,marginBottom:20}},n.a.createElement(ue.a,{color:"#008bdb",duration:250,type:"rectangle",particlesAmountCoefficient:1,oscillationCoefficient:5,hidden:this.state.hideLikeBtn},n.a.createElement("div",{onClick:this.onLike,style:{display:"flex",flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#25b864",width:60,height:30,borderRadius:2,marginRight:10,cursor:"pointer",opacity:this.props.likes>0?1:.75}},n.a.createElement(ge.a,{style:{color:"white"}}),n.a.createElement("span",{style:{color:"white",marginLeft:5}},this.props.likes))),n.a.createElement(ue.a,{color:"#ff2452",duration:250,type:"rectangle",particlesAmountCoefficient:1,oscillationCoefficient:5,hidden:this.state.hideDislikeBtn},n.a.createElement("div",{onClick:this.onDislike,style:{display:"flex",flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#ff2452",width:60,height:30,borderRadius:2,cursor:"pointer",opacity:this.props.dislikes>0?1:.75}},n.a.createElement(pe.a,{style:{color:"white"}}),n.a.createElement("span",{style:{color:"white",marginLeft:5}},this.props.dislikes)))),this.state.showComments&&null!=e.comments&&e.comments.length>0&&e.comments.map(e=>n.a.createElement(V,{comment:e})),this.state.isLoadingComments&&(!e.comments||!e.comments.length)&&n.a.createElement(C.a,{style:{fontSize:24,color:"#ff306f",marginTop:10},spin:!0}),!this.state.isLoadingComments&&!this.state.showComments&&e.comments_qty>0&&n.a.createElement("a",{onClick:()=>{this.setState({isLoadingComments:!0,showComments:!0}),this.props.onRequestComments()},style:{display:"block",marginLeft:0,marginTop:20,fontWeight:500}},"Ver ",e.comments_qty," comentarios"),this.state.canLeaveComment&&n.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:20}},n.a.createElement("div",{style:{display:"flex",flex:1}},n.a.createElement(_.a,{name:"post_comment",style:{width:"100%",paddingLeft:0,paddingRight:0,position:"relative"}},n.a.createElement(_.a.Item,{name:"comment",rules:[{required:!0,message:"Ingresa un comentario"}],style:{marginBottom:0,paddingBottom:0}},n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}},n.a.createElement(ye,{className:"input-comment",placeholder:"Deja tu comentario",autoSize:{minRows:1,maxRows:3},maxLength:500,onChange:e=>{this.setState({comment:e.target.value})},disabled:null==this.props.user}),t))))),null==this.props.user&&n.a.createElement("div",{style:{width:"100%",backgroundColor:"#25b864",padding:5,marginTop:10,borderRadius:2}},n.a.createElement("span",{style:{display:"block",fontSize:12,fontWeight:600,textAlign:"left",color:"white"}},"Cre\xe1 tu alias an\xf3nimo para dejar un comentario"))))))}}A.a.Meta,c.a.Option,R.a.TextArea;class Ee extends n.a.Component{constructor(e){super(e),this.checkProps=e=>{this.setState({isVisible:e.isVisible}),1==e.isVisible&&0==this.state.isVisible&&this.getNotifications()},this.getNotifications=()=>{this.setState({isLoading:!0}),ee.getNotifications(e=>{if(e.success)for(var t in this.setState({notifications:e.notifications,isLoading:!1}),e.notifications)ee.updateNotification({id:e.notifications[t].id,seen:!0},e=>{let s=this.state;s[t].seen=!0,this.setState({notifications:s})})},e=>{this.setState({notifications:[],isLoading:!1})})},this.onFinish=()=>{if(this.isValid()){this.setState({isLoading:!0});const e=this.state.friword;Z.postFriword(e,e=>{this.setState({isLoading:!1}),e.success?(this.setState({isVisible:!1,friword:{}}),this.form&&this.form.resetFields(),this.props.onCreated(e.friword)):h.a.open({className:"error",message:"Oops",description:e.message})},e=>{this.setState({isLoading:!1}),h.a.open({className:"error",message:"Oops",description:"Tu friword no pudo ser creado ahora. Intenta en unos momentos."})})}},this.isValid=()=>{const e=this.state.friword;return!(!e||!e.text||e.text.length<10)||(h.a.open({className:"error",message:"Oops",description:"Escribe un texto de al menos 10 caracteres"}),!1)},this.state={isVisible:!1,notifications:[]},this.form=null}componentDidMount(){this.checkProps(this.props)}componentWillReceiveProps(e){this.checkProps(e)}render(){const e=this.state,t=e.notifications;e.friword;return n.a.createElement(ie.a,{title:"Tus notificaciones",visible:this.state.isVisible,closable:!0,onCancel:()=>{this.props.onRequestClose()},footer:null},t&&t.length>0&&t.map(e=>n.a.createElement("div",{style:{width:"100%",marginBottom:10,position:"relative",backgroundColor:e.seen?"white":"rgba(255, 160, 0, .15)",padding:10,borderRadius:5}},n.a.createElement("div",{style:{width:"100%",borderBottomWidth:5,borderBottomColor:"rgba(0,0,0,.05)"},dangerouslySetInnerHTML:{__html:e.html}}),n.a.createElement("span",{style:{display:"block",width:"100%",fontSize:11,marginTop:5,textAlign:"right"}},D()(e.created_at).fromNow()),n.a.createElement("div",{style:{width:"100%",height:5,backgroundColor:"rgba(0,0,0,0.1)",marginTop:10}}))),!t||0==t.length&&n.a.createElement("span",null,"\xa1A\xfan no tienes notificaciones para revisar!"))}}c.a.Option;const be=l.a.Title,Ce=g.a.TabPane;class ke extends n.a.Component{constructor(e){super(e),this.getMe=()=>{$.getMe(e=>{if(e.success&&null!=e.user&&(this.setState({user:e.user}),$.user=e.user,e.user&&!e.user.country_code&&!e.user.ip)){const e="45c816eed2d04a8b96e59ff177c609af";u.a.get("https://api.ipgeolocation.io/ipgeo?apiKey=".concat(e,"&fields=geo&output=json")).then(e=>{if(e&&e.data){const t=e.data;$.updateMe({country_name:t&&t.country_name,country_code:t&&t.country_code2,ip:t&&t.ip},e=>{e.success&&this.setState({user:e.user})})}})}})},this.getFriwords=()=>{this.setState({isLoading:!0,hasUpdates:!1}),Z.getFriwordsByFilter(this.state.filters,e=>{let t=[],s=[];for(var i in e.friwords){const a=e.friwords[i];x.a.some(this.state.friwords,e=>e.id==a.id&&e.comments&&e.comments.length>0)?t.push(new Promise((e,t)=>{Z.getFriwordById(a.id,t=>{t.success,s.push(t.friword),e()},t=>{s.push(a.friword),e()})})):s.push(a)}Promise.all(t).then(e=>{let t=x.a.orderBy(s,["created_at"],["desc"]);this.state.friwords&&this.state.friwords.length>0&&this.state.filters.page>0&&(t=this.state.friwords.concat(t)),this.setState({isLoading:!1,friwords:t})})},e=>{alert("Estamos teniendo algunos problemas en este momento. Refresca la p\xe1gina en unos segundos."),this.setState({isLoading:!1})})},this.getFriwordById=e=>{Z.getFriwordById(e,e=>{if(e.success){let t=x.a.findIndex(this.state.friwords,t=>t.id==e.friword.id),s=this.state.friwords;s[t]=e.friword,this.setState({friwords:s})}},e=>{})},this.refresh=()=>{this.getFriwords(),this.getMe()},this.isAuthenticated=()=>$.isAuthenticated(),this.state={friwords:[],filters:{listing_mode:1,page:0},tabActiveKey:"1",isViewingNotifications:!1,isWelcome:!1,isCreating:!1,isLoggingIn:!1,isLoading:!0,hasUpdates:!1,user:null}}componentDidMount(){this.getFriwords(),setInterval(()=>{this.state.friwords&&this.state.friwords.length>0&&Z.hasUpdatesAvailable(x.a.first(this.state.friwords).id,e=>{e.success&&this.setState({hasUpdates:e.hasUpdates})})},1e4),this.getMe()}render(){const e=this.state,t=e.friwords,s=e.filters;if(this.state.isWelcome)return this.renderWelcome();const i=null!=this.state.user&&this.state.user.unread_notifications>0;return n.a.createElement("div",{className:"friwords-container"},n.a.createElement("div",{style:{width:"100%",height:45,display:"flex",flexDirection:"row",position:"fixed",top:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",padding:0,backgroundColor:"white",zIndex:9999}},n.a.createElement("div",{style:{height:45,display:"flex",flexDirection:"column",flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white",borderTopLeftRadius:0,borderBottomLeftRadius:10,cursor:"pointer",zIndex:9999,borderLeft:"2px solid rgba(0,0,0,.05)",borderBottom:"2px solid rgba(0,0,0,.05)"}},n.a.createElement("span",{style:{fontWeight:500,fontSize:"0.6em"}},this.state.user&&this.state.user.alias?"@".concat(this.state.user.alias):"-"),n.a.createElement("a",{style:{textDecorationLine:"underline",fontSize:"0.6em"},href:"#",onClick:()=>{this.isAuthenticated()?this.setState({isLoggingIn:!0}):this.setState({isWelcome:!0})}},this.isAuthenticated()?"Cambiar":"Ingresar")),n.a.createElement("div",{className:"counter-online-users",onClick:()=>{this.isAuthenticated()?this.setState({isViewingNotifications:!0}):this.setState({isWelcome:!0})},style:{height:45,display:"flex",flex:i?1:0,justifyContent:"center",alignItems:"center",backgroundColor:i?"#fccf84":"white",borderTopLeftRadius:0,cursor:"pointer",zIndex:9999,borderLeft:"2px solid rgba(0,0,0,.05)",borderBottom:"2px solid rgba(0,0,0,.05)",paddingLeft:10,paddingRight:10}},n.a.createElement("p",{style:{fontWeight:600,margin:0,padding:0,fontSize:"0.75em"}},i?"".concat(this.state.user.unread_notifications," nueva").concat(this.state.user.unread_notifications>1?"s":""):0),n.a.createElement("img",{style:{width:20,height:20,marginLeft:5,opacity:1},src:"/img/bell-".concat(i?"on":"off",".png")})),n.a.createElement("div",{onClick:this.refresh,style:{height:45,display:"flex",flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#25b864",cursor:"pointer",zIndex:9999,borderBottomRightRadius:10,borderLeft:"0px solid rgba(0,0,0,.05)",borderBottom:"2px solid rgba(0,0,0,.2)",opacity:this.state.hasUpdates?1:.6}},n.a.createElement("span",{style:{fontWeight:500,fontSize:"0.6em",color:"white"}},this.state.isLoading?"Actualizando..":"Actualizar"),n.a.createElement("img",{style:{width:30,height:30,marginLeft:10},src:"https://image.flaticon.com/icons/svg/1688/1688988.svg"}))),n.a.createElement("section",{style:{textAlign:"center",marginTop:80,marginBottom:20}},n.a.createElement(be,{level:2,className:"Title"},"Friwords")),n.a.createElement("div",{className:"scroll-container"},n.a.createElement(Ee,{isVisible:this.state.isViewingNotifications,user:this.state.user,onRequestClose:()=>{this.setState({isViewingNotifications:!1},this.getMe)}}),n.a.createElement(ne,{isVisible:this.state.isLoggingIn,onRequestClose:()=>{this.setState({isLoggingIn:!1}),this.state.user.is_configured||this.setState({isWelcome:!0})},onLoggedIn:e=>{this.setState({user:e,isLoggingIn:!1},this.refresh)}}),n.a.createElement(le,{isVisible:this.state.isCreating,onRequestClose:()=>{this.setState({isCreating:!1})},user:this.state.user,onCreated:e=>{this.setState({isCreating:!1}),s.page=0,s.listing_mode=1,this.setState({filters:s,tabActiveKey:"1"},this.refresh),h.a.open({className:"success",message:n.a.createElement(f.a,{twoToneColor:"#eb2f96"}),description:"Tu friword fue publicado exitosamente en la secci\xf3n `Recientes`"})}}),n.a.createElement("div",{style:{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center"}},n.a.createElement(m.a,{onClick:()=>{this.isAuthenticated()?this.setState({isCreating:!0}):this.setState({isWelcome:!0})},type:"primary",icon:n.a.createElement(y.a,null),style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Publicar friword")),n.a.createElement(g.a,{activeKey:this.state.tabActiveKey,type:"card",onTabClick:e=>{2==e?(s.only_me=!0,s.page=0):(s.only_me=!1,s.listing_mode=e,s.page=0),this.setState({filters:s,tabActiveKey:e},this.getFriwords)},defaultActiveKey:"1"},n.a.createElement(Ce,{tab:n.a.createElement("span",null,n.a.createElement(w.a,null),"M\xe1s destacados"),key:"0"},t&&t.map((e,t)=>n.a.createElement(we,{loading:this.state.isLoading,friword:e,comments:e.comments,likes:e.likes_qty,dislikes:e.dislikes_qty,commentsQty:e.comments_qty,user:this.state.user,onLike:()=>{Z.likeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id),this.getMe()},500)})},onDislike:()=>{Z.dislikeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id),this.getMe()},500)})},onRequestComments:()=>{this.getFriwordById(e.id)},onPostedComment:this.getMe})),n.a.createElement(m.a,{onClick:()=>{s.page+=1,this.setState({filters:s},this.getFriwords)},loading:this.state.isLoading,type:"primary",icon:n.a.createElement(E.a,null),style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Cargar m\xe1s")),n.a.createElement(Ce,{tab:n.a.createElement("span",null,n.a.createElement(b.a,null),"Recientes"),key:"1"},t&&t.map((e,t)=>n.a.createElement(we,{loading:this.state.isLoading,friword:e,comments:e.comments,likes:e.likes_qty,dislikes:e.dislikes_qty,commentsQty:e.comments_qty,user:this.state.user,onLike:()=>{Z.likeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onDislike:()=>{Z.dislikeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onRequestComments:()=>{this.getFriwordById(e.id)},onPostedComment:this.getMe})),n.a.createElement(m.a,{onClick:()=>{s.page+=1,this.setState({filters:s},this.getFriwords)},type:"primary",icon:n.a.createElement(E.a,null),loading:this.state.isLoading,style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Cargar m\xe1s")),n.a.createElement(Ce,{tab:n.a.createElement("span",null,n.a.createElement(b.a,null),"M\xedos"),key:"2"},t&&t.map((e,t)=>n.a.createElement(we,{loading:this.state.isLoading,friword:e,comments:e.comments,likes:e.likes_qty,dislikes:e.dislikes_qty,commentsQty:e.comments_qty,user:this.state.user,onLike:()=>{Z.likeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onDislike:()=>{Z.dislikeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onRequestComments:()=>{this.getFriwordById(e.id)},onPostedComment:this.getMe})),n.a.createElement(m.a,{onClick:()=>{s.page+=1,this.setState({filters:s},this.getFriwords)},type:"primary",loading:this.state.isLoading,icon:n.a.createElement(E.a,null),style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Cargar m\xe1s"))),this.state.isLoading&&n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}},n.a.createElement(d.a,{indicator:n.a.createElement(C.a,{style:{fontSize:24},spin:!0})}))))}renderWelcome(){return n.a.createElement("div",{className:"friwords-container"},n.a.createElement(se,{isVisible:this.state.isWelcome,onStart:()=>{this.setState({isWelcome:!1},this.getMe),h.a.open({className:"success",message:n.a.createElement(f.a,{twoToneColor:"#eb2f96"}),description:"Bienvenid@ a Friwords. Empieza leyendo y publicando"}),setTimeout(()=>{this.getFriwords()},3e3)},onRequestLogin:()=>{this.setState({isLoggingIn:!0,isWelcome:!1})}}))}}s(433);c.a.Option,l.a.Title;var xe=()=>n.a.createElement(ke,null);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(xe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},59:function(e,t,s){}},[[209,1,2]]]);
//# sourceMappingURL=main.b644f867.chunk.js.map