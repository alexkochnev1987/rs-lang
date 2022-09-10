"use strict";(self.webpackChunkrs_lang_app=self.webpackChunkrs_lang_app||[]).push([[274],{8274:(yt,F,d)=>{d.r(F),d.d(F,{AudioChallengeModule:()=>wt});var C=d(6895),b=d(3039),D=d(4128),Z=d(8505),z=d(9751),N=d(727);class W extends N.w0{constructor(s,e){super()}schedule(s,e=0){return this}}const P={setInterval(i,s,...e){const{delegate:n}=P;return n?.setInterval?n.setInterval(i,s,...e):setInterval(i,s,...e)},clearInterval(i){const{delegate:s}=P;return(s?.clearInterval||clearInterval)(i)},delegate:void 0};var R=d(8737);const G={now:()=>(G.delegate||Date).now(),delegate:void 0};class _{constructor(s,e=_.now){this.schedulerActionCtor=s,this.now=e}schedule(s,e=0,n){return new this.schedulerActionCtor(this,s).schedule(n,e)}}_.now=G.now;const L=new class U extends _{constructor(s,e=_.now){super(s,e),this.actions=[],this._active=!1,this._scheduled=void 0}flush(s){const{actions:e}=this;if(this._active)return void e.push(s);let n;this._active=!0;do{if(n=s.execute(s.state,s.delay))break}while(s=e.shift());if(this._active=!1,n){for(;s=e.shift();)s.unsubscribe();throw n}}}(class E extends W{constructor(s,e){super(s,e),this.scheduler=s,this.work=e,this.pending=!1}schedule(s,e=0){if(this.closed)return this;this.state=s;const n=this.id,o=this.scheduler;return null!=n&&(this.id=this.recycleAsyncId(o,n,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(o,this.id,e),this}requestAsyncId(s,e,n=0){return P.setInterval(s.flush.bind(s,this),n)}recycleAsyncId(s,e,n=0){if(null!=n&&this.delay===n&&!1===this.pending)return e;P.clearInterval(e)}execute(s,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const n=this._execute(s,e);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(s,e){let o,n=!1;try{this.work(s)}catch(a){n=!0,o=a||new Error("Scheduled action threw falsy error")}if(n)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){const{id:s,scheduler:e}=this,{actions:n}=e;this.work=this.state=this.scheduler=null,this.pending=!1,(0,R.P)(n,this),null!=s&&(this.id=this.recycleAsyncId(e,s,null)),this.delay=null,super.unsubscribe()}}});var J=d(3532);var Q=d(5577),r=d(4854),H=d(7517),t=d(8256),q=d(4033),Y=d(529),K=d(2229),V=d(4333),$=d(9237),X=d(5889),tt=d(5249);function et(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"div",13)(1,"div")(2,"span"),t._uU(3),t.qZA()(),t.TgZ(4,"div",14)(5,"div",15),t.NdJ("click",function(){const a=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.playAudio(a.word.audio))}),t.qZA(),t.TgZ(6,"div",16),t._uU(7),t.qZA()(),t.TgZ(8,"div",17),t._uU(9),t.qZA()()}if(2&i){const e=s.$implicit;t.xp6(2),t.Tol(e.success?"green":"red"),t.xp6(1),t.Oqu(e.word.word),t.xp6(4),t.Oqu(e.word.transcription),t.xp6(2),t.Oqu(e.word.wordTranslate)}}function nt(i,s){if(1&i&&(t.TgZ(0,"div",10)(1,"div",11)(2,"div"),t._uU(3,"WORD"),t.qZA(),t.TgZ(4,"div"),t._uU(5,"TRANSCRIPTION"),t.qZA(),t.TgZ(6,"div"),t._uU(7,"TRANSLATION"),t.qZA()(),t.YNc(8,et,10,6,"div",12),t.qZA()),2&i){const e=t.oxw();t.xp6(8),t.Q6J("ngForOf",e.gameStatistics)}}let it=(()=>{class i{constructor(){this.totalAttempts=r.vF,this.title=r.db,this.source=r.HQ+r.hn,this.mainPageLink="../../../",this.backlink="../../",this.attempts=0,this.duration=0,this.rightAnswersCount=0,this.rightAnswersPercent=0,this.playAgain=new t.vpe}playGame(e){this.playAgain.emit(e)}playAudio(e){new Audio(this.source+e).play()}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-audio-challenge-statistics"]],inputs:{attempts:"attempts",gameStatistics:"gameStatistics",duration:"duration",rightAnswersCount:"rightAnswersCount",rightAnswersPercent:"rightAnswersPercent"},outputs:{playAgain:"playAgain"},decls:19,vars:7,consts:[[1,"heading-1","underline"],[1,"stats-container"],[1,"stats-head"],[1,"game-stats"],[1,"success"],[1,"green"],[1,"stats-buttons"],[1,"button-green",3,"click"],[1,"button-orange",3,"routerLink"],["class","words-stats",4,"ngIf"],[1,"words-stats"],[1,"stats-header"],["class","word-stat",4,"ngFor","ngForOf"],[1,"word-stat"],[1,"stats-transcription"],[1,"transcription-audio",3,"click"],[1,"transcription-word"],[1,"word-translation"]],template:function(e,n){1&e&&(t.TgZ(0,"h1",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4),t._uU(6," PLAY TIME: "),t.TgZ(7,"span",5),t._uU(8),t.qZA()(),t.TgZ(9,"div",4),t._uU(10," CORRECT: "),t.TgZ(11,"span",5),t._uU(12),t.qZA()()(),t.TgZ(13,"div",6)(14,"button",7),t.NdJ("click",function(){return n.playGame(!0)}),t._uU(15,"play again"),t.qZA(),t.TgZ(16,"button",8),t._uU(17," leave game "),t.qZA()()(),t.YNc(18,nt,9,1,"div",9),t.qZA()),2&e&&(t.xp6(1),t.Oqu(n.title),t.xp6(7),t.hij(" ",n.duration,"\xa0sec. "),t.xp6(4),t.lnq(" ",n.rightAnswersCount," / ",n.attempts," (",n.rightAnswersPercent,"%) "),t.xp6(4),t.Q6J("routerLink",n.mainPageLink),t.xp6(2),t.Q6J("ngIf",n.gameStatistics.length>0))},dependencies:[C.sg,C.O5,b.rH],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;min-height:calc(100vh - 200px);margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;flex-shrink:0;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.dashed-container[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:30px;outline:1px dashed #898c9c;outline-offset:-4px;box-shadow:0 4px 4px #00000026}.underline[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:3px;left:0;width:100%;height:5px;border-radius:2.5px;background-color:#66cee9;z-index:-1}@media (min-width: 768px) and (max-width: 1279.99px){.router-wrapper[_ngcontent-%COMP%]{width:750px;margin:100px auto 0}.dashed-container[_ngcontent-%COMP%]{padding:20px}}@media (max-width: 767.99px){.router-wrapper[_ngcontent-%COMP%]{width:calc(100% - 20px);margin:100px auto 0}.dashed-container[_ngcontent-%COMP%]{padding:10px}.button-orange[_ngcontent-%COMP%], .button-green[_ngcontent-%COMP%]{padding:0 10px}}.stats-container[_ngcontent-%COMP%]{border:1px dashed #898c9c;outline:3px solid #ffffff;border-radius:10px;box-shadow:0 4px 4px 3px #00000026;background-color:#fff;box-sizing:border-box;display:flex;flex-direction:column;gap:30px;padding:30px;width:480px;margin:3px auto}.heading-1[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:32px;text-transform:uppercase;width:500px;text-align:center;margin-left:auto;margin-right:auto}.green[_ngcontent-%COMP%]{color:#6cd244}.red[_ngcontent-%COMP%]{color:#eb4949}.game-word[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;justify-content:space-between;align-items:center}.stats-buttons[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-end;gap:10px}.game-stats[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:16px;text-transform:uppercase;display:flex;flex-direction:column;justify-content:space-between}.success[_ngcontent-%COMP%]{margin-top:10px}.word-stats[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.stats-header[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354;font-weight:800;display:grid;align-items:center;grid-template-columns:1fr 1fr 1fr;color:#fff;background-color:#42bee5;height:45px;padding:0 10px;border-radius:10px 10px 0 0}.word-stat[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;display:grid;align-items:center;grid-template-columns:1fr 1fr 1fr;height:35px;padding:0 10px}.word-stat[_ngcontent-%COMP%]:nth-child(2n-1){background-color:#f5f5f5}.word-stat[_ngcontent-%COMP%]:last-child{border-radius:0 0 10px 10px}.stats-transcription[_ngcontent-%COMP%]{display:flex}.transcription-audio[_ngcontent-%COMP%]{width:14px;height:14px;background-image:url(assets/img/speaker.png);background-position:center;background-size:100%;background-repeat:no-repeat;margin-right:10px;cursor:pointer}.transcription-audio[_ngcontent-%COMP%]:hover{transform:scale(.95)}.transcription-audio[_ngcontent-%COMP%]:active{transform:scale(.9)}.transcription-word[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#ba6bd6}.word-translation[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354}.heading-1[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:32px;text-transform:uppercase;position:relative;width:-moz-fit-content;width:fit-content;margin:30px auto;line-height:28px}.stats-head[_ngcontent-%COMP%]{display:flex;justify-content:space-between}@media (max-width: 767.99px){.heading-1[_ngcontent-%COMP%]{text-align:center;width:min-content}.stats-container[_ngcontent-%COMP%]{padding:0;width:100%;border:0;outline:0;gap:0px}.word-translation[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354}.transcription-word[_ngcontent-%COMP%]{font-size:12px}.stats-header[_ngcontent-%COMP%]{font-family:New Rubrik Edge;font-style:normal;font-weight:700;font-size:10px;line-height:13px;border-radius:0}.word-stat[_ngcontent-%COMP%]:last-child{border-radius:0}.game-stats[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:16px;text-transform:none;align-items:center}.stats-head[_ngcontent-%COMP%]{flex-direction:column;gap:20px;padding:20px 0}.stats-buttons[_ngcontent-%COMP%]{flex-direction:row;justify-content:center;gap:10px}}']}),i})();function st(i,s){if(1&i&&(t.TgZ(0,"h1",7),t._uU(1),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Oqu(e.currentGame)}}function ot(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"app-game-level",8),t.NdJ("buttonsActions",function(o){t.CHM(e);const a=t.oxw();return a.currentLevel=o,t.KtG(a.startGame())}),t.qZA()}}function rt(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"div",9)(1,"h2",10),t._uU(2),t.qZA(),t.TgZ(3,"div",11)(4,"app-menu-button",12),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.startGame())}),t.qZA(),t._UZ(5,"app-menu-button",13),t.qZA()()}if(2&i){const e=t.oxw();t.xp6(1),t.Udp("color",e.getColor(e.currentLevel)),t.xp6(1),t.AsE(" LEVEL:\xa0\xa0 ",e.currentLevel,"\xa0\xa0\xa0PAGE:\xa0\xa0 ",e.currentPage," "),t.xp6(2),t.Q6J("gameName",e.buttonStart),t.xp6(1),t.Q6J("gameName",e.buttonCancel)("routerLink",e.mainPageLink)}}function at(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"app-audio-challenge-statistics",14),t.NdJ("playAgain",function(o){t.CHM(e);const a=t.oxw();return t.KtG(a.playAgain(o))}),t.qZA()}if(2&i){const e=t.oxw();t.Q6J("gameStatistics",e.gameStatistics)("duration",e.duration)("rightAnswersCount",e.rightAnswersCount)("rightAnswersPercent",e.rightAnswersPercent)("attempts",e.attempt)}}function dt(i,s){if(1&i&&(t.TgZ(0,"div",31)(1,"span",32),t._uU(2,"LOADING ... "),t.qZA(),t._UZ(3,"progress",33),t.qZA()),2&i){const e=t.oxw(2);t.xp6(3),t.s9C("value",e.progress)}}function lt(i,s){if(1&i&&t._UZ(0,"div",34),2&i){const e=s.$implicit;t.ekj("attempt-success",1===e)("attempt-failed",0===e)}}function ct(i,s){if(1&i&&(t.TgZ(0,"span",35),t._uU(1),t.qZA()),2&i){const e=t.oxw(2);t.ekj("no-show",e.isShowInstruction),t.xp6(1),t.hij(" ",e.instructions," ")}}function pt(i,s){1&i&&t._UZ(0,"div",36),2&i&&t.ekj("red-heart",!!s.$implicit)}function ut(i,s){if(1&i&&(t.TgZ(0,"span",40),t._uU(1),t.qZA()),2&i){const e=t.oxw().index;t.xp6(1),t.Oqu(e+1)}}function gt(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"div",37),t.NdJ("click",function(){const a=t.CHM(e).index,l=t.oxw(2);return t.KtG(l.checkAnswer(a))}),t.YNc(1,ut,2,1,"span",38),t.TgZ(2,"span",39),t._uU(3),t.qZA()()}if(2&i){const e=s.$implicit,n=s.index,o=t.oxw(2);t.ekj("speaker-disable",o.isInProgress)("right-answer-button",n===o.rightButtonNumber)("right-answer-keyboard",n===o.keyboardPress&&n===o.rightButtonNumber)("wrong-answer-keyboard",n===o.keyboardPress&&n!==o.rightButtonNumber)("wrong-answer-button",n!==o.rightButtonNumber),t.xp6(1),t.Q6J("ngIf",!o.isPhone),t.xp6(2),t.Oqu(e.word)}}function ht(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"div",15),t.YNc(1,dt,4,1,"div",16),t.TgZ(2,"div",17),t._uU(3),t.qZA(),t.TgZ(4,"div",18)(5,"div",19),t.YNc(6,lt,1,4,"div",20),t.qZA()(),t.TgZ(7,"div",21),t.YNc(8,ct,2,3,"span",22),t.TgZ(9,"div",23),t.YNc(10,pt,1,2,"div",24),t.qZA(),t.TgZ(11,"div",25),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.sayWord())}),t.qZA(),t.TgZ(12,"div",26),t.YNc(13,gt,4,12,"div",27),t.qZA()(),t.TgZ(14,"div",28)(15,"app-menu-button",29),t.NdJ("click",function(){t.CHM(e);const o=t.oxw();return t.KtG(o.restartGame())}),t.qZA(),t._UZ(16,"app-menu-button",30),t.qZA()()}if(2&i){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.isInProgress),t.xp6(2),t.Oqu(e.currentGame),t.xp6(3),t.Q6J("ngForOf",e.attemptsInRow),t.xp6(2),t.Q6J("ngIf",e.isGameStart&&!e.isGameEnded),t.xp6(2),t.Q6J("ngForOf",e.lives),t.xp6(1),t.ekj("speaker-on",e.isSpeakerOn)("speaker-disable",e.isInProgress),t.xp6(2),t.Q6J("ngForOf",e.guessButtons),t.xp6(2),t.Q6J("gameName",e.buttonRestart),t.xp6(1),t.Q6J("routerLink",e.mainPageLink)("gameName",e.buttonLeave)}}function ft(i,s){1&i&&(t.TgZ(0,"div",41),t._uU(1," You don't have enough difficult words to begin game, add more or choose another level! "),t.qZA())}const mt=[{path:"",component:(()=>{class i{constructor(e,n,o,a,l,c,p){this.activatedRoute=e,this.pageDataService=n,this.http=o,this.httpService=a,this.userDataService=l,this.queryService=c,this.router=p,this.isDesktop=!0,this.isTablet=!1,this.isPhone=!1,this.source=r.HQ+r.hn,this.isGameStart=!1,this.isGameEnded=!1,this.isFromTextbook=!1,this.isInProgress=!0,this.isDenied=!1,this.isShowInstruction=!1,this.isSpeakerOn=!1,this.isAlert=!1,this.currentGame=r.VS,this.currentLevel=-1,this.currentPage=-1,this.loadingProgress=0,this.progress=0,this.dataLength=0,this.attempt=0,this.arrayForGuess=[],this.wordsArray=[],this.wordtoSayId=0,this.userWords=[],this.buttonRestart=r.FR,this.buttonLeave=r.Mi,this.buttonCancel=r.Zm,this.buttonStart=r.nk,this.levelsColors=r.hl,this.mainPageLink="../../../",this.guessButtons=Array(4).fill({}),this.rightButtonNumber=0,this.lives=[],this.livesInGame=5,this.attemptsInRow=Array(10).fill(-1),this.timeStart=0,this.timeFinish=0,this.gameStatistics=[],this.duration=0,this.keyboardPress=-1,this.instructions=r.ue,this.rightAnswersCount=0,this.rightAnswersPercent=0,this.userStatistics={learnedWords:0,optional:{}},this.todayGameOptions={attempts:0,success:0,rightGuessesInRow:0},this.allTimeGameOptions={attempts:0,success:0,rightGuessesInRow:0},this.maxRowInGame=0,this.learnedWords=0,this.userDifficultWords=0,this.subscription=this.activatedRoute.params.subscribe(u=>{this.currentLevel=u.level,this.currentPage=u.page,this.currentLevel>6&&(this.currentPage=0)})}playAgain(e){e&&this.restartGame()}getkey(e){this.keyboardPress=Number(e.key)-1,!this.isGameEnded&&!this.isDenied&&(this.keyboardPress<4&&this.keyboardPress>-1&&this.checkAnswer(this.keyboardPress),("Enter"===e.key||" "===e.key)&&(this.sayWord(),this.isSpeakerOn=!0))}getkeyUp(e){this.keyboardPress=-1,this.isSpeakerOn=!1}ngOnInit(){this.checkScreen(),this.pageDataService.setPage(r.Xy.MiniGames),this.isFromTextbook=-1!=this.currentPage&&this.currentLevel>-1,this.getLives(this.livesInGame),this.userDataService.isRegistered()&&(this.userId=this.userDataService.getUser().userId,this.getUserWords(),this.getNumberOfDifficultWords()),setInterval(()=>this.isShowInstruction=!this.isShowInstruction,5e3)}ngOnDestroy(){this.subscription.unsubscribe()}getLives(e){e<6&&(this.lives=Array(5).fill(0).map((n,o)=>o<e?1:0))}getColor(e){return this.levelsColors[+e-1].color}startGame(){this.isGameStart=!0,this.getLives(this.livesInGame),this.timeStart=Date.now(),this.currentLevel>6?this.userDifficultWords>3?this.loadForUser():(this.isAlert=!0,this.isGameStart=!1,setTimeout(()=>{this.isAlert=!1},3e3)):this.load()}load(){let e=0;e=-1==this.currentPage?void 0:this.currentPage-1;const o=new H.Z(this.httpService,this.currentLevel,e).createWordsResponse(),a=o.length;(0,D.D)(o.map(c=>c.pipe((0,Z.b)(()=>{this.loadingProgress++,this.progress=this.loadingProgress/a*100})))).subscribe(c=>{this.filterWords(c)})}filterWords(e){let n=[],o=[];if(this.userDataService.isRegistered()){const a=this.userDataService.getUser()?.userId;this.httpService.getData(`/users/${a}/words`).subscribe(l=>{n=l.filter(c=>"easy"===c.difficulty&&this.currentPage>-1).map(c=>c.wordId),e.forEach(c=>{for(let p=0;p<c.length;p++)n.includes(c[p].id)||o.push(c[p])}),this.arrayForGuess=o,this.begin()})}else e.forEach(a=>{o.push(...a)}),this.arrayForGuess=o,this.begin()}begin(){this.isDenied||(this.dataLength=this.arrayForGuess.length,this.dataLength<4&&this.currentLevel<7?(this.isAlert=!0,this.isGameStart=!1,setTimeout(()=>{this.isAlert=!1},3e3)):(this.isInProgress=!1,this.getWords()))}getWords(){this.guessButtons=Array(4).fill({}),this.rightButtonNumber=Math.round(3*Math.random()),this.guessButtons=this.guessButtons.map((e,n)=>{const o=Math.round(Math.random()*(this.dataLength-1)),a=this.arrayForGuess[o];return n===this.rightButtonNumber&&(this.rightWord=a),{id:a?.id,word:a?.wordTranslate}}),setTimeout(()=>this.checkDuplicates(this.guessButtons))}checkDuplicates(e){new Set(e.map(n=>n.id)).size<4&&this.getWords()}getNumberOfDifficultWords(){this.http.get(r.HQ+r.az.register+r.hn+this.userId+`/aggregatedWords?wordsPerPage=4000&filter=${encodeURIComponent('{"userWord.difficulty":"hard"}')}`).subscribe({next:e=>{this.userDifficultWords=e[0].paginatedResults.length}})}loadForUser(){this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).pipe((0,Z.b)(()=>{this.loadingProgress++,this.progress=100*this.loadingProgress})).subscribe({next:e=>{this.userWords=e,this.userWords=this.userWords.filter(n=>n.difficulty===r.av.Hard),this.userDifficultWords=this.userWords.length,this.userWords.forEach(n=>{this.httpService.getData(`/words/${n.wordId}`).subscribe({next:o=>{this.arrayForGuess.push(o),this.begin()}})})}})}restartGame(){this.isGameStart=!1,this.isGameEnded=!1,this.isInProgress=!0,this.isDenied=!1,this.loadingProgress=0,this.progress=0,this.attempt=0,this.attemptsInRow=Array(10).fill(-1),this.gameStatistics=[],this.rightAnswersCount=0,this.arrayForGuess=[],this.livesInGame=5}sayWord(){new Audio(this.source+this.rightWord?.audio).play()}checkAnswer(e){this.isDenied=!0;let n=-1,o="";e===this.rightButtonNumber?(n=1,o=r.LY.success,this.maxRowInGame++,this.rightAnswersCount++):(n=0,this.livesInGame--,this.getLives(this.livesInGame),o=r.LY.failed,this.maxRowInGame=0);const a=!!n;this.updateWordStatistics(this.rightWord,a),this.putStatistics(this.rightWord,a),this.attemptsInRow[this.attempt]=n,this.attempt++,new Audio(o).play(),this.attempt<r.vF&&this.livesInGame>0?setTimeout(()=>{this.isDenied=!1,this.begin()},500):(this.timeFinish=Date.now(),this.duration=Math.round((this.timeFinish-this.timeStart)/1e3),this.rightAnswersPercent=Number((this.rightAnswersCount/this.attempt*100).toFixed(1)),this.updateUserStatistics(this.maxRowInGame,this.rightAnswersCount,this.attempt),setTimeout(()=>this.isGameEnded=!0,1e3))}putStatistics(e,n){this.gameStatistics?.push({word:e,success:n})}updateWordStatistics(e,n){let l,o={difficulty:r.av.Learned,optional:{}},a=0;const c=r.HQ+r.az.register+r.hn+this.userId+r.az.words+r.hn+e.id;if(!this.userDataService.isRegistered())return;this.isWordInUserWords(e.id)||(this.http.post(c,o).subscribe(),this.getUserWords());let h,p=r.av.Learned,u=0,k=0,A=0,g=0;(function j(i=0,s,e=L){let n=-1;return null!=s&&((0,J.K)(s)?e=s:n=s),new z.y(o=>{let a=function B(i){return i instanceof Date&&!isNaN(i)}(i)?+i-e.now():i;a<0&&(a=0);let l=0;return e.schedule(function(){o.closed||(o.next(l++),0<=n?this.schedule(void 0,n):o.complete())},a)})})(1e3).pipe((0,Q.z)(()=>this.http.get(c))).subscribe({next:T=>{l=T;const w=l?.difficulty,y=l?.optional?.rightGuessesInRow;let f=l?.optional?.attempts,m=l?.optional?.success;const x=l?.optional?.dateFirstTime,v=l?.optional?.dateFirstTime;a=n?1:0,h=v||0,null==f&&(f=0,g=Date.now()),null==m&&(m=0,g=Date.now()),void 0===y?(u=a,g=Date.now()):u=n?y+1:0,w===r.av.Hard&&(p=r.av.Hard),u>2&&w!==r.av.Hard&&(u=0,p=r.av.Easy,h=Date.now(),this.learnedWords++),u>4&&w===r.av.Hard&&(u=0,p=r.av.Easy,h=Date.now(),this.learnedWords++),k=f+1,A=m+a,(0===x||void 0===x)&&(g=Date.now()),w===r.av.Easy&&!1===n&&(p=r.av.Learned),o={difficulty:p,optional:{rightGuessesInRow:u,attempts:k,success:A,dateFirstTime:g,dateEasy:h}},this.http.put(c,o).subscribe()}})}isWordInUserWords(e){return!!this.userWords.find(n=>n.wordId===e)}getUserWords(){this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.words).subscribe({next:e=>{this.userWords=e}})}updateUserStatistics(e,n,o=r.vF){if(!this.userDataService.isRegistered())return;let a,l=0,c=0,p=0,u=Date.now(),k=0,A=0,g=0,h=0,M={learnedWords:0,optional:{sprint:void 0,audioChallenge:void 0}};a=this.http.put(r.HQ+r.az.register+r.hn+this.userId+r.az.statistics,null),a.subscribe(),this.http.get(r.HQ+r.az.register+r.hn+this.userId+r.az.statistics).subscribe({next:T=>{this.userStatistics=T;const w=this.userStatistics?.optional?.sprint;let y=this.userStatistics?.learnedWords;y||(y=0);let f=this.userStatistics?.optional?.audioChallenge?.today?.attempts;f||(f=0);let m=this.userStatistics?.optional?.audioChallenge?.today?.success;m||(m=0);let x=this.userStatistics?.optional?.audioChallenge?.today?.rightGuessesInRow;x||(x=0);let v=this.userStatistics?.optional?.audioChallenge?.today?.date;v||(v=Date.now());let I=this.userStatistics?.optional?.audioChallenge?.allTime?.attempts;I||(I=0);let S=this.userStatistics?.optional?.audioChallenge?.allTime?.success;S||(S=0);let O=this.userStatistics?.optional?.audioChallenge?.allTime?.rightGuessesInRow;O||(O=0),new Date(u).getDate()===new Date(v).getDate()?(l=f+o,c=m+n,p=e>x?e:x):(l=o,c=n,p=e),k=I+o,A=S+n,g=e>O?e:O,this.todayGameOptions={attempts:l,success:c,rightGuessesInRow:p,date:u},this.allTimeGameOptions={attempts:k,success:A,rightGuessesInRow:g},h=y+this.learnedWords,this.learnedWords=0,M={learnedWords:h,optional:{sprint:w,audioChallenge:{today:this.todayGameOptions,allTime:this.allTimeGameOptions}}},a=this.http.put(r.HQ+r.az.register+r.hn+this.userId+r.az.statistics,M),a.subscribe()}})}checkScreen(){window.visualViewport.width>=1280&&(this.isDesktop=!0,this.isTablet=!1,this.isPhone=!1),window.visualViewport.width<1280&&window.visualViewport.width>=768&&(this.isDesktop=!1,this.isTablet=!0,this.isPhone=!1),window.visualViewport.width<768&&(this.isDesktop=!1,this.isPhone=!0,this.isTablet=!1)}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(b.gz),t.Y36(q.h),t.Y36(Y.eN),t.Y36(K.O),t.Y36(V.M),t.Y36($._),t.Y36(b.F0))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-audio-challenge"]],hostBindings:function(e,n){1&e&&t.NdJ("keydown",function(a){return n.getkey(a)},!1,t.Jf7)("keyup",function(a){return n.getkeyUp(a)},!1,t.Jf7)},decls:7,vars:6,consts:[["class","heading-1 underline",4,"ngIf"],["class","level",3,"buttonsActions",4,"ngIf"],["class","from-textbook",4,"ngIf"],[1,"wrapper"],[3,"gameStatistics","duration","rightAnswersCount","rightAnswersPercent","attempts","playAgain",4,"ngIf"],["class","game-container",4,"ngIf"],["class","alert",4,"ngIf"],[1,"heading-1","underline"],[1,"level",3,"buttonsActions"],[1,"from-textbook"],[1,"title-from-textbook"],[1,"title-buttons-container"],[1,"title-button-start",3,"gameName","click"],[1,"title-button-cancel",3,"gameName","routerLink"],[3,"gameStatistics","duration","rightAnswersCount","rightAnswersPercent","attempts","playAgain"],[1,"game-container"],["class","in-progress",4,"ngIf"],[1,"title","underline"],[1,"attempts-block"],[1,"attempts-wrapper"],["class","attempt",3,"attempt-success","attempt-failed",4,"ngFor","ngForOf"],[1,"dashed-container"],["class","instructions",3,"no-show",4,"ngIf"],[1,"hearts-block"],["class","heart",3,"red-heart",4,"ngFor","ngForOf"],[1,"speaker",3,"click"],[1,"guess-button-container"],["class","guess-button",3,"speaker-disable","right-answer-button","right-answer-keyboard","wrong-answer-keyboard","wrong-answer-button","click",4,"ngFor","ngForOf"],[1,"button-block"],[1,"button-restart",3,"gameName","click"],[1,"button-leave",3,"routerLink","gameName"],[1,"in-progress"],[1,"loading-text"],["max","100",1,"progress-scale",3,"value"],[1,"attempt"],[1,"instructions"],[1,"heart"],[1,"guess-button",3,"click"],["class","key-number",4,"ngIf"],[1,"key-word"],[1,"key-number"],[1,"alert"]],template:function(e,n){1&e&&(t.YNc(0,st,2,1,"h1",0),t.YNc(1,ot,1,0,"app-game-level",1),t.YNc(2,rt,6,7,"div",2),t.TgZ(3,"div",3),t.YNc(4,at,1,5,"app-audio-challenge-statistics",4),t.YNc(5,ht,17,13,"div",5),t.YNc(6,ft,2,0,"div",6),t.qZA()),2&e&&(t.Q6J("ngIf",!n.isGameStart),t.xp6(1),t.Q6J("ngIf",!n.isFromTextbook&&!n.isGameStart),t.xp6(1),t.Q6J("ngIf",n.isFromTextbook&&!n.isGameStart),t.xp6(2),t.Q6J("ngIf",n.isGameEnded),t.xp6(1),t.Q6J("ngIf",n.isGameStart&&!n.isGameEnded),t.xp6(1),t.Q6J("ngIf",n.isAlert))},dependencies:[C.sg,C.O5,b.rH,X.p,tt.Z,it],styles:['@import"https://use.typekit.net/hyf0fpw.css";@import"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";.router-wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;top:130px;width:1230px;min-height:calc(100vh - 200px);margin:100px auto 0}.footer-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0 auto;height:100px}.button-orange[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;flex-shrink:0;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#FF9100,#FF7A00);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-orange[_ngcontent-%COMP%]:hover{background:linear-gradient(#FFB84D,#FF9100)}.button-orange[_ngcontent-%COMP%]:active{background:linear-gradient(#FF9100,#FFB84D);box-shadow:0 0 #00000026;top:2px}.button-green[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:14px;color:#404354;position:relative;display:flex;justify-content:center;align-items:center;height:34px;text-transform:uppercase;text-shadow:1px 1px 0 rgba(0,0,0,.15);color:#fff;border:0px;border-radius:10px;outline:1px dashed white;outline-offset:-4px;padding:0 20px;background:linear-gradient(#88E564,#6CD244);box-shadow:0 2px 2px #00000026;cursor:pointer}.button-green[_ngcontent-%COMP%]:hover{background-image:linear-gradient(#B8FA9F,#88E564)}.button-green[_ngcontent-%COMP%]:active{background-image:linear-gradient(#88E564,#B8FA9F);box-shadow:0 0 #00000026;top:2px}.button-dashed[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;font-weight:500;color:#404354;position:relative;display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 20px;border:1px dashed #404354;border-radius:10px;background:transparent;box-sizing:border-box}.button-dashed[_ngcontent-%COMP%]:hover{border:1px solid}.button-dashed-correct[_ngcontent-%COMP%]{animation-name:correct-answer;animation-duration:1s}.button-dashed-wrong[_ngcontent-%COMP%]{animation-name:wrong-answer;animation-duration:1s}@keyframes correct-answer{0%{background-color:#6cd244}to{background-color:#6cd24400}}@keyframes wrong-answer{0%{background-color:#eb4949}to{background-color:#eb494900}}.dashed-container[_ngcontent-%COMP%]{background-color:#fff;border-radius:10px;padding:30px;outline:1px dashed #898c9c;outline-offset:-4px;box-shadow:0 4px 4px #00000026}.underline[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:3px;left:0;width:100%;height:5px;border-radius:2.5px;background-color:#66cee9;z-index:-1}@media (min-width: 768px) and (max-width: 1279.99px){.router-wrapper[_ngcontent-%COMP%]{width:750px;margin:100px auto 0}.dashed-container[_ngcontent-%COMP%]{padding:20px}}@media (max-width: 767.99px){.router-wrapper[_ngcontent-%COMP%]{width:calc(100% - 20px);margin:100px auto 0}.dashed-container[_ngcontent-%COMP%]{padding:10px}.button-orange[_ngcontent-%COMP%], .button-green[_ngcontent-%COMP%]{padding:0 10px}}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%]{text-align:center}h1[_ngcontent-%COMP%]{margin-bottom:50px}.game-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:0;gap:30px;width:565px;height:464.39px;margin:30px auto 85px}.title[_ngcontent-%COMP%]{position:relative;width:-moz-fit-content;width:fit-content;line-height:28px;margin:0 auto;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:600;font-size:32px;text-transform:uppercase;color:#000}.attempts-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-end;padding:20px 0 0;gap:5px;width:238px;height:41px}.attempts-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:238px;height:21px}.dashed-container[_ngcontent-%COMP%]{position:relative;display:flex;flex-direction:column;gap:30px;align-items:center}.button-block[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:flex-start;padding:0;gap:10px;width:255px;height:34px;filter:drop-shadow(0px 2px 2px rgba(0,0,0,.15))}  .button-restart button{width:109px}  .button-leave button{width:136px}  .title-button-start button{width:109px;background-image:linear-gradient(180deg,#88e564 0%,#6cd244 100%)}  .title-button-start button:hover{background-image:linear-gradient(180deg,#B8FA9F 0%,#88E564 100%)}  .title-button-start button:active{background-image:linear-gradient(180deg,#88E564 0%,#B8FA9F 100%)}  .title-button-cancel button{width:136px}.hearts-block[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:flex-start;padding:0;gap:10px;width:152px;height:22px;margin-top:10px}.speaker[_ngcontent-%COMP%]{width:56px;height:56px;background-image:url(assets/img/speaker.png);position:relative;background-repeat:no-repeat;opacity:.9;cursor:pointer}.speaker[_ngcontent-%COMP%]:hover, .speaker-on[_ngcontent-%COMP%]{transform:scale(.95)}.speaker[_ngcontent-%COMP%]:active{transform:scale(.9);opacity:1}.guess-button-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0;gap:5px;width:660px;height:34px}.guess-button[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:161px;height:30px;padding:0;border:1px dashed black;border-radius:10px;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:14px;color:#404354;cursor:pointer}.guess-button.guess-button[_ngcontent-%COMP%]:hover{border:1px solid black}.heart[_ngcontent-%COMP%]{width:30px;height:22px;background-image:url(assets/img/white-heart.png);background-repeat:no-repeat}.red-heart[_ngcontent-%COMP%]{animation-name:hearts-animation;animation-duration:3s;background-image:url(assets/img/red-heart.png);background-repeat:no-repeat}.attempt[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;width:15px;height:15px;background-image:url(assets/img/small-grey-circle.png);background-repeat:no-repeat}.attempt-success[_ngcontent-%COMP%]{animation-name:attempt-animation;animation-duration:1s;width:25px;height:25px;background-image:url(assets/img/green-check-mark.png)}.attempt-failed[_ngcontent-%COMP%]{animation-name:attempt-animation;animation-duration:1s;width:25px;height:25px;background-image:url(assets/img/red-cross.png)}.from-textbook[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-around;align-items:center;margin-top:100px;margin-bottom:450px}.title-buttons-container[_ngcontent-%COMP%]{display:flex;gap:30px;margin-top:50px}.right-answer-button[_ngcontent-%COMP%]:active, .right-answer-keyboard[_ngcontent-%COMP%]{background-color:#88e564;border:none}.wrong-answer-button[_ngcontent-%COMP%]:active, .wrong-answer-keyboard[_ngcontent-%COMP%]{background-color:#eb4949;border:none}.progress-scale[_ngcontent-%COMP%]{width:200px}.speaker-disable[_ngcontent-%COMP%], button-disable[_ngcontent-%COMP%]{opacity:.3;cursor:auto}.speaker-disable[_ngcontent-%COMP%]:hover{transform:scale(1)}.button-disable[_ngcontent-%COMP%]:hover{border:1px dashed black}.key-number[_ngcontent-%COMP%]{margin-left:5px;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354;color:#ba6bd6;width:5px}.key-word[_ngcontent-%COMP%]{margin-right:10px;word-wrap:break-word;width:125px}.instructions[_ngcontent-%COMP%]{position:absolute;color:#ba6bd6!important;font-family:New Rubrik Edge;font-style:normal;font-weight:700;font-size:10px;line-height:13px;font-weight:800;opacity:0;top:-12px;padding:10px 20px 8px;border-radius:10px;outline:1px dashed #898c9c;outline-offset:-4px;background:white}@keyframes attempt-animation{0%{transform:scale(.1)}to{transform:scale(1)}}@keyframes hearts-animation{0%{transform:scale(.1)}20%{transform:scale(1)}40%{transform:scale(.5)}60%{transform:scale(1)}80%{transform:scale(.5)}to{transform:scale(1)}}.no-show[_ngcontent-%COMP%]{opacity:1;transition:2s}.alert[_ngcontent-%COMP%]{text-align:center;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:600;font-size:32px;text-transform:uppercase;position:relative;top:-300px}.heading-1[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:32px;text-transform:uppercase;position:relative;width:-moz-fit-content;width:fit-content;margin:30px auto;line-height:28px}.loading-text[_ngcontent-%COMP%]{position:relative;top:2px;padding-right:5px;font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:400;font-size:12px;color:#404354;text-transform:uppercase;font-weight:800}.progress-scale[_ngcontent-%COMP%]{height:14px;border-radius:7px}.progress-scale[_ngcontent-%COMP%]::-webkit-progress-bar{background-color:transparent;height:20px;border:1px solid #898c9c;padding:3px;border-radius:10px}.progress-scale[_ngcontent-%COMP%]::-webkit-progress-value{background-color:#6cd244;border-radius:10px}.title-from-textbook[_ngcontent-%COMP%]{font-family:new-rubrik-edge,sans-serif;font-style:normal;font-weight:800;font-size:24px;text-transform:uppercase;color:#000}@media (max-width: 767.99px){.level[_ngcontent-%COMP%]{display:flex;justify-content:center}.heading-1[_ngcontent-%COMP%]{width:min-content}.game-container[_ngcontent-%COMP%]{width:100%}.title[_ngcontent-%COMP%]{width:min-content;text-align:center}.guess-button-container[_ngcontent-%COMP%]{flex-direction:column;height:-moz-fit-content;height:fit-content;gap:10px}.guess-button[_ngcontent-%COMP%]{height:40px;justify-content:center}.key-word[_ngcontent-%COMP%]{margin-right:0;text-align:center}.instructions[_ngcontent-%COMP%]{text-align:center;width:80%;top:-20px}.dashed-container[_ngcontent-%COMP%]{width:100%;padding:30px 0}}']}),i})()}];let xt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[b.Bz.forChild(mt),b.Bz]}),i})();var bt=d(4466);let wt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[C.ez,xt,bt.m]}),i})()}}]);