"use strict";(self.webpackChunkrs_lang_app=self.webpackChunkrs_lang_app||[]).push([[248],{5248:(X,m,s)=>{s.r(m),s.d(m,{TextbookModule:()=>G});var p=s(6895),g=s(3039),v=s(9594),r=s(4854),e=s(8256),b=s(2229),w=s(4715),k=s(4033),u=s(4333),_=s(529),C=s(9011),y=s(3663),M=s(5889);function O(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",24),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.setEasyWord(o.card.id))}),e.qZA()}}function P(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",25),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.setDifficultWord(o.card.id))}),e.qZA()}}function T(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",1),e.NdJ("mouseenter",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.onMouseOver(o.card.id))})("mouseleave",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.onMouseOut())}),e.TgZ(1,"div",2)(2,"div",3),e._uU(3),e.ALo(4,"uppercase"),e.qZA(),e._UZ(5,"img",4),e.TgZ(6,"div",5),e._uU(7),e.qZA(),e.TgZ(8,"div",6),e._uU(9),e.qZA(),e.TgZ(10,"div",7),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.playAudio(o.card.audio))}),e.qZA(),e.TgZ(11,"div",8),e._uU(12),e.qZA(),e.TgZ(13,"div",9)(14,"div",10),e._uU(15,"LEARN:"),e.qZA(),e.TgZ(16,"div",11),e._uU(17),e.qZA()(),e.TgZ(18,"div",12)(19,"div",13),e._uU(20,"RATE"),e.qZA(),e.TgZ(21,"div",14),e._uU(22),e.qZA()()(),e.TgZ(23,"div",15),e.YNc(24,O,1,0,"div",16),e.YNc(25,P,1,0,"div",17),e._UZ(26,"div",18),e.TgZ(27,"div",19),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.playAudio(o.card.audioMeaning))}),e.qZA(),e._UZ(28,"div",20),e.TgZ(29,"div",21),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.playAudio(o.card.audioExample))}),e.qZA(),e._UZ(30,"div",22)(31,"div",23),e.qZA()()}if(2&i){const t=e.oxw();e.ekj("difficult-word",t.isDifficultWord(t.card.id))("learned-word",t.isEasyWord(t.card.id)),e.xp6(3),e.hij(" ",e.lcZ(4,24,t.responseWordData.difficulty)," "),e.xp6(2),e.hYB("src","",t.source,"",t.card.image,"",e.LSH),e.xp6(2),e.Oqu(t.card.word),e.xp6(2),e.Oqu(t.card.transcription),e.xp6(3),e.Oqu(t.card.wordTranslate),e.xp6(5),e.hij(" ",t.getLearnProgress(t.card.id)," "),e.xp6(5),e.hij(" ",t.getRateValue(t.card.id)," "),e.xp6(1),e.ekj("visible",t.checkIsMore(t.card.id))("difficult-word-additional",t.isDifficultWord(t.card.id))("learned-word-additional",t.isEasyWord(t.card.id)),e.xp6(1),e.Q6J("ngIf",t.isUser()&&(t.isDifficultWord(t.card.id)||t.isNotMarkedWord(t.card.id))),e.xp6(1),e.Q6J("ngIf",t.isUser()&&!t.isDifficultWord(t.card.id)),e.xp6(1),e.Q6J("innerHTML",t.card.textMeaning,e.oJD),e.xp6(2),e.Q6J("innerHTML",t.card.textExample,e.oJD),e.xp6(2),e.Q6J("textContent",t.card.textMeaningTranslate),e.xp6(1),e.Q6J("textContent",t.card.textExampleTranslate)}}let F=(()=>{class i{constructor(t,n,o){this.userDataService=t,this.httpService=n,this.http=o,this.source=r.HQ+r.hn,this.idCard="",this.isMore=!1,this.userWord={id:"",wordId:""},this.userWords=[],this.responseWordData={difficulty:"",optional:{attempts:void 0,success:void 0,rightGuessesInRow:0,dateEasy:void 0,dateFirstTime:void 0}},this.group=0}ngOnInit(){this.userId&&(this.getResponse(this.card.id),this.getUserWords())}onMouseOver(t){this.isMore=!0,this.idCard=t,this.getResponse(this.card.id)}onMouseOut(){this.isMore=!1}checkIsMore(t){return t===this.idCard&&this.isMore}isUser(){return this.userDataService.isRegistered()}playAudio(t){new Audio(this.source+t).play()}isDifficultWord(t){return!!this.isUser()&&(this.userWordsNoFilter?this.userWordsNoFilter.find(n=>n.wordId===t)?.difficulty===r.av.Hard:void 0)}isEasyWord(t){return!!this.isUser()&&(this.userWordsNoFilter?this.userWordsNoFilter.find(n=>n.wordId===t)?.difficulty===r.av.Easy:void 0)}isNotMarkedWord(t){if(this.userWordsNoFilter){const n=this.userWordsNoFilter.find(o=>o.wordId===t)?.difficulty;return n!==r.av.Hard&&n!==r.av.Easy}}setDifficultWord(t){this.setStateOfOfWord(r.av.Hard,t),this.getUserWords()}setEasyWord(t){this.setStateOfOfWord(r.av.Easy,t),this.getUserWords()}isWordInUserWords(t){if(this.userWordsNoFilter)return!!this.userWordsNoFilter.find(n=>n.wordId===t)}setStateOfOfWord(t,n){let o,d=!1;const c={difficulty:t,optional:{rightGuessesInRow:0}},l=r.az.register+r.hn+this.userId+r.az.words+r.hn+n;d=!!this.isWordInUserWords(n),o=d?this.httpService.putData(l,c):this.httpService.postData(l,c),o.subscribe(),this.getUserWords(),this.getResponse(this.card.id)}getLearnProgress(t){let n=3,o=this.responseWordData?.optional?.rightGuessesInRow;return o||(o=0),n=this.isDifficultWord(t)?5:3,`${o}/${n}`}getRateValue(t){let n=0;return this.responseWordData?.optional?.attempts&&this.responseWordData?.optional?.success&&(n=Number((this.responseWordData.optional.success/this.responseWordData.optional.attempts*100).toFixed(1))),`${n}%`}getUserWords(){this.userId&&this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:t=>{this.userWordsNoFilter=t}})}getResponse(t){if(this.userId&&this.isWordInUserWords(t)){let n;n=this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words+r.hn+t),n.subscribe({next:d=>{this.responseWordData=d}})}}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(u.M),e.Y36(b.O),e.Y36(_.eN))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-card"]],inputs:{card:"card",group:"group",userId:"userId",userWordsNoFilter:"userWordsNoFilter"},decls:1,vars:1,consts:[["class","card",3,"difficult-word","learned-word","mouseenter","mouseleave",4,"ngIf"],[1,"card",3,"mouseenter","mouseleave"],[1,"main-part"],[1,"word-status"],["alt","word-image",1,"word-image",3,"src"],[1,"word"],[1,"transcription"],[1,"speaker",3,"click"],[1,"translate"],[1,"learn"],[1,"learn-title"],[1,"learn-value"],[1,"rate"],[1,"rate-title"],[1,"rate-value"],[1,"additional-part"],["class","button-ok",3,"click",4,"ngIf"],["class","button-difficult",3,"click",4,"ngIf"],[1,"meaning",3,"innerHTML"],[1,"speaker-2",3,"click"],[1,"example",3,"innerHTML"],[1,"speaker-3",3,"click"],[1,"meaning-translate",3,"textContent"],[1,"example-translate",3,"textContent"],[1,"button-ok",3,"click"],[1,"button-difficult",3,"click"]],template:function(t,n){1&t&&e.YNc(0,T,32,26,"div",0),2&t&&e.Q6J("ngIf",!(n.group>6&&n.isEasyWord(n.card.id)))},dependencies:[p.O5,p.gd],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.card[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:285px;height:341px;border:2px solid #eeeeee;border-radius:10px;outline:1px dashed #898c9c;outline-offset:-4px;margin-bottom:30px;padding:10px;background-color:#fff}.main-part[_ngcontent-%COMP%]{width:285px;height:300px;background-color:#fff;display:grid;justify-content:center;align-items:center;grid-template-areas:". . s s . ." "a a a a a a" "b . . . . c" "d e . . .  ." "f . . . . g"}.additional-part[_ngcontent-%COMP%]{display:grid;justify-content:center;align-items:center;grid-template-areas:"x y . . . ." "i j j j j j" "k l l l l l" "m m m m m m" "n n n n n n";opacity:0;visibility:hidden;margin-top:-100px;position:relative;width:285px;min-height:260px;background-color:#fff;border-bottom:2px solid #eeeeee;border-left:2px solid #eeeeee;border-right:2px solid #eeeeee;border-radius:0 0 10px 10px;outline:1px dashed #898c9c;outline-offset:-4px;margin-bottom:30px;padding:10px;transition:margin .5s,opacity 1s}.word-status[_ngcontent-%COMP%]{grid-template-areas:s;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;text-decoration:underline}.word-image[_ngcontent-%COMP%]{width:219px;height:165px;grid-area:a;margin-bottom:10px}.speaker[_ngcontent-%COMP%], .speaker-2[_ngcontent-%COMP%], .speaker-3[_ngcontent-%COMP%]{background-image:url(assets/img/speaker.png);background-size:cover;width:12px;min-height:12px;max-height:12px;cursor:pointer}.speaker[_ngcontent-%COMP%]{grid-area:d}.word[_ngcontent-%COMP%]{grid-area:b}.transcription[_ngcontent-%COMP%]{grid-area:e;color:#ba6bd6}.translate[_ngcontent-%COMP%]{grid-area:f}.learn[_ngcontent-%COMP%]{grid-area:c;width:37px;height:33px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#404354}.rate[_ngcontent-%COMP%]{grid-area:g;width:30px;height:33px;display:flex;flex-direction:column;align-content:center;justify-items:center;text-align:center;color:#404354}.rate-title[_ngcontent-%COMP%], .learn-title[_ngcontent-%COMP%]{font-family:New Rubrik Edge;font-style:normal;font-weight:700;font-size:10px;line-height:13px}.rate-value[_ngcontent-%COMP%], .learn-value[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;line-height:18px}.meaning[_ngcontent-%COMP%]{grid-area:j;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354}.example[_ngcontent-%COMP%]{grid-area:l;color:#757575;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354}.meaning-translate[_ngcontent-%COMP%]{grid-area:m;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354}.example-translate[_ngcontent-%COMP%]{grid-area:n;color:#757575;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354}.speaker-2[_ngcontent-%COMP%]{grid-area:i}.speaker-3[_ngcontent-%COMP%]{grid-area:k}.button-ok[_ngcontent-%COMP%]{grid-area:x;background:url(assets/img/ok.png);background-repeat:no-repeat;background-position:center;width:29px;height:28px;border-radius:10px;border:1px dashed #6cd244;display:flex;align-items:center;justify-content:center;margin:5px;cursor:pointer}.button-ok[_ngcontent-%COMP%]:hover{border:1px solid #6cd244}.button-difficult[_ngcontent-%COMP%]{grid-area:y;background:url(assets/img/difficult.png);background-repeat:no-repeat;background-position:center;width:29px;height:28px;border-radius:10px;border:1px dashed red;display:flex;align-items:center;justify-content:center;margin:5px;cursor:pointer}.button-difficult[_ngcontent-%COMP%]:hover{border:1px solid red}.visible[_ngcontent-%COMP%]{opacity:1;visibility:visible;margin-top:0;z-index:8}.difficult-word[_ngcontent-%COMP%]{border:6px solid #eb4949;outline:1px dashed white;outline-offset:-4px}.difficult-word-additional[_ngcontent-%COMP%]{border-bottom:6px solid #eb4949;border-left:6px solid #eb4949;border-right:6px solid #eb4949;outline:1px dashed white;outline-offset:-4px}.learned-word[_ngcontent-%COMP%]{border:6px solid #6cd244;outline:1px dashed white;outline-offset:-4px}.learned-word-additional[_ngcontent-%COMP%]{border-bottom:6px solid #6cd244;border-left:6px solid #6cd244;border-right:6px solid #6cd244;outline:1px dashed white;outline-offset:-4px}.green-rate[_ngcontent-%COMP%]{color:#6cd244}']}),i})();var W=s(3517);const Z=function(i){return["../",i]};function N(i,a){if(1&i&&(e.TgZ(0,"div",2),e._uU(1),e.qZA()),2&i){const t=a.$implicit,n=e.oxw();e.Gre("unit-",t.id,""),e.ekj("big-element",t.id<=n.currentLevel)("unregistered-user",!n.isRegisteredUser(t.id)),e.Q6J("routerLink",e.VKq(9,Z,t.id)),e.xp6(1),e.hij(" ",t.id," ")}}let I=(()=>{class i{constructor(t,n){this.unitsDataService=t,this.userDataService=n,this.units=[],this.currentLevel=1}ngOnInit(){this.units=this.unitsDataService.getUnitsForUser()}isRegisteredUser(t){return t<7||this.userDataService.isRegistered()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(W.q),e.Y36(u.M))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-level-navigation"]],inputs:{currentLevel:"currentLevel"},decls:2,vars:1,consts:[[1,"navigation"],["class","navigation-element",3,"class","big-element","unregistered-user","routerLink",4,"ngFor","ngForOf"],[1,"navigation-element",3,"routerLink"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0),e.YNc(1,N,2,11,"div",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",n.units))},dependencies:[p.sg,g.rH],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.navigation[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:0;gap:10px;isolation:isolate;width:472px;height:50px;background:linear-gradient(90deg,#88e564 2.8%,#45dec2 18.41%,#64c6e5 34.28%,#508be4 49.89%,#ac64e5 65.76%,#e564b9 81.9%,#de4848 97.52%);border:20px solid #ffffff;border-radius:50px;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:20px;line-height:25.46px;color:#fff}.unregistered-user[_ngcontent-%COMP%]{display:none!important}.navigation-element[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:10px;cursor:pointer;gap:10px;transition:.2s}.big-element[_ngcontent-%COMP%], .navigation-element[_ngcontent-%COMP%]:hover{width:50px!important;height:50px!important;border-radius:25px!important}.unit-1[_ngcontent-%COMP%]{width:40px;height:40px;background:#88e564;border:3px solid #ffffff;border-radius:20px;flex:none;z-index:7}.unit-2[_ngcontent-%COMP%]{width:40px;height:40px;background:#45dec3;border:3px solid #ffffff;border-radius:20px;z-index:6}.unit-3[_ngcontent-%COMP%]{width:40px;height:40px;background:#64c6e5;border:3px solid #ffffff;border-radius:20px;z-index:5}.unit-4[_ngcontent-%COMP%]{width:40px;height:40px;background:#508be4;border:3px solid #ffffff;border-radius:20px;z-index:4}.unit-5[_ngcontent-%COMP%]{width:40px;height:40px;background:#ac64e5;border:3px solid #ffffff;border-radius:20px;z-index:3}.unit-6[_ngcontent-%COMP%]{width:40px;height:40px;background:#e564b9;border:3px solid #ffffff;border-radius:20px;z-index:2}.unit-7[_ngcontent-%COMP%]{width:40px;height:40px;background:#eb4949;border:3px solid #ffffff;border-radius:20px;z-index:1}']}),i})();const z=function(i,a,t){return[i,a,t]};function U(i,a){if(1&i&&e._UZ(0,"app-menu-button",10),2&i){const t=e.oxw();e.Q6J("gameName",t.game1)("routerLink",e.kEZ(2,z,t.link1,t.group,t.page+1))}}function L(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"app-menu-button",11),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.setLevelPage([o.group,o.page]))}),e.qZA()}if(2&i){const t=e.oxw();e.Q6J("gameName",t.game2)("routerLink",t.link2)}}function j(i,a){if(1&i&&(e.TgZ(0,"div",12),e._UZ(1,"div",13),e.TgZ(2,"span"),e._uU(3),e.qZA()()),2&i){const t=e.oxw();e.xp6(3),e.Oqu(t.learnedPage)}}function A(i,a){1&i&&e._UZ(0,"div",20)}function D(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",18),e.NdJ("click",function(){const d=e.CHM(t).$implicit,c=e.oxw(2);return e.KtG(c.changePage(d))}),e._uU(1),e.YNc(2,A,1,0,"div",19),e.qZA()}if(2&i){const t=a.$implicit,n=e.oxw(2);e.ekj("current-page",t===n.page+1),e.xp6(1),e.hij(" ",t," "),e.xp6(1),e.Q6J("ngIf",n.isLearnedPage&&n.page===t-1)}}function E(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",14)(1,"div",15),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.pageDown())}),e._uU(2,"<"),e.qZA(),e.YNc(3,D,3,4,"div",16),e.TgZ(4,"span",17),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.pageUp())}),e._uU(5,">"),e.qZA()()}if(2&i){const t=e.oxw();e.xp6(1),e.ekj("disabled",t.page<1),e.xp6(2),e.Q6J("ngForOf",t.pagination()),e.xp6(1),e.ekj("disabled",t.page>28)}}function J(i,a){if(1&i&&(e.TgZ(0,"div"),e._UZ(1,"app-card",21,22),e.qZA()),2&i){const t=a.$implicit,n=e.oxw();e.xp6(1),e.Q6J("card",t)("group",n.group)("userId",n.userId)("userWordsNoFilter",n.userWordsNoFilter)}}function H(i,a){1&i&&e._UZ(0,"div",20)}function S(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",18),e.NdJ("click",function(){const d=e.CHM(t).$implicit,c=e.oxw(2);return e.KtG(c.changePage(d))}),e._uU(1),e.YNc(2,H,1,0,"div",19),e.qZA()}if(2&i){const t=a.$implicit,n=e.oxw(2);e.ekj("current-page",t===n.page+1),e.xp6(1),e.hij(" ",t," "),e.xp6(1),e.Q6J("ngIf",n.isLearnedPage&&n.page===t-1)}}function Q(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",23)(1,"div",15),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.pageDown())}),e._uU(2,"<"),e.qZA(),e.YNc(3,S,3,4,"div",16),e.TgZ(4,"span",17),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.pageUp())}),e._uU(5,">"),e.qZA()()}if(2&i){const t=e.oxw();e.xp6(1),e.ekj("disabled",t.page<1),e.xp6(2),e.Q6J("ngForOf",t.pagination()),e.xp6(1),e.ekj("disabled",t.page>28)}}const Y=[{path:"",component:(()=>{class i{constructor(t,n,o,d,c,l,f,x){this.activatedRoute=t,this.httpService=n,this.textbookDataService=o,this.pagesDataService=d,this.userDataService=c,this.http=l,this.storage=f,this.levelPage=x,this.source=r.HQ+r.hn,this.group=0,this.page=0,this.levels=r.hl,this.cards=[],this.game1=r.G9+r.VS,this.game2=r.G9+r.wL,this.learnedPage=r.Ft,this.link2="../../"+r.dl.sprint,this.link1="../../audio-challenge",this.userId=void 0,this.userWords=[],this.userWordsNoFilter=[],this.learnedPages=[],this.easyCount=0,this.isLearnedPage=!1,this.subscription=this.activatedRoute.params.subscribe(h=>{this.group=h.id,this.isLearnedPage=!1,this.storage.setItem(r.Ki,this.group),this.page=Number(this.storage.getItem(r.Fh))||0,this.userDataService.isRegistered()&&(this.userId=this.userDataService.getUser().userId,this.getUserWords()),7==this.group?(this.cards=[],this.loadDifficultWords(),this.page=0):this.load(),this.getIsLearnedPage(),this.textbookDataService.setCurrentLevel(this.group)})}ngOnInit(){this.load(),this.getUserWords(),this.pagesDataService.setPage(r.Xy.TextBook),this.page=Number(this.storage.getItem(r.Fh))||0,setInterval(()=>this.getIsLearnedPage(),1e3)}ngOnDestroy(){this.subscription.unsubscribe()}pagination(){let t=0;return new Array(30).fill(0).map(n=>(t+=1,n+t))}changePage(t){this.storage.setItem(r.Fh,t-1),this.page=t-1,this.isLearnedPage=!1,this.load()}load(){this.httpService.getData(`/words?group=${this.group-1}&page=${this.page}`).subscribe({next:t=>{this.cards=t,this.getIsLearnedPage()}})}pageDown(){this.page>0&&this.changePage(this.page)}pageUp(){this.page<29&&this.changePage(this.page+2)}loadDifficultWords(){this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:t=>{this.userWords=t,this.userWords=this.userWords.filter(n=>n.difficulty==r.av.Hard),this.userWords.forEach(n=>{this.httpService.getData(`/words/${n.wordId}`).subscribe({next:o=>{this.cards.push(o)}})})}})}getUserWords(){this.userId&&this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:t=>{this.userWordsNoFilter=t}})}isEasyWord(t){return!!this.userId&&(this.userWordsNoFilter?this.userWordsNoFilter.find(n=>n.wordId===t)?.difficulty===r.av.Easy:void 0)}getIsLearnedPage(){this.cards.forEach(t=>{this.isEasyWord(t.id)&&this.easyCount++}),20===this.easyCount&&(this.isLearnedPage=!0),this.easyCount=0}setLevelPage(t){this.levelPage.gamePageLevel=[+t[0],+t[1]]}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(g.gz),e.Y36(b.O),e.Y36(w.H),e.Y36(k.h),e.Y36(u.M),e.Y36(_.eN),e.Y36(C.n),e.Y36(y.z))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-textbook"]],features:[e._Bn([v.s])],decls:13,vars:9,consts:[[1,"title-container"],[1,"title-1"],[3,"currentLevel"],["class","button-1",3,"gameName","routerLink",4,"ngIf"],["class","button-2",3,"gameName","routerLink","click",4,"ngIf"],["class","learned-title",4,"ngIf"],["class","pagination-up",4,"ngIf"],[1,"cards-container"],[4,"ngFor","ngForOf"],["class","pagination",4,"ngIf"],[1,"button-1",3,"gameName","routerLink"],[1,"button-2",3,"gameName","routerLink","click"],[1,"learned-title"],[1,"check-mark"],[1,"pagination-up"],[1,"back",3,"click"],["class","page-number",3,"current-page","click",4,"ngFor","ngForOf"],[1,"forward",3,"click"],[1,"page-number",3,"click"],["class","learned-page",4,"ngIf"],[1,"learned-page"],[3,"card","group","userId","userWordsNoFilter"],["appCard",""],[1,"pagination"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1),e._uU(2,"TEXTBOOK LEVEL:"),e.qZA(),e._UZ(3,"app-level-navigation",2),e.TgZ(4,"div",1),e._uU(5,"PLAY THIS LEVEL:"),e.qZA(),e.YNc(6,U,1,6,"app-menu-button",3),e.YNc(7,L,1,2,"app-menu-button",4),e.YNc(8,j,4,1,"div",5),e.qZA(),e.YNc(9,E,6,5,"div",6),e.TgZ(10,"div",7),e.YNc(11,J,3,4,"div",8),e.qZA(),e.YNc(12,Q,6,5,"div",9)),2&t&&(e.Udp("border","5px solid "+n.levels[n.group-1].color),e.xp6(3),e.Q6J("currentLevel",n.group),e.xp6(3),e.Q6J("ngIf",!n.isLearnedPage),e.xp6(1),e.Q6J("ngIf",!n.isLearnedPage),e.xp6(1),e.Q6J("ngIf",n.isLearnedPage),e.xp6(1),e.Q6J("ngIf",n.group<7),e.xp6(2),e.Q6J("ngForOf",n.cards),e.xp6(1),e.Q6J("ngIf",n.group<7))},dependencies:[p.sg,p.O5,g.rH,M.p,F,I],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.cards-container[_ngcontent-%COMP%]{position:relative;margin:260px auto 200px;width:85vw;display:grid;grid-template-rows:repeat(5,1fr);grid-template-columns:repeat(4,1fr);gap:15px}.page-number[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;display:flex;align-items:center;justify-content:center;margin:0;padding:0;width:30px;height:30px;cursor:pointer}.page-number[_ngcontent-%COMP%]:hover{border-radius:10px;border:1px dashed red;color:red;width:28px;height:28px}.page-number[_ngcontent-%COMP%]:active{background:linear-gradient(180deg,#ff9100 0%,#ffb84d 100%)}.pagination[_ngcontent-%COMP%]{position:relative;height:50px;width:-moz-fit-content;width:fit-content;left:0px;bottom:100px;display:flex;align-items:center;justify-content:center;gap:7px;margin-left:auto;margin-right:auto;color:#404354}.pagination-up[_ngcontent-%COMP%]{position:relative;height:50px;width:-moz-fit-content;width:fit-content;top:200px;display:flex;align-items:center;justify-content:center;margin-left:auto;margin-right:auto;gap:7px;color:#404354}.title[_ngcontent-%COMP%]{text-align:center;position:relative}.current-page[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;width:29px;height:28px;border-radius:10px;border:1px dashed red;color:red;display:flex;align-items:center;justify-content:center}a[_ngcontent-%COMP%]{text-decoration:none;display:block}.title-container[_ngcontent-%COMP%]{position:relative;box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:30px;gap:20px;position:absolute;min-width:1100px;width:85vw;height:110px;top:120px;left:7vw;background:#ffffff;box-shadow:0 4px 4px #00000026;border-radius:10px;z-index:1}.back[_ngcontent-%COMP%], .forward[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:0;width:30px;height:30px;margin:0 10px;cursor:pointer;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354}.back[_ngcontent-%COMP%]:hover, .forward[_ngcontent-%COMP%]:hover{border-radius:10px;border:1px dashed red;color:red;width:28px;height:28px}.back[_ngcontent-%COMP%]:active, .forward[_ngcontent-%COMP%]:active{background:linear-gradient(180deg,#ff9100 0%,#ffb84d 100%)}.disabled[_ngcontent-%COMP%]{color:#b2b3b9;cursor:auto}.disabled[_ngcontent-%COMP%]:hover{width:30px;height:30px;border:none;color:#b2b3b9}.disabled[_ngcontent-%COMP%]:active{background:none}.title-1[_ngcontent-%COMP%], .title-2[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:16px;line-height:20px;margin-left:-20px}  .button-1 button{width:218px}  .button-2 button{width:137px}.learned-page[_ngcontent-%COMP%]{width:10px;height:10px;position:relative;top:-20px;left:10px;background-image:url(/assets/img/learned-page.png)}.learned-title[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0;margin-top:-5px;gap:10px;width:516px;height:50px;background:#6cd244;border-radius:10px;align-self:stretch;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354}.learned-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff}.check-mark[_ngcontent-%COMP%]{background-image:url(/assets/img/check-mark.png);width:24px;height:21px}']}),i})()}];let R=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[g.Bz.forChild(Y),g.Bz]}),i})();var B=s(4466);let G=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[p.ez,R,B.m,g.Bz]}),i})()}}]);