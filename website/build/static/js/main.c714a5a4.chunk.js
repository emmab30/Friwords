(this["webpackJsonpantd-demo"]=this["webpackJsonpantd-demo"]||[]).push([[0],{210:function(e,t,s){e.exports=s(434)},215:function(e,t,s){},288:function(e){e.exports=JSON.parse("{}")},433:function(e,t,s){},434:function(e,t,s){"use strict";s.r(t);var i={};s.r(i),s.d(i,"SetToken",(function(){return J})),s.d(i,"ApiService",(function(){return Q})),s.d(i,"setBaseUrl",(function(){return G})),s.d(i,"getBaseUrl",(function(){return X})),s.d(i,"encodeQueryData",(function(){return Y}));var a=s(0),n=s.n(a),o=s(6),r=s.n(o),l=(s(215),s(188),s(120)),c=(s(76),s(35)),d=(s(222),s(205)),m=(s(66),s(20)),h=(s(67),s(19)),g=(s(150),s(81)),u=s(107),p=s.n(u),f=(s(242),s(435)),y=s(436),w=s(440),E=s(439),b=s(437),C=s(447),k=(s(288),s(91)),x=s.n(k),S=(s(289),s(207)),v=s(208),I=s(21),L=s.n(I);const T={data:new Map,get(e){return e&&this.data.get(e)||null},set(e,t){if(e)return this.data.set(e,t)}};class B extends n.a.Component{constructor(e){super(...arguments),this.connectScrollTarget=this.connectScrollTarget.bind(this),this._target=window}connectScrollTarget(e){this._target=e}restoreScrollPosition(e){e=e||this.props.scrollStore.get(this.props.scrollKey),this._target&&e&&L()(()=>{var t,s,i;t=this._target,s=e.x,i=e.y,t instanceof window.Window?t.scrollTo(s,i):(t.scrollLeft=s,t.scrollTop=i)})}saveScrollPosition(e){if(this._target){const t=function(e){if(e instanceof window.Window)return{x:e.scrollX,y:e.scrollY};return{x:e.scrollLeft,y:e.scrollTop}}(this._target);e=e||this.props.scrollKey,this.props.scrollStore.set(e,t)}}componentDidMount(){this.restoreScrollPosition()}UNSAFE_componentWillReceiveProps(e){this.props.scrollKey!==e.scrollKey&&this.saveScrollPosition()}componentDidUpdate(e){this.props.scrollKey!==e.scrollKey&&this.restoreScrollPosition()}componentWillUnmount(){this.saveScrollPosition()}render(){const e=this.props,t=e.children,s=void 0===t?null:t,i=Object(v.a)(e,["children"]);return s&&s(Object(S.a)({},i,{connectScrollTarget:this.connectScrollTarget}))}}B.defaultProps={scrollStore:T};s(99);var _=s(22),R=(s(65),s(36)),F=(s(74),s(33)),A=(s(171),s(54)),N=(s(172),s(34)),W=(s(173),s(111)),D=s(85),V=s.n(D);s(174),s(59);F.a.Meta;const j=["#f69600","#f66200","#edf600","#00f6a8","#00b9f6","#1700f6","#8b00f6","#f600e2","#f60057"];class q extends n.a.Component{constructor(e){super(e),this.state={randomColor:j[Math.floor(Math.random()*j.length)]}}render(){const e=this.props.comment;return n.a.createElement("div",null,n.a.createElement("div",{style:{width:"95%",marginLeft:"5%",height:5,backgroundColor:"rgba(0,0,0,.01)",marginTop:10,marginBottom:10}}),n.a.createElement("div",{style:{width:"95%",marginLeft:"5%",borderLeft:"4px solid ".concat(M(this.state.randomColor,.4)),paddingLeft:10,marginTop:5}},n.a.createElement(A.a,{gutter:24},n.a.createElement(N.a,{span:24,justify:"center"},n.a.createElement(W.a,{src:"https://image.flaticon.com/icons/svg/2716/2716406.svg",size:"small",shape:"square",size:15}),n.a.createElement("span",{style:{color:"rgba(0,0,0,.75)",fontSize:13,fontFamily:"Open Sans",marginLeft:5}},e.text),e&&e.user_alias&&n.a.createElement("span",{style:{display:"block",marginTop:0,fontSize:10,textAlign:"right"}},"por ",n.a.createElement("i",null,"@",e.user_alias)),!1))))}}function M(e,t){var s;if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(e))return 3==(s=e.substring(1).split("")).length&&(s=[s[0],s[0],s[1],s[1],s[2],s[2]]),"rgba("+[(s="0x"+s.join(""))>>16&255,s>>8&255,255&s].join(",")+","+t+")";throw new Error("Bad Hex")}var P=s(444),z=s(438),O=s(192),K=s.n(O),U="https://api.friwords.com/api/v1/",H=U;function J(e){localStorage.setItem("JWT_TOKEN",e),e}function Q(e=15e3,t){t||(t={Accept:"application/json","Content-Type":"application/json"},localStorage.getItem("JWT_TOKEN")&&(t.Authorization="Bearer "+localStorage.getItem("JWT_TOKEN")));var s=p.a.create({baseURL:X(),timeout:e,headers:t});return s.interceptors.response.use(e=>e,e=>e),K()(s,{retries:5,retryDelay:e=>1e3*e}),s}function G(e){H=null==e?U:e}function X(){return H}function Y(e){let t=[];for(let s in e)t.push(encodeURIComponent(s)+"="+encodeURIComponent(e[s]));return t.join("&")}var $={user:null,isAuthenticated:()=>null!=$.user,register:function(e,t,s){Q().post("auth/register",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},signInWithAlias:function(e,t,s){Q().post("auth/sign_in",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},getMe:function(e,t){Q().get("profile/me").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})},updateMe:function(e,t,s){Q().post("profile/me",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},generateRandomAlias:function(e,t){Q().get("auth/generate_alias").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})}},Z=$,ee={getFriwords:function(e,t){Q().get("friwords").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})},getFriwordsByFilter:function(e,t,s){Q().post("friwords/filter",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},getFriwordById:function(e,t,s){let i="friwords/".concat(e);Q().get(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},likeById:function(e,t,s){let i="friwords/".concat(e,"/like");Q().post(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},dislikeById:function(e,t,s){let i="friwords/".concat(e,"/dislike");Q().post(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},postFriword:function(e,t,s){Q().post("friwords",e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},postComment:function(e,t,s){let i="friwords/".concat(e.friword_id,"/comments");Q().post(i,e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})},hasUpdatesAvailable:function(e,t,s){let i="friwords/updates_available/".concat(e);Q().get(i).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})}},te={getNotifications:function(e,t){Q().get("notifications/me").then(t=>{e&&e(t.data)}).catch(e=>{t&&t(e)})},updateNotification:function(e,t,s){let i="notifications/".concat(e.id,"/update");Q().post(i,e).then(e=>{t&&t(e.data)}).catch(e=>{s&&s(e)})}},se=s(147);s(327);se.initializeApp({apiKey:"AIzaSyCSAjJKGPVlX6zNOHWT2Otg2nXljs5f_lA",authDomain:"friwords-a3536.firebaseapp.com",databaseURL:"https://friwords-a3536.firebaseio.com",projectId:"friwords-a3536",storageBucket:"friwords-a3536.appspot.com",messagingSenderId:"882500991771",appId:"1:882500991771:web:f125ad3a2aa021a0eaf1be",measurementId:"G-P8SQZY3BKH"});F.a.Meta,c.a.Option;class ie extends n.a.Component{constructor(e){super(e),this.getRandomAlias=()=>{this.setState({isLoading:!0}),Z.generateRandomAlias(e=>{if(this.setState({isLoading:!1}),e.success){let t=this.state.auth;t.alias=e.alias,this.setState({auth:t}),this.form.setFieldsValue({alias:e.alias})}},e=>{this.setState({isLoading:!1})})},this.onFinish=()=>{this.state.auth.gender?(this.setState({isLoading:!0}),Z.register({alias:this.state.auth.alias,password:this.state.auth.password,gender:this.state.auth.gender},e=>{e.success?(i.SetToken(e.token),this.props.onStart&&this.props.onStart()):h.a.open({className:"error",message:n.a.createElement(P.a,null),description:e.message}),this.setState({isLoading:!1})},e=>{this.setState({isLoading:!1})})):h.a.open({className:"error",message:n.a.createElement(P.a,null),description:"Escoge tu g\xe9nero"})},this.state={isVisible:!1,isLoading:!1,auth:{}},this.form=null}componentDidMount(){this.getRandomAlias()}render(){const e=this.state.auth;return this.props.isVisible?n.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",minHeight:"100%",zIndex:99999,backgroundColor:"#25b864",paddingBottom:20}},n.a.createElement("h1",{style:{textAlign:"center",color:"white",marginTop:10}},"Ingresa a Friwords"),n.a.createElement("div",{style:{width:"100%",height:10,backgroundColor:"rgba(255,255,255,.15)",marginBottom:10,marginTop:10}}),n.a.createElement("p",{style:{maxWidth:"80%",margin:"0 auto",color:"rgba(255,255,255,.8)",textAlign:"center"}},"Crea tu alias y tu contrase\xf1a. Record\xe1 que ",n.a.createElement("b",null,"todo ser\xe1 an\xf3nimo")),n.a.createElement(_.a,{ref:e=>{this.form=e},name:"login_in",className:"login-in",initialValues:{alias:e.alias},onFinish:this.onFinish},n.a.createElement(_.a.Item,{name:"alias",rules:[{required:!0,message:"Ingresa tu alias"}],style:{width:"90%",margin:"5px auto"}},n.a.createElement(R.a,{onChange:t=>{e.alias=t.target.value,this.setState({auth:e})},style:{width:"100%",margin:"0 auto"},prefix:n.a.createElement("span",null,"@"),placeholder:"Tu alias"})),n.a.createElement("a",{onClick:this.getRandomAlias,style:{width:"90%",color:"white",textDecoration:"underline",marginLeft:"5%",margin:"0 auto",padding:0,display:"block",marginBottom:5}},"Generar alias al azar"),n.a.createElement(_.a.Item,{name:"password",rules:[{required:!0,message:"Ingresa una contrase\xf1a"}],style:{width:"90%",margin:"5px auto"}},n.a.createElement(R.a,{onChange:t=>{e.password=t.target.value,this.setState({auth:e})},type:"password",style:{width:"100%",margin:"0 auto"},prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"Contrase\xf1a"})),n.a.createElement("span",{style:{width:"100%",display:"block",textAlign:"center",fontWeight:600,color:"white"}},"Selecciona tu g\xe9nero"),n.a.createElement("div",{style:{width:"100%",height:40,display:"flex",flexDirection:"row",marginBottom:20}},n.a.createElement("div",{onClick:()=>{e.gender="female",this.setState({auth:e})},style:{display:"flex",flex:1,flexDirection:"row",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{style:{maxWidth:35,maxHeight:35,opacity:"female"==e.gender?1:.6},src:"https://image.flaticon.com/icons/svg/590/590083.svg"})),n.a.createElement("div",{onClick:()=>{e.gender="male",this.setState({auth:e})},style:{display:"flex",flex:1,flexDirection:"row",backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}},n.a.createElement("img",{style:{maxWidth:35,maxHeight:35,opacity:"male"==e.gender?1:.6},src:"https://image.flaticon.com/icons/svg/921/921071.svg"}))),n.a.createElement(_.a.Item,{style:{display:"flex",justifyContent:"center",alignItems:"center"}},n.a.createElement(m.a,{type:"primary",htmlType:"submit",loading:this.state.isLoading,style:{display:"flex",width:"75%",margin:"0 auto",backgroundColor:"white",height:50,color:"white",fontWeight:600,justifyContent:"center",alignItems:"center",color:"#00a2ff",marginTop:15}},"Registrarme"))),n.a.createElement("div",{style:{width:"100%",height:5,backgroundColor:"rgba(255,255,255,.15)",marginBottom:10,marginTop:10}}),n.a.createElement(m.a,{onClick:()=>{this.props.onRequestLogin()},type:"primary",htmlType:"submit",loading:this.state.isLoading,style:{display:"flex",width:"100%",margin:"0 auto",height:40,color:"white",fontWeight:600,justifyContent:"center",alignItems:"center",backgroundColor:"#00a2ff"}},"\xa1Ya tengo un alias!")):null}}s(141);var ae=s(79),ne=s(446);F.a.Meta,c.a.Option;class oe extends n.a.Component{constructor(e){super(e),this.checkProps=e=>{if(e.user&&e.user.alias){let t=this.state.friword;t.user_alias=e.user.alias,this.setState({friword:t})}this.setState({isVisible:e.isVisible})},this.onFinish=()=>{Z.signInWithAlias(this.state.auth,e=>{e.success?(i.SetToken(e.token),this.props.onLoggedIn(e.user)):h.a.open({className:"error",message:n.a.createElement(P.a,null),description:e.message})},e=>(h.a.open({className:"error",message:n.a.createElement(P.a,null),description:"Ese alias no es v\xe1lido"}),!1))},this.isValid=()=>!0,this.state={isVisible:!1,auth:{}}}componentDidMount(){this.checkProps(this.props)}componentWillReceiveProps(e){this.checkProps(e)}render(){const e=this.state.auth;return n.a.createElement(ae.a,{title:"Ingres\xe1 con tu alias",visible:this.state.isVisible,closable:!0,onCancel:()=>{this.props.onRequestClose()},footer:null},n.a.createElement(_.a,{name:"login_in",className:"login-in",onFinish:this.onFinish},n.a.createElement("div",{style:{marginBottom:10,backgroundColor:"rgba(0,0,0,.03)",padding:10}},n.a.createElement("span",null,"\xbfTienes un alias distinto? Ingresa tu alias y la contrase\xf1a que se te pidi\xf3 al crearlo.")),n.a.createElement(_.a.Item,{name:"alias",rules:[{required:!0,message:"Ingresa tu alias"}]},n.a.createElement(R.a,{onChange:t=>{e.alias=t.target.value,this.setState({auth:e})},prefix:n.a.createElement(ne.a,{className:"site-form-item-icon"}),placeholder:"Alias"})),n.a.createElement(_.a.Item,{name:"text",rules:[{required:!0,message:"Ingresa la contrase\xf1a"}]},n.a.createElement(R.a,{onChange:t=>{e.password=t.target.value,this.setState({auth:e})},type:"password",prefix:n.a.createElement(z.a,{className:"site-form-item-icon"}),placeholder:"Contrase\xf1a"})),n.a.createElement(_.a.Item,null,n.a.createElement(m.a,{type:"primary",htmlType:"submit",loading:this.state.isLoading},"Ingresar"))))}}var re=s(445);F.a.Meta,c.a.Option;const le=R.a.TextArea;class ce extends n.a.Component{constructor(e){super(e),this.checkProps=e=>{if(e.user&&e.user.alias){let t=this.state.friword;t.user_alias=e.user.alias,this.setState({friword:t})}this.setState({isVisible:e.isVisible})},this.onFinish=()=>{if(this.isValid()){this.setState({isLoading:!0});const e=this.state.friword;ee.postFriword(e,e=>{this.setState({isLoading:!1}),e.success?(this.setState({isVisible:!1,friword:{}}),this.form&&this.form.resetFields(),this.props.onCreated(e.friword)):h.a.open({className:"error",message:"Oops",description:e.message})},e=>{this.setState({isLoading:!1}),h.a.open({className:"error",message:"Oops",description:"Tu friword no pudo ser creado ahora. Intenta en unos momentos."})})}},this.isValid=()=>{const e=this.state.friword;return!(!e||!e.text||e.text.length<10)||(h.a.open({className:"error",message:"Oops",description:"Escribe un texto de al menos 10 caracteres"}),!1)},this.state={isVisible:!1,friword:{}},this.form=null}componentDidMount(){this.checkProps(this.props)}componentWillReceiveProps(e){this.checkProps(e)}render(){const e=this.state.friword;return n.a.createElement(ae.a,{title:"Publica tu friword",visible:this.state.isVisible,closable:!0,onCancel:()=>{this.props.onRequestClose()},footer:null},n.a.createElement(_.a,{ref:e=>{this.form=e},name:"post_friword",className:"post-friword",initialValues:{remember:!0},onFinish:this.onFinish},n.a.createElement("div",{style:{marginBottom:10,backgroundColor:"rgba(0,0,0,.03)",padding:10}},n.a.createElement("span",null,"\xa1Recuerda! Esto es totalmente an\xf3nimo, y tu friword aparecer\xe1 creado por ",n.a.createElement("b",null,null!=e.user_alias?e.user_alias:""))),n.a.createElement(_.a.Item,{name:"text",rules:[{required:!0,message:"Ingresa el texto"}]},n.a.createElement(le,{placeholder:"Tu texto",autoSize:{minRows:2,maxRows:8},maxLength:500,onChange:t=>{e.text=t.target.value,this.setState({friword:e})},prefix:n.a.createElement(re.a,{className:"site-form-item-icon"})})),n.a.createElement("span",null,500-(e&&e.text&&e.text.length?e.text.length:0)," caracteres restantes"),n.a.createElement("div",{style:{width:"100%",height:5,backgroundColor:"rgba(0,0,0,0.05)",marginTop:20,marginBottom:20}}),n.a.createElement(_.a.Item,null,n.a.createElement(m.a,{type:"primary",htmlType:"submit",loading:this.state.isLoading},"Publicar"))))}}var de=s(206);function me(e){const t=n.a.useState(!0),s=Object(de.a)(t,2),i=s[0],a=s[1],o=n.a.useRef();return n.a.useEffect(()=>{const e=new IntersectionObserver(e=>{e.forEach(e=>a(e.isIntersecting))});return e.observe(o.current),()=>e.unobserve(o.current)},[]),n.a.createElement("div",{className:"fade-in-section ".concat(i?"is-visible":""),ref:o},e.children)}var he=s(443),ge=s(442),ue=s(441),pe=s(148);const fe=F.a.Meta;class ye extends n.a.Component{constructor(e){super(e),this.onDislike=()=>{this.state.hasLiked||this.state.hasDisliked||(this.props.onDislike(),this.setState({hideDislikeBtn:!0,hasDisliked:!0},()=>{setTimeout(()=>{this.setState({hideDislikeBtn:!1})},1e3)}))},this.onLike=()=>{this.state.hasLiked||this.state.hasDisliked||(this.props.onLike(),this.setState({hideLikeBtn:!0,hasLiked:!0},()=>{setTimeout(()=>{this.setState({hideLikeBtn:!1})},1e3)}))},this.state={isLoadingComments:!1,hideDislikeBtn:!1,hideLikeBtn:!1,isSendingComment:!1,canLeaveComment:!0,comment:"",showComments:!1,hasDisliked:!1,hasLiked:!1}}componentDidMount(){}render(){const e=this.props.friword;let t=n.a.createElement("div",{onClick:()=>{null!=this.props.user?!this.state.comment||this.state.comment.length<2?h.a.open({className:"error",message:"El comentario..",description:"A tu comentario le falta un poco de magia. Compl\xe9talo"}):(this.setState({isSendingComment:!0}),ee.postComment({text:this.state.comment,user_alias:null!=this.props.user&&null!=this.props.user.alias?this.props.user.alias:"",friword_id:e.id,likes:0,dislikes:0},e=>{this.props.onRequestComments(),this.setState({canLeaveComment:!1,isSendingComment:!1,showComments:!0}),h.a.open({className:"success",message:n.a.createElement(f.a,{twoToneColor:"#eb2f96"}),description:"Tu comentario ya est\xe1 visible"}),this.props.onPostedComment&&this.props.onPostedComment()},e=>{console.log(e)})):h.a.open({className:"error",message:"Ingresa primero",description:"Ingresa o crea tu alias para dejar comentarios"})},style:{backgroundColor:"white",padding:0,marginTop:5}},n.a.createElement("a",{style:{fontWeight:800,padding:10}},"Enviar"));return this.state.isSendingComment&&(t=n.a.createElement("div",{style:{backgroundColor:"white",padding:0,marginTop:5}},n.a.createElement(he.a,{spin:!0,style:{color:"rgba(0,0,0,.75)"}}))),n.a.createElement(me,{key:e.id},n.a.createElement("div",{className:"data-node-".concat(e.id),style:{marginBottom:5}},n.a.createElement("div",{style:{width:"100%"}},n.a.createElement("div",{style:{width:"100%",height:10,backgroundColor:"rgba(0,0,0,.075)"}}),n.a.createElement(F.a,{bordered:!1,bodyStyle:{padding:10,opacity:this.props.loading?.1:1}},n.a.createElement(fe,{avatar:n.a.createElement(W.a,{src:e&&e.user&&"female"==e.user.gender?"https://image.flaticon.com/icons/svg/590/590083.svg":"https://image.flaticon.com/icons/svg/921/921071.svg",size:"small",shape:"circle",style:{width:30,height:30,borderRadius:15}}),title:n.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},e&&e.user&&null!=e.user.country_code&&n.a.createElement("img",{style:{width:23,marginRight:5},src:"https://www.countryflags.io/".concat(e.user.country_code,"/shiny/64.png")}),n.a.createElement("span",null,"".concat(e.text.substring(0,30),"..."))),description:e.text}),e&&e.user_alias&&n.a.createElement("span",{style:{display:"block",marginTop:0,fontSize:12,textAlign:"right"}},"por ",n.a.createElement("i",null,"@",e.user_alias)),n.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start",marginTop:20,marginBottom:20}},n.a.createElement(pe.a,{color:"#008bdb",duration:250,type:"rectangle",particlesAmountCoefficient:1,oscillationCoefficient:5,hidden:this.state.hideLikeBtn},n.a.createElement("div",{onClick:this.onLike,style:{display:"flex",flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#008bdb",width:100,height:30,borderRadius:2,marginRight:10,cursor:"pointer",opacity:this.props.likes>0?1:.75}},n.a.createElement(ge.a,{style:{color:"white"}}),n.a.createElement("span",{style:{color:"white",marginLeft:5}},this.props.likes))),n.a.createElement(pe.a,{color:"#ff2452",duration:250,type:"rectangle",particlesAmountCoefficient:1,oscillationCoefficient:5,hidden:this.state.hideDislikeBtn},n.a.createElement("div",{onClick:this.onDislike,style:{display:"flex",flex:0,alignItems:"center",justifyContent:"center",backgroundColor:"#ff2452",width:100,height:30,borderRadius:2,cursor:"pointer",opacity:this.props.dislikes>0?1:.75}},n.a.createElement(ue.a,{style:{color:"white"}}),n.a.createElement("span",{style:{color:"white",marginLeft:5}},this.props.dislikes)))),this.state.showComments&&null!=e.comments&&e.comments.length>0&&e.comments.map(e=>n.a.createElement(q,{comment:e})),this.state.isLoadingComments&&(!e.comments||!e.comments.length)&&n.a.createElement(C.a,{style:{fontSize:24,color:"#ff306f",marginTop:10},spin:!0}),!this.state.isLoadingComments&&!this.state.showComments&&e.comments_qty>0&&n.a.createElement("a",{onClick:()=>{this.setState({isLoadingComments:!0,showComments:!0}),this.props.onRequestComments()},style:{display:"block",marginLeft:0,marginTop:20,fontWeight:500}},"Ver ",e.comments_qty," comentarios"),this.state.canLeaveComment&&n.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:20}},n.a.createElement("div",{style:{display:"flex",flex:1}},n.a.createElement(_.a,{name:"post_comment",style:{width:"100%",paddingLeft:0,paddingRight:0}},n.a.createElement(_.a.Item,{name:"comment",rules:[{required:!0,message:"Ingresa un comentario"}],style:{marginBottom:0,paddingBottom:0}},n.a.createElement(R.a,{suffix:t,placeholder:"Deja tu comentario",onChange:e=>{this.setState({comment:e.target.value})},style:{borderRadius:2,borderWidth:1,borderColor:"rgba(0,0,0,0.05)",height:40}})))))))))}}F.a.Meta,c.a.Option,R.a.TextArea;class we extends n.a.Component{constructor(e){super(e),this.checkProps=e=>{this.setState({isVisible:e.isVisible}),1==e.isVisible&&0==this.state.isVisible&&this.getNotifications()},this.getNotifications=()=>{this.setState({isLoading:!0}),te.getNotifications(e=>{if(e.success)for(var t in this.setState({notifications:e.notifications,isLoading:!1}),e.notifications)te.updateNotification({id:e.notifications[t].id,seen:!0},e=>{let s=this.state;s[t].seen=!0,this.setState({notifications:s})})},e=>{this.setState({notifications:[],isLoading:!1})})},this.onFinish=()=>{if(this.isValid()){this.setState({isLoading:!0});const e=this.state.friword;ee.postFriword(e,e=>{this.setState({isLoading:!1}),e.success?(this.setState({isVisible:!1,friword:{}}),this.form&&this.form.resetFields(),this.props.onCreated(e.friword)):h.a.open({className:"error",message:"Oops",description:e.message})},e=>{this.setState({isLoading:!1}),h.a.open({className:"error",message:"Oops",description:"Tu friword no pudo ser creado ahora. Intenta en unos momentos."})})}},this.isValid=()=>{const e=this.state.friword;return!(!e||!e.text||e.text.length<10)||(h.a.open({className:"error",message:"Oops",description:"Escribe un texto de al menos 10 caracteres"}),!1)},this.state={isVisible:!1,notifications:[]},this.form=null}componentDidMount(){this.checkProps(this.props)}componentWillReceiveProps(e){this.checkProps(e)}render(){const e=this.state,t=e.notifications;e.friword;return n.a.createElement(ae.a,{title:"Tus notificaciones",visible:this.state.isVisible,closable:!0,onCancel:()=>{this.props.onRequestClose()},footer:null},t&&t.length>0&&t.map(e=>n.a.createElement("div",{style:{width:"100%",marginBottom:10,position:"relative",backgroundColor:e.seen?"white":"rgba(255, 160, 0, .15)",padding:10,borderRadius:5}},n.a.createElement("div",{style:{width:"100%",borderBottomWidth:5,borderBottomColor:"rgba(0,0,0,.05)"},dangerouslySetInnerHTML:{__html:e.html}}),n.a.createElement("span",{style:{display:"block",width:"100%",fontSize:11,marginTop:5,textAlign:"right"}},V()(t.created_at).fromNow()),n.a.createElement("div",{style:{width:"100%",height:5,backgroundColor:"rgba(0,0,0,0.1)",marginTop:10}}))),!t||0==t.length&&n.a.createElement("span",null,"\xa1A\xfan no tienes notificaciones para revisar!"))}}c.a.Option;const Ee=l.a.Title,be=g.a.TabPane;class Ce extends n.a.Component{constructor(e){super(e),this.getMe=()=>{Z.getMe(e=>{if(e.success&&null!=e.user&&(this.setState({user:e.user}),Z.user=e.user,e.user&&!e.user.country_code&&!e.user.ip)){const e="45c816eed2d04a8b96e59ff177c609af";p.a.get("https://api.ipgeolocation.io/ipgeo?apiKey=".concat(e,"&fields=geo&output=json")).then(e=>{if(e&&e.data){const t=e.data;Z.updateMe({country_name:t&&t.country_name,country_code:t&&t.country_code2,ip:t&&t.ip},e=>{e.success&&this.setState({user:e.user})})}})}})},this.getFriwords=()=>{this.setState({isLoading:!0,hasUpdates:!1}),ee.getFriwordsByFilter(this.state.filters,e=>{let t=[],s=[];for(var i in e.friwords){const a=e.friwords[i];x.a.some(this.state.friwords,e=>e.id==a.id&&e.comments&&e.comments.length>0)?t.push(new Promise((e,t)=>{ee.getFriwordById(a.id,t=>{t.success,s.push(t.friword),e()},t=>{s.push(a.friword),e()})})):s.push(a)}Promise.all(t).then(e=>{let t=x.a.orderBy(s,["created_at"],["desc"]);this.state.friwords&&this.state.friwords.length>0&&this.state.filters.page>0&&(t=this.state.friwords.concat(t)),this.setState({isLoading:!1,friwords:t})})},e=>{alert("Estamos teniendo algunos problemas en este momento. Refresca la p\xe1gina en unos segundos."),this.setState({isLoading:!1})})},this.getFriwordById=e=>{ee.getFriwordById(e,e=>{if(e.success){let t=x.a.findIndex(this.state.friwords,t=>t.id==e.friword.id),s=this.state.friwords;s[t]=e.friword,this.setState({friwords:s})}},e=>{})},this.refresh=()=>{this.getFriwords(),this.getMe()},this.isAuthenticated=()=>Z.isAuthenticated(),this.state={friwords:[],filters:{listing_mode:1,page:0},tabActiveKey:"1",isViewingNotifications:!1,isWelcome:!1,isCreating:!1,isLoggingIn:!1,isLoading:!0,hasUpdates:!1,user:null}}componentDidMount(){this.getFriwords(),setInterval(()=>{this.state.friwords&&this.state.friwords.length>0&&ee.hasUpdatesAvailable(x.a.first(this.state.friwords).id,e=>{e.success&&this.setState({hasUpdates:e.hasUpdates})})},1e4),this.getMe()}render(){const e=this.state,t=e.friwords,s=e.filters;return this.state.isWelcome?this.renderWelcome():n.a.createElement("div",{className:"friwords-container"},n.a.createElement("div",{style:{width:"100%",height:45,display:"flex",flexDirection:"row",position:"fixed",top:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",padding:0,backgroundColor:"white",zIndex:9999}},n.a.createElement("div",{style:{height:45,display:"flex",flexDirection:"column",flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white",borderTopLeftRadius:0,borderBottomLeftRadius:10,cursor:"pointer",zIndex:9999,borderLeft:"2px solid rgba(0,0,0,.05)",borderBottom:"2px solid rgba(0,0,0,.05)"}},n.a.createElement("span",{style:{fontWeight:500,fontSize:"0.6em"}},this.state.user&&this.state.user.alias?"@".concat(this.state.user.alias):"-"),n.a.createElement("a",{style:{textDecorationLine:"underline",fontSize:"0.6em"},href:"#",onClick:()=>{this.isAuthenticated()?this.setState({isLoggingIn:!0}):this.setState({isWelcome:!0})}},this.isAuthenticated()?"Cambiar":"Ingresar")),n.a.createElement("div",{className:"counter-online-users",onClick:()=>{this.isAuthenticated()?this.setState({isViewingNotifications:!0}):this.setState({isWelcome:!0})},style:{height:45,display:"flex",flex:0,justifyContent:"center",alignItems:"center",backgroundColor:"white",borderTopLeftRadius:0,cursor:"pointer",zIndex:9999,borderLeft:"2px solid rgba(0,0,0,.05)",borderBottom:"2px solid rgba(0,0,0,.05)",paddingLeft:10,paddingRight:10}},n.a.createElement("span",{style:{fontWeight:600}},null!=this.state.user&&this.state.user.unread_notifications||0),n.a.createElement("img",{style:{width:20,height:20,marginLeft:5,opacity:1},src:"/img/bell-".concat(null!=this.state.user&&this.state.user.unread_notifications>0?"on":"off",".png")})),n.a.createElement("div",{onClick:this.refresh,style:{height:45,display:"flex",flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#25b864",cursor:"pointer",zIndex:9999,borderBottomRightRadius:10,borderLeft:"0px solid rgba(0,0,0,.05)",borderBottom:"2px solid rgba(0,0,0,.2)",opacity:this.state.hasUpdates?1:.6}},n.a.createElement("span",{style:{fontWeight:500,fontSize:"0.6em",color:"white"}},this.state.isLoading?"Actualizando..":"Actualizar"),n.a.createElement("img",{style:{width:30,height:30,marginLeft:10},src:"https://image.flaticon.com/icons/svg/1688/1688988.svg"}))),n.a.createElement("section",{style:{textAlign:"center",marginTop:80,marginBottom:20}},n.a.createElement(Ee,{level:2,className:"Title"},"Friwords")),n.a.createElement("div",{className:"scroll-container"},n.a.createElement(we,{isVisible:this.state.isViewingNotifications,user:this.state.user,onRequestClose:()=>{this.setState({isViewingNotifications:!1},this.getMe)}}),n.a.createElement(oe,{isVisible:this.state.isLoggingIn,onRequestClose:()=>{this.setState({isLoggingIn:!1}),this.state.user.is_configured||this.setState({isWelcome:!0})},onLoggedIn:e=>{this.setState({user:e,isLoggingIn:!1},this.refresh)}}),n.a.createElement(ce,{isVisible:this.state.isCreating,onRequestClose:()=>{this.setState({isCreating:!1})},user:this.state.user,onCreated:e=>{this.setState({isCreating:!1}),s.page=0,s.listing_mode=1,this.setState({filters:s,tabActiveKey:"1"},this.refresh),h.a.open({className:"success",message:n.a.createElement(f.a,{twoToneColor:"#eb2f96"}),description:"Tu friword fue publicado exitosamente en la secci\xf3n `Recientes`"})}}),n.a.createElement("div",{style:{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center"}},n.a.createElement(m.a,{onClick:()=>{this.isAuthenticated()?this.setState({isCreating:!0}):this.setState({isWelcome:!0})},type:"primary",icon:n.a.createElement(y.a,null),style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Publicar friword")),n.a.createElement(g.a,{activeKey:this.state.tabActiveKey,type:"card",onTabClick:e=>{2==e?(s.only_me=!0,s.page=0):(s.only_me=!1,s.listing_mode=e,s.page=0),this.setState({filters:s,tabActiveKey:e},this.getFriwords)},defaultActiveKey:"1"},n.a.createElement(be,{tab:n.a.createElement("span",null,n.a.createElement(w.a,null),"M\xe1s destacados"),key:"0"},t&&t.map((e,t)=>n.a.createElement(ye,{loading:this.state.isLoading,friword:e,comments:e.comments,likes:e.likes_qty,dislikes:e.dislikes_qty,commentsQty:e.comments_qty,user:this.state.user,onLike:()=>{ee.likeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id),this.getMe()},500)})},onDislike:()=>{ee.dislikeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id),this.getMe()},500)})},onRequestComments:()=>{this.getFriwordById(e.id)},onPostedComment:this.getMe})),n.a.createElement(m.a,{onClick:()=>{s.page+=1,this.setState({filters:s},this.getFriwords)},loading:this.state.isLoading,type:"primary",icon:n.a.createElement(E.a,null),style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Cargar m\xe1s")),n.a.createElement(be,{tab:n.a.createElement("span",null,n.a.createElement(b.a,null),"Recientes"),key:"1"},t&&t.map((e,t)=>n.a.createElement(ye,{loading:this.state.isLoading,friword:e,comments:e.comments,likes:e.likes_qty,dislikes:e.dislikes_qty,commentsQty:e.comments_qty,user:this.state.user,onLike:()=>{ee.likeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onDislike:()=>{ee.dislikeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onRequestComments:()=>{this.getFriwordById(e.id)},onPostedComment:this.getMe})),n.a.createElement(m.a,{onClick:()=>{s.page+=1,this.setState({filters:s},this.getFriwords)},type:"primary",icon:n.a.createElement(E.a,null),loading:this.state.isLoading,style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Cargar m\xe1s")),n.a.createElement(be,{tab:n.a.createElement("span",null,n.a.createElement(b.a,null),"M\xedos"),key:"2"},t&&t.map((e,t)=>n.a.createElement(ye,{loading:this.state.isLoading,friword:e,comments:e.comments,likes:e.likes_qty,dislikes:e.dislikes_qty,commentsQty:e.comments_qty,user:this.state.user,onLike:()=>{ee.likeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onDislike:()=>{ee.dislikeById(e.id,t=>{setTimeout(()=>{this.getFriwordById(e.id)},500)})},onRequestComments:()=>{this.getFriwordById(e.id)},onPostedComment:this.getMe})),n.a.createElement(m.a,{onClick:()=>{s.page+=1,this.setState({filters:s},this.getFriwords)},type:"primary",loading:this.state.isLoading,icon:n.a.createElement(E.a,null),style:{display:"flex",width:"80%",margin:"0 auto",marginBottom:20,justifyContent:"center",alignItems:"center",height:40}},"Cargar m\xe1s"))),this.state.isLoading&&n.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}},n.a.createElement(d.a,{indicator:n.a.createElement(C.a,{style:{fontSize:24},spin:!0})}))))}renderWelcome(){return n.a.createElement("div",{className:"friwords-container"},n.a.createElement(ie,{isVisible:this.state.isWelcome,onStart:()=>{this.setState({isWelcome:!1},this.getMe),h.a.open({className:"success",message:n.a.createElement(f.a,{twoToneColor:"#eb2f96"}),description:"Bienvenid@ a Friwords. Empieza leyendo y publicando"}),setTimeout(()=>{this.getFriwords()},3e3)},onRequestLogin:()=>{this.setState({isLoggingIn:!0,isWelcome:!1})}}))}}s(433);c.a.Option,l.a.Title;var ke=()=>n.a.createElement(Ce,null);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(ke,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},59:function(e,t,s){}},[[210,1,2]]]);
//# sourceMappingURL=main.c714a5a4.chunk.js.map