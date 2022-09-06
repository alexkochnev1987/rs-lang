"use strict";(self.webpackChunkrs_lang_app=self.webpackChunkrs_lang_app||[]).push([[248],{5248:(ee,m,a)=>{a.r(m),a.d(m,{TextbookModule:()=>G});var p=a(6895),l=a(3039),v=a(9594),r=a(4854),e=a(8256),b=a(2229),w=a(4715),C=a(4033),u=a(4333),_=a(529),k=a(9011),y=a(3663),M=a(5889);function O(o,s){if(1&o&&(e.TgZ(0,"div",33),e._uU(1),e.ALo(2,"uppercase"),e.qZA()),2&o){const t=e.oxw(2);e.ekj("difficult-status",t.isDifficultWord(t.card.id))("learned-status",t.isEasyWord(t.card.id)),e.xp6(1),e.hij(" ",e.lcZ(2,5,t.responseWordData.difficulty)," ")}}function P(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",34),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.setEasyWord(i.card.id))}),e.qZA()}}function T(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",35),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.setDifficultWord(i.card.id))}),e.qZA()}}function F(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",1),e.NdJ("mouseenter",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onMouseOver(i.card.id))})("mouseleave",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onMouseOut())}),e.TgZ(1,"div",2)(2,"div",3),e.YNc(3,O,3,7,"div",4),e._UZ(4,"img",5),e.TgZ(5,"div",6)(6,"div",7)(7,"div",8),e._uU(8),e.qZA(),e.TgZ(9,"div",9)(10,"div",10),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.playAudio(i.card.audio))}),e._UZ(11,"img",11),e.qZA(),e.TgZ(12,"div",12),e._uU(13),e.qZA()(),e.TgZ(14,"div",13),e._uU(15),e.qZA()(),e.TgZ(16,"div",14)(17,"div",15)(18,"div",16),e._uU(19,"LEARN:"),e.qZA(),e.TgZ(20,"div",17),e._uU(21),e.qZA()(),e.TgZ(22,"div",18)(23,"div",19),e._uU(24,"RATE"),e.qZA(),e.TgZ(25,"div",20),e._uU(26),e.qZA()()()()(),e.TgZ(27,"div",21)(28,"div",22),e.YNc(29,P,1,0,"div",23),e.YNc(30,T,1,0,"div",24),e.qZA(),e.TgZ(31,"div",25)(32,"div",26),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.playAudio(i.card.audioMeaning))}),e._UZ(33,"img",11),e.qZA(),e._UZ(34,"div",27),e.qZA(),e.TgZ(35,"div",28)(36,"div",29),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.playAudio(i.card.audioExample))}),e._UZ(37,"img",11),e.qZA(),e._UZ(38,"div",30),e.qZA(),e._UZ(39,"div",31)(40,"div",32),e.qZA()()()}if(2&o){const t=e.oxw();e.xp6(1),e.ekj("on-top",t.checkIsMore(t.card.id))("difficult-word",t.isDifficultWord(t.card.id))("learned-word",t.isEasyWord(t.card.id)),e.xp6(2),e.Q6J("ngIf","hard"===t.responseWordData.difficulty||"easy"===t.responseWordData.difficulty),e.xp6(1),e.hYB("src","",t.source,"",t.card.image,"",e.LSH),e.xp6(4),e.Oqu(t.card.word),e.xp6(5),e.Oqu(t.card.transcription),e.xp6(2),e.Oqu(t.card.wordTranslate),e.xp6(6),e.hij(" ",t.getLearnProgress(t.card.id)," "),e.xp6(5),e.hij(" ",t.getRateValue(t.card.id)," "),e.xp6(1),e.ekj("visible",t.checkIsMore(t.card.id)),e.xp6(2),e.Q6J("ngIf",t.isUser()&&(t.isDifficultWord(t.card.id)||t.isNotMarkedWord(t.card.id))),e.xp6(1),e.Q6J("ngIf",t.isUser()&&!t.isDifficultWord(t.card.id)),e.xp6(4),e.Q6J("innerHTML",t.card.textMeaning,e.oJD),e.xp6(4),e.Q6J("innerHTML",t.card.textExample,e.oJD),e.xp6(1),e.Q6J("textContent",t.card.textMeaningTranslate),e.xp6(1),e.Q6J("textContent",t.card.textExampleTranslate)}}let Z=(()=>{class o{constructor(t,n,i){this.userDataService=t,this.httpService=n,this.http=i,this.source=r.HQ+r.hn,this.idCard="",this.isMore=!1,this.userWord={id:"",wordId:""},this.userWords=[],this.responseWordData={difficulty:"",optional:{attempts:void 0,success:void 0,rightGuessesInRow:0,dateEasy:void 0,dateFirstTime:void 0}},this.group=0}ngOnInit(){this.userId&&(this.getResponse(this.card.id),this.getUserWords())}onMouseOver(t){this.isMore=!0,this.idCard=t,this.getResponse(this.card.id)}onMouseOut(){this.isMore=!1}checkIsMore(t){return t===this.idCard&&this.isMore}isUser(){return this.userDataService.isRegistered()}playAudio(t){new Audio(this.source+t).play()}isDifficultWord(t){return!!this.isUser()&&(this.userWordsNoFilter?this.userWordsNoFilter.find(n=>n.wordId===t)?.difficulty===r.av.Hard:void 0)}isEasyWord(t){return!!this.isUser()&&(this.userWordsNoFilter?this.userWordsNoFilter.find(n=>n.wordId===t)?.difficulty===r.av.Easy:void 0)}isNotMarkedWord(t){if(this.userWordsNoFilter){const n=this.userWordsNoFilter.find(i=>i.wordId===t)?.difficulty;return n!==r.av.Hard&&n!==r.av.Easy}}setDifficultWord(t){this.setStateOfOfWord(r.av.Hard,t),this.getUserWords()}setEasyWord(t){this.setStateOfOfWord(r.av.Easy,t),this.getUserWords()}isWordInUserWords(t){if(this.userWordsNoFilter)return!!this.userWordsNoFilter.find(n=>n.wordId===t)}setStateOfOfWord(t,n){let i,d=!1;const c={difficulty:t,optional:{rightGuessesInRow:0}},g=r.az.register+r.hn+this.userId+r.az.words+r.hn+n;d=!!this.isWordInUserWords(n),i=d?this.httpService.putData(g,c):this.httpService.postData(g,c),i.subscribe(),this.getUserWords(),this.getResponse(this.card.id)}getLearnProgress(t){let n=3,i=this.responseWordData?.optional?.rightGuessesInRow;return i||(i=0),n=this.isDifficultWord(t)?5:3,`${i}/${n}`}getRateValue(t){let n=0;return this.responseWordData?.optional?.attempts&&this.responseWordData?.optional?.success&&(n=Number((this.responseWordData.optional.success/this.responseWordData.optional.attempts*100).toFixed(1))),`${n}%`}getUserWords(){this.userId&&this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:t=>{this.userWordsNoFilter=t}})}getResponse(t){if(this.userId&&this.isWordInUserWords(t)){let n;n=this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words+r.hn+t),n.subscribe({next:d=>{this.responseWordData=d}})}}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(u.M),e.Y36(b.O),e.Y36(_.eN))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-card"]],inputs:{card:"card",group:"group",userId:"userId",userWordsNoFilter:"userWordsNoFilter"},decls:1,vars:1,consts:[["class","card",3,"mouseenter","mouseleave",4,"ngIf"],[1,"card",3,"mouseenter","mouseleave"],[1,"dashed-container"],[1,"main-part"],["class","word-status",3,"difficult-status","learned-status",4,"ngIf"],["alt","word-image",1,"word-image",3,"src"],[1,"word-bottom"],[1,"word-info"],[1,"word"],[1,"translate-section"],[1,"speaker",3,"click"],["src","assets/img/speaker.svg","alt","speaker"],[1,"transcription"],[1,"translate"],[1,"word-progress"],[1,"learn"],[1,"learn-title"],[1,"learn-value"],[1,"rate"],[1,"rate-title"],[1,"rate-value"],[1,"additional-part"],[1,"state-buttons"],["class","button-ok",3,"click",4,"ngIf"],["class","button-difficult",3,"click",4,"ngIf"],[1,"meaning-section"],[1,"speaker-2",3,"click"],[1,"meaning",3,"innerHTML"],[1,"example-section"],[1,"speaker-3",3,"click"],[1,"example",3,"innerHTML"],[1,"meaning-translate",3,"textContent"],[1,"example-translate",3,"textContent"],[1,"word-status"],[1,"button-ok",3,"click"],[1,"button-difficult",3,"click"]],template:function(t,n){1&t&&e.YNc(0,F,41,22,"div",0),2&t&&e.Q6J("ngIf",!(n.group>6&&n.isEasyWord(n.card.id)))},dependencies:[p.O5,p.gd],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;min-height:calc(100vh - 200px);margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;flex-shrink:0;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.dashed-container[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:30px;outline:1px dashed #898c9c;outline-offset:-4px;box-shadow:0 4px 4px #00000026}.underline[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:3px;left:0;width:100%;height:5px;border-radius:2.5px;background-color:#66cee9;z-index:-1}.card[_ngcontent-%COMP%]{position:relative;width:-moz-fit-content;width:fit-content;height:326px}.dashed-container[_ngcontent-%COMP%]{border:6px solid white;position:absolute;box-sizing:border-box;padding:27px;transform:scale(1);transition:.5s}.main-part[_ngcontent-%COMP%]{width:220px;background-color:#fff;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding-bottom:15px;box-sizing:border-box}.word-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;gap:10px}.translate-section[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:center;gap:10px}.word-progress[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;align-items:center;gap:10px}.word-bottom[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;width:100%;margin-top:10px}.additional-part[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:20px;opacity:0;visibility:hidden;margin-top:-20px;height:0;transition:margin .5s,opacity 1s}.state-buttons[_ngcontent-%COMP%], .meaning-section[_ngcontent-%COMP%], .example-section[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:flex-start;gap:10px}.word-status[_ngcontent-%COMP%]{position:absolute;top:-18px;padding:10px 15px 7px;background-color:#fff;border-radius:10px;outline:1px dashed #898c9c;outline-offset:-4px;font-family:New Rubrik Edge;font-style:normal;font-weight:700;font-size:10px;line-height:13px;font-weight:800}.difficult-status[_ngcontent-%COMP%]{background-color:red;outline:1px dashed white;outline-offset:-4px;color:#fff}.learned-status[_ngcontent-%COMP%]{background-color:#6cd244;outline:1px dashed white;outline-offset:-4px;color:#fff}.word-image[_ngcontent-%COMP%]{width:219px;height:165px;margin-bottom:10px}.speaker[_ngcontent-%COMP%], .speaker-2[_ngcontent-%COMP%], .speaker-3[_ngcontent-%COMP%]{width:16px;height:16px;cursor:pointer}.word[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:500;font-size:20px;color:#404354;text-transform:capitalize}.transcription[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#ba6bd6}.translate[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354}.learn[_ngcontent-%COMP%]{width:37px;height:33px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#404354}.rate[_ngcontent-%COMP%]{width:30px;height:33px;display:flex;flex-direction:column;align-content:center;justify-items:center;text-align:center;color:#404354}.rate-title[_ngcontent-%COMP%], .learn-title[_ngcontent-%COMP%]{font-family:New Rubrik Edge;font-style:normal;font-weight:700;font-size:10px;line-height:13px;font-weight:800}.rate-value[_ngcontent-%COMP%], .learn-value[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;line-height:18px;font-weight:800}.meaning[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354}.example[_ngcontent-%COMP%]{color:#757575;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354}.meaning-translate[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354}.example-translate[_ngcontent-%COMP%]{color:#757575;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354}.button-ok[_ngcontent-%COMP%]{background:url(assets/img/ok.png);background-repeat:no-repeat;background-position:center;width:29px;height:28px;border-radius:10px;border:1px dashed #6cd244;display:flex;align-items:center;justify-content:center;cursor:pointer}.button-ok[_ngcontent-%COMP%]:hover{border:1px solid #6cd244}.button-difficult[_ngcontent-%COMP%]{background:url(assets/img/difficult.png);background-repeat:no-repeat;background-position:center;width:29px;height:28px;border-radius:10px;border:1px dashed red;display:flex;align-items:center;justify-content:center;cursor:pointer}.button-difficult[_ngcontent-%COMP%]:hover{border:1px solid red}.visible[_ngcontent-%COMP%]{opacity:1;visibility:visible;margin-top:0;height:-moz-fit-content;height:fit-content;z-index:8}.on-top[_ngcontent-%COMP%]{z-index:8;transform:scale(1.05)}.difficult-word[_ngcontent-%COMP%]{border:6px solid #eb4949;outline:1px dashed white;outline-offset:-4px;box-sizing:border-box}.difficult-word-additional[_ngcontent-%COMP%]{border-bottom:6px solid #eb4949;border-left:6px solid #eb4949;border-right:6px solid #eb4949;outline:1px dashed white;outline-offset:-4px}.learned-word[_ngcontent-%COMP%]{border:6px solid #6cd244;outline:1px dashed white;outline-offset:-4px;box-sizing:content-box}.learned-word-additional[_ngcontent-%COMP%]{border-bottom:6px solid #6cd244;border-left:6px solid #6cd244;border-right:6px solid #6cd244;outline:1px dashed white;outline-offset:-4px}.green-rate[_ngcontent-%COMP%]{color:#6cd244}']}),o})();var W=a(3517);const z=function(o){return["../",o]};function I(o,s){if(1&o&&(e.TgZ(0,"div",2),e._uU(1),e.qZA()),2&o){const t=s.$implicit,n=e.oxw();e.Gre("unit-",t.id,""),e.ekj("big-element",t.id<=n.currentLevel)("unregistered-user",!n.isRegisteredUser(t.id)),e.Q6J("routerLink",e.VKq(9,z,t.id)),e.xp6(1),e.hij(" ",t.id," ")}}let N=(()=>{class o{constructor(t,n){this.unitsDataService=t,this.userDataService=n,this.units=[],this.currentLevel=1}ngOnInit(){this.units=this.unitsDataService.getUnitsForUser()}isRegisteredUser(t){return t<7||this.userDataService.isRegistered()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(W.q),e.Y36(u.M))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-level-navigation"]],inputs:{currentLevel:"currentLevel"},decls:2,vars:1,consts:[[1,"navigation"],["class","navigation-element",3,"class","big-element","unregistered-user","routerLink",4,"ngFor","ngForOf"],[1,"navigation-element",3,"routerLink"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0),e.YNc(1,I,2,11,"div",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",n.units))},dependencies:[p.sg,l.rH],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;min-height:calc(100vh - 200px);margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;flex-shrink:0;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.dashed-container[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:30px;outline:1px dashed #898c9c;outline-offset:-4px;box-shadow:0 4px 4px #00000026}.underline[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:3px;left:0;width:100%;height:5px;border-radius:2.5px;background-color:#66cee9;z-index:-1}.navigation[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:0;gap:10px;isolation:isolate;width:472px;height:50px;background:linear-gradient(90deg,#88e564 2.8%,#45dec2 18.41%,#64c6e5 34.28%,#508be4 49.89%,#ac64e5 65.76%,#e564b9 81.9%,#de4848 97.52%);border:20px solid #ffffff;border-radius:50px;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:20px;line-height:25.46px;color:#fff}.unregistered-user[_ngcontent-%COMP%]{display:none!important}.navigation-element[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:10px;cursor:pointer;gap:10px;transition:.2s}.big-element[_ngcontent-%COMP%], .navigation-element[_ngcontent-%COMP%]:hover{width:50px!important;height:50px!important;border-radius:25px!important}.unit-1[_ngcontent-%COMP%]{width:40px;height:40px;background:#88e564;border:3px solid #ffffff;border-radius:20px;flex:none;z-index:7}.unit-2[_ngcontent-%COMP%]{width:40px;height:40px;background:#45dec3;border:3px solid #ffffff;border-radius:20px;z-index:6}.unit-3[_ngcontent-%COMP%]{width:40px;height:40px;background:#64c6e5;border:3px solid #ffffff;border-radius:20px;z-index:5}.unit-4[_ngcontent-%COMP%]{width:40px;height:40px;background:#508be4;border:3px solid #ffffff;border-radius:20px;z-index:4}.unit-5[_ngcontent-%COMP%]{width:40px;height:40px;background:#ac64e5;border:3px solid #ffffff;border-radius:20px;z-index:3}.unit-6[_ngcontent-%COMP%]{width:40px;height:40px;background:#e564b9;border:3px solid #ffffff;border-radius:20px;z-index:2}.unit-7[_ngcontent-%COMP%]{width:40px;height:40px;background:#eb4949;border:3px solid #ffffff;border-radius:20px;z-index:1}']}),o})();const U=function(o,s,t){return[o,s,t]};function A(o,s){if(1&o&&e._UZ(0,"app-menu-button",10),2&o){const t=e.oxw();e.Q6J("gameName",t.game1)("routerLink",e.kEZ(2,U,t.link1,t.group,t.page+1))}}function D(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"app-menu-button",11),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.setLevelPage([i.group,i.page]))}),e.qZA()}if(2&o){const t=e.oxw();e.Q6J("gameName",t.game2)("routerLink",t.link2)}}function L(o,s){if(1&o&&(e.TgZ(0,"div",12),e._UZ(1,"div",13),e.TgZ(2,"span"),e._uU(3),e.qZA()()),2&o){const t=e.oxw();e.xp6(3),e.Oqu(t.learnedPage)}}function j(o,s){1&o&&e._UZ(0,"div",20)}function E(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",18),e.NdJ("click",function(){const d=e.CHM(t).$implicit,c=e.oxw(2);return e.KtG(c.changePage(d))}),e._uU(1),e.YNc(2,j,1,0,"div",19),e.qZA()}if(2&o){const t=s.$implicit,n=e.oxw(2);e.ekj("current-page",t===n.page+1),e.xp6(1),e.hij(" ",t," "),e.xp6(1),e.Q6J("ngIf",n.isLearnedPage&&n.page===t-1)}}function J(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",14)(1,"div",15),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.pageDown())}),e._uU(2,"<"),e.qZA(),e.YNc(3,E,3,4,"div",16),e.TgZ(4,"span",17),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.pageUp())}),e._uU(5,">"),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(1),e.ekj("disabled",t.page<1),e.xp6(2),e.Q6J("ngForOf",t.pagination()),e.xp6(1),e.ekj("disabled",t.page>28)}}function H(o,s){if(1&o&&(e.TgZ(0,"div"),e._UZ(1,"app-card",21,22),e.qZA()),2&o){const t=s.$implicit,n=e.oxw();e.xp6(1),e.Q6J("card",t)("group",n.group)("userId",n.userId)("userWordsNoFilter",n.userWordsNoFilter)}}function S(o,s){1&o&&e._UZ(0,"div",20)}function Q(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",18),e.NdJ("click",function(){const d=e.CHM(t).$implicit,c=e.oxw(2);return e.KtG(c.changePage(d))}),e._uU(1),e.YNc(2,S,1,0,"div",19),e.qZA()}if(2&o){const t=s.$implicit,n=e.oxw(2);e.ekj("current-page",t===n.page+1),e.xp6(1),e.hij(" ",t," "),e.xp6(1),e.Q6J("ngIf",n.isLearnedPage&&n.page===t-1)}}function Y(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div",23)(1,"div",15),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.pageDown())}),e._uU(2,"<"),e.qZA(),e.YNc(3,Q,3,4,"div",16),e.TgZ(4,"span",17),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.pageUp())}),e._uU(5,">"),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(1),e.ekj("disabled",t.page<1),e.xp6(2),e.Q6J("ngForOf",t.pagination()),e.xp6(1),e.ekj("disabled",t.page>28)}}const R=[{path:"",component:(()=>{class o{constructor(t,n,i,d,c,g,f,x){this.activatedRoute=t,this.httpService=n,this.textbookDataService=i,this.pagesDataService=d,this.userDataService=c,this.http=g,this.storage=f,this.levelPage=x,this.source=r.HQ+r.hn,this.group=0,this.page=0,this.levels=r.hl,this.cards=[],this.game1=r.G9+r.VS,this.game2=r.G9+r.wL,this.learnedPage=r.Ft,this.link2="../../"+r.dl.sprint,this.link1="../../audio-challenge",this.userId=void 0,this.userWords=[],this.userWordsNoFilter=[],this.learnedPages=[],this.easyCount=0,this.isLearnedPage=!1,this.subscription=this.activatedRoute.params.subscribe(h=>{this.group=h.id,this.isLearnedPage=!1,this.storage.setItem(r.Ki,this.group),this.page=Number(this.storage.getItem(r.Fh))||0,this.userDataService.isRegistered()&&(this.userId=this.userDataService.getUser().userId,this.getUserWords()),7==this.group?(this.cards=[],this.loadDifficultWords(),this.page=0):this.load(),this.getIsLearnedPage(),this.textbookDataService.setCurrentLevel(this.group)})}ngOnInit(){this.load(),this.getUserWords(),this.pagesDataService.setPage(r.Xy.TextBook),this.page=Number(this.storage.getItem(r.Fh))||0,setInterval(()=>this.getIsLearnedPage(),1e3)}ngOnDestroy(){this.subscription.unsubscribe()}pagination(){let t=0;return new Array(30).fill(0).map(n=>(t+=1,n+t))}changePage(t){this.storage.setItem(r.Fh,t-1),this.page=t-1,this.isLearnedPage=!1,this.load()}load(){this.httpService.getData(`/words?group=${this.group-1}&page=${this.page}`).subscribe({next:t=>{this.cards=t,this.getIsLearnedPage()}})}pageDown(){this.page>0&&this.changePage(this.page)}pageUp(){this.page<29&&this.changePage(this.page+2)}loadDifficultWords(){this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:t=>{this.userWords=t,this.userWords=this.userWords.filter(n=>n.difficulty==r.av.Hard),this.userWords.forEach(n=>{this.httpService.getData(`/words/${n.wordId}`).subscribe({next:i=>{this.cards.push(i)}})})}})}getUserWords(){this.userId&&this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:t=>{this.userWordsNoFilter=t}})}isEasyWord(t){return!!this.userId&&(this.userWordsNoFilter?this.userWordsNoFilter.find(n=>n.wordId===t)?.difficulty===r.av.Easy:void 0)}getIsLearnedPage(){this.cards.forEach(t=>{this.isEasyWord(t.id)&&this.easyCount++}),20===this.easyCount&&(this.isLearnedPage=!0),this.easyCount=0}setLevelPage(t){this.levelPage.gamePageLevel=[+t[0],+t[1]]}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(l.gz),e.Y36(b.O),e.Y36(w.H),e.Y36(C.h),e.Y36(u.M),e.Y36(_.eN),e.Y36(k.n),e.Y36(y.z))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-textbook"]],features:[e._Bn([v.s])],decls:13,vars:9,consts:[[1,"title-container"],[1,"title-1"],[3,"currentLevel"],["class","game-button",3,"gameName","routerLink",4,"ngIf"],["class","game-button",3,"gameName","routerLink","click",4,"ngIf"],["class","learned-title",4,"ngIf"],["class","pagination-up",4,"ngIf"],[1,"cards-container"],[4,"ngFor","ngForOf"],["class","pagination",4,"ngIf"],[1,"game-button",3,"gameName","routerLink"],[1,"game-button",3,"gameName","routerLink","click"],[1,"learned-title"],[1,"check-mark"],[1,"pagination-up"],[1,"back",3,"click"],["class","page-number",3,"current-page","click",4,"ngFor","ngForOf"],[1,"forward",3,"click"],[1,"page-number",3,"click"],["class","learned-page",4,"ngIf"],[1,"learned-page"],[3,"card","group","userId","userWordsNoFilter"],["appCard",""],[1,"pagination"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1),e._uU(2,"TEXTBOOK LEVEL:"),e.qZA(),e._UZ(3,"app-level-navigation",2),e.TgZ(4,"div",1),e._uU(5,"PLAY THIS LEVEL:"),e.qZA(),e.YNc(6,A,1,6,"app-menu-button",3),e.YNc(7,D,1,2,"app-menu-button",4),e.YNc(8,L,4,1,"div",5),e.qZA(),e.YNc(9,J,6,5,"div",6),e.TgZ(10,"div",7),e.YNc(11,H,3,4,"div",8),e.qZA(),e.YNc(12,Y,6,5,"div",9)),2&t&&(e.Udp("border","5px solid "+n.levels[n.group-1].color),e.xp6(3),e.Q6J("currentLevel",n.group),e.xp6(3),e.Q6J("ngIf",!n.isLearnedPage),e.xp6(1),e.Q6J("ngIf",!n.isLearnedPage),e.xp6(1),e.Q6J("ngIf",n.isLearnedPage),e.xp6(1),e.Q6J("ngIf",n.group<7),e.xp6(2),e.Q6J("ngForOf",n.cards),e.xp6(1),e.Q6J("ngIf",n.group<7))},dependencies:[p.sg,p.O5,l.rH,M.p,Z,N],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;min-height:calc(100vh - 200px);margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;flex-shrink:0;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.dashed-container[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:30px;outline:1px dashed #898c9c;outline-offset:-4px;box-shadow:0 4px 4px #00000026}.underline[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:3px;left:0;width:100%;height:5px;border-radius:2.5px;background-color:#66cee9;z-index:-1}.cards-container[_ngcontent-%COMP%]{position:relative;margin-bottom:50px;margin-left:auto;margin-right:auto;width:1230px;display:grid;grid-template-rows:repeat(5,1fr);grid-template-columns:repeat(4,1fr);gap:30px}.page-number[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;display:flex;align-items:center;justify-content:center;margin:0;padding:0;width:30px;height:30px;cursor:pointer;transform:scale(1);transition:.2s;box-sizing:border-box}.page-number[_ngcontent-%COMP%]:hover{border-radius:10px;border:1px dashed #FF9100;color:#ff9100;width:28px;height:28px}.page-number[_ngcontent-%COMP%]:active{transform:scale(.9)}.pagination[_ngcontent-%COMP%], .pagination-up[_ngcontent-%COMP%]{position:relative;height:50px;width:-moz-fit-content;width:fit-content;display:flex;align-items:center;justify-content:center;margin:30px auto;gap:5px;color:#404354}.title[_ngcontent-%COMP%]{text-align:center;position:relative}.current-page[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;color:#ff9100;width:29px;height:28px;border-radius:10px;border:1px dashed #FF9100;display:flex;align-items:center;justify-content:center;box-sizing:border-box}a[_ngcontent-%COMP%]{text-decoration:none;display:block}.title-container[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:30px;gap:20px;position:relative;width:1230px;height:110px;background:#ffffff;box-shadow:0 4px 4px #00000026;border-radius:10px;margin-top:20px;z-index:1}.back[_ngcontent-%COMP%], .forward[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:0;width:30px;height:30px;margin:0 10px;cursor:pointer;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;transition:.2s;box-sizing:border-box}.back[_ngcontent-%COMP%]:hover, .forward[_ngcontent-%COMP%]:hover{border-radius:10px;border:1px dashed #FF9100;color:#ff9100;width:28px;height:28px}.back[_ngcontent-%COMP%]:active, .forward[_ngcontent-%COMP%]:active{transform:scale(.9)}.disabled[_ngcontent-%COMP%]{color:#b2b3b9;cursor:auto}.disabled[_ngcontent-%COMP%]:hover{width:30px;height:30px;border:none;color:#b2b3b9}.disabled[_ngcontent-%COMP%]:active{background:none}.title-1[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:16px;line-height:20px;margin-left:-20px;white-space:nowrap}  .button-1 button{width:218px}  .button-2 button{width:137px}.learned-page[_ngcontent-%COMP%]{width:10px;height:10px;position:relative;top:-20px;left:10px;background-image:url(assets/img/learned-page.png)}.learned-title[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0;margin-top:-5px;gap:10px;width:516px;height:50px;background:#6cd244;border-radius:10px;align-self:stretch;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354}.learned-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff}.check-mark[_ngcontent-%COMP%]{background-image:url(assets/img/check-mark.png);width:24px;height:21px}.game-button[_ngcontent-%COMP%]{width:min-content;white-space:nowrap}']}),o})()}];let q=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[l.Bz.forChild(R),l.Bz]}),o})();var B=a(4466);let G=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[p.ez,q,B.m,l.Bz]}),o})()}}]);