(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{21:function(e,t,a){},43:function(e,t,a){e.exports=a(76)},76:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(14),l=a.n(r),c=a(34),s=a(35),i=a(41),m=a(36),u=a(15),d=a(42),p=a(10),h=a(38),g=(a(21),a(22),function(e){return o.a.createElement(p.a,{bg:"light",style:{width:"18rem"}},o.a.createElement(p.a.Header,null,e.acronym),o.a.createElement(p.a.Body,null,o.a.createElement(p.a.Title,null,e.phrase),o.a.createElement(p.a.Text,null,"Tags: ",e.tags.map((function(e){return o.a.createElement(h.a,{pill:!0,variant:"info"},e)})))))}),E=a(19),y=a(40),f=a(13),v=a(5),b=a(12),S=a.n(b),C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).axiosGetAcronyms=function(e){return S.a.get("http://localhost:3001/api/getAcronyms",{params:{text:e}}).then((function(e){return a.setState({acronyms:e.data}),e.data}))},a.putDataToDB=function(e){console.log("adding data...");for(var t=a.state.data.map((function(e){return e.id})),n=0;t.includes(n);)++n;S.a.post("http://localhost:3001/api/putData",{id:n,message:e})},a.deleteFromDB=function(e){console.log("delting: "+e),parseInt(e);var t=null;a.state.data.forEach((function(a){console.log("dat = "+a.id+"idToDelete ="+e),a.id==e&&(console.log("found it"),t=a._id)})),S.a.delete("http://localhost:3001/api/deleteData",{data:{id:t}})},a.updateDB=function(e,t){var n=null;parseInt(e),a.state.data.forEach((function(t){t.id==e&&(n=t._id)})),S.a.post("http://localhost:3001/api/updateData",{id:n,update:{message:t}})},a.state={id:0,message:null,intervalIsSet:!1,idToDelete:null,idToUpdate:null,objectToUpdate:null,pageContent:"",acronyms:[],addAcronym:!1,reportBug:!1},a.handleMessage=a.handleMessage.bind(Object(u.a)(a)),a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){chrome.runtime.onMessage.addListener(this.handleMessage),chrome.tabs.insertCSS({file:"Tooltip.css"}),console.log("Loaded CSS"),chrome.tabs.executeScript(null,{file:"getPagesSource.js"},(function(){chrome.runtime.lastError&&console.log("There was an error injecting script : \n"+chrome.runtime.lastError.message)}))}},{key:"handleMessage",value:function(e){"getSource"===e.action&&(console.log("msg.source ="+e.source),this.axiosGetAcronyms(e.source).then((function(e){console.log(e)})),this.setState({pageContent:e.source}))}},{key:"componentWillUnmount",value:function(){chrome.runtime.onMessage.removeListener(this.handleMessage),this.state.intervalIsSet&&(clearInterval(this.state.intervalIsSet),this.setState({intervalIsSet:null}))}},{key:"render",value:function(){var e=this,t=["Tag1","Tag2","Tag3"];return o.a.createElement("div",{style:{padding:"20px"}},this.state.acronyms.length>0?o.a.createElement(E.a,{variant:"success"},"We found ",o.a.createElement("b",null,this.state.acronyms.length)," acronyms on this page!"):o.a.createElement(E.a,{variant:"danger"},"Sorry, we didn't find any acronyms. You can manually add one below to help others."),this.state.acronyms.map((function(e){return o.a.createElement(g,{acronym:e,spelledOut:"American Standard Code for Information Interchange",tags:t})})),o.a.createElement(y.a,null,o.a.createElement(f.a,{variant:"primary",onClick:function(){e.setState({addAcronym:!0,reportBug:!1})}},"Add New Acronym"),o.a.createElement(f.a,{variant:"outline-dark",onClick:function(){e.setState({reportBug:!0,addAcronym:!1})}},"Report Bug")),this.state.addAcronym?o.a.createElement(v.a,null,o.a.createElement(v.a.Group,{controlId:"addAcronymForm.acronym"},o.a.createElement(v.a.Label,null,"Acronym"),o.a.createElement(v.a.Control,{placeholder:"TYSM"})),o.a.createElement(v.a.Group,{controlId:"addAcronymForm.phrase"},o.a.createElement(v.a.Label,null,"Phrase"),o.a.createElement(v.a.Control,{placeholder:"Thank You So Much"})),o.a.createElement(v.a.Group,{controlId:"addAcronymForm.tags"},o.a.createElement(v.a.Label,null,"Tags"),o.a.createElement(v.a.Control,{as:"textarea",rows:"5",placeholder:"Tags help us categorize acronyms. Please comma seperate (e.g. automotive, cars, trucks, etc.)"})),o.a.createElement(f.a,{type:"submit",onClick:function(){e.setState({addAcronym:!1})}},"Submit")):null,this.state.reportBug?o.a.createElement(v.a,null,o.a.createElement(v.a.Group,{controlId:"reportBugForm.name"},o.a.createElement(v.a.Label,null,"Name"),o.a.createElement(v.a.Control,{required:!0,type:"text",placeholder:"Mike Rotch"})),o.a.createElement(v.a.Group,{controlId:"reportBugForm.email"},o.a.createElement(v.a.Label,null,"Email address"),o.a.createElement(v.a.Control,{type:"email",placeholder:"name@example.com"})),o.a.createElement(v.a.Group,{controlId:"reportBugForm.message"},o.a.createElement(v.a.Label,null,"Message"),o.a.createElement(v.a.Control,{as:"textarea",rows:"5",placeholder:"My app has crashed! Chrome version: ..."})),o.a.createElement(f.a,{type:"submit",onClick:function(){e.setState({reportBug:!1})}},"Submit")):null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,1,2]]]);
//# sourceMappingURL=main.5f87cfa1.chunk.js.map