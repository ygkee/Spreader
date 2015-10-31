!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return a.returnExportsGlobal=b(c)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){var b,c,d,e,f,g,h,i=[].slice;c=function(){function b(b){this.current_flag=null,this.controllers={},this.alias_maps={},this.$inputor=a(b),this.setIframe(),this.listen()}return b.prototype.createContainer=function(b){return 0===(this.$el=a("#atwho-container",b)).length?a(b.body).append(this.$el=a("<div id='atwho-container'></div>")):void 0},b.prototype.setIframe=function(a,b){var c;return null==b&&(b=!1),a?(this.window=a.contentWindow,this.document=a.contentDocument||this.window.document,this.iframe=a):(this.document=document,this.window=window,this.iframe=null),(this.iframeStandalone=b)?(null!=(c=this.$el)&&c.remove(),this.createContainer(this.document)):this.createContainer(document)},b.prototype.controller=function(a){var b,c,d,e;if(this.alias_maps[a])c=this.controllers[this.alias_maps[a]];else{e=this.controllers;for(d in e)if(b=e[d],d===a){c=b;break}}return c?c:this.controllers[this.current_flag]},b.prototype.set_context_for=function(a){return this.current_flag=a,this},b.prototype.reg=function(a,b){var c,e;return c=(e=this.controllers)[a]||(e[a]=new d(this,a)),b.alias&&(this.alias_maps[b.alias]=a),c.init(b),this},b.prototype.listen=function(){return this.$inputor.on("keyup.atwhoInner",function(a){return function(b){return a.on_keyup(b)}}(this)).on("keydown.atwhoInner",function(a){return function(b){return a.on_keydown(b)}}(this)).on("scroll.atwhoInner",function(a){return function(b){var c;return null!=(c=a.controller())?c.view.hide(b):void 0}}(this)).on("blur.atwhoInner",function(a){return function(b){var c;return(c=a.controller())?c.view.hide(b,c.get_opt("display_timeout")):void 0}}(this)).on("click.atwhoInner",function(a){return function(){return a.dispatch()}}(this))},b.prototype.shutdown=function(){var a,b,c;c=this.controllers;for(b in c)a=c[b],a.destroy(),delete this.controllers[b];return this.$inputor.off(".atwhoInner"),this.$el.remove()},b.prototype.dispatch=function(){return a.map(this.controllers,function(a){return function(b){var c;return(c=b.get_opt("delay"))?(clearTimeout(a.delayedCallback),a.delayedCallback=setTimeout(function(){return b.look_up()?a.set_context_for(b.at):void 0},c)):b.look_up()?a.set_context_for(b.at):void 0}}(this))},b.prototype.on_keyup=function(b){var c;switch(b.keyCode){case f.ESC:b.preventDefault(),null!=(c=this.controller())&&c.view.hide();break;case f.DOWN:case f.UP:case f.CTRL:a.noop();break;case f.P:case f.N:b.ctrlKey||this.dispatch();break;default:this.dispatch()}},b.prototype.on_keydown=function(b){var c,d;if(c=null!=(d=this.controller())?d.view:void 0,c&&c.visible())switch(b.keyCode){case f.ESC:b.preventDefault(),c.hide(b);break;case f.UP:b.preventDefault(),c.prev();break;case f.DOWN:b.preventDefault(),c.next();break;case f.P:if(!b.ctrlKey)return;b.preventDefault(),c.prev();break;case f.N:if(!b.ctrlKey)return;b.preventDefault(),c.next();break;case f.TAB:case f.ENTER:if(!c.visible())return;b.preventDefault(),c.choose(b);break;default:a.noop()}},b}(),d=function(){function b(b,c){this.app=b,this.at=c,this.$inputor=this.app.$inputor,this.id=this.$inputor[0].id||this.uid(),this.setting=null,this.query=null,this.pos=0,this.cur_rect=null,this.range=null,0===(this.$el=a("#atwho-ground-"+this.id,this.app.$el)).length&&this.app.$el.append(this.$el=a("<div id='atwho-ground-"+this.id+"'></div>")),this.model=new g(this),this.view=new h(this)}return b.prototype.uid=function(){return(Math.random().toString(16)+"000000000").substr(2,8)+(new Date).getTime()},b.prototype.init=function(b){return this.setting=a.extend({},this.setting||a.fn.atwho["default"],b),this.view.init(),this.model.reload(this.setting.data)},b.prototype.destroy=function(){return this.trigger("beforeDestroy"),this.model.destroy(),this.view.destroy(),this.$el.remove()},b.prototype.call_default=function(){var b,c,d;d=arguments[0],b=2<=arguments.length?i.call(arguments,1):[];try{return e[d].apply(this,b)}catch(f){return c=f,a.error(""+c+" Or maybe At.js doesn't have function "+d)}},b.prototype.trigger=function(a,b){var c,d;return null==b&&(b=[]),b.push(this),c=this.get_opt("alias"),d=c?""+a+"-"+c+".atwho":""+a+".atwho",this.$inputor.trigger(d,b)},b.prototype.callbacks=function(a){return this.get_opt("callbacks")[a]||e[a]},b.prototype.get_opt=function(a){var b;try{return this.setting[a]}catch(c){return b=c,null}},b.prototype.content=function(){return this.$inputor.is("textarea, input")?this.$inputor.val():this.$inputor.text()},b.prototype.catch_query=function(){var a,b,c,d,e,f;return b=this.content(),a=this.$inputor.caret("pos",{iframe:this.app.iframe}),f=b.slice(0,a),d=this.callbacks("matcher").call(this,this.at,f,this.get_opt("start_with_space")),"string"==typeof d&&d.length<=this.get_opt("max_len",20)?(e=a-d.length,c=e+d.length,this.pos=e,d={text:d,head_pos:e,end_pos:c},this.trigger("matched",[this.at,d.text])):(d=null,this.view.hide()),this.query=d},b.prototype.rect=function(){var b,c,d;if(b=this.$inputor.caret("offset",this.pos-1,{iframe:this.app.iframe}))return this.app.iframe&&!this.app.iframeStandalone&&(c=a(this.app.iframe).offset(),b.left+=c.left,b.top+=c.top),this.$inputor.is("[contentEditable]")&&(b=this.cur_rect||(this.cur_rect=b)),d=this.app.document.selection?0:2,{left:b.left,top:b.top,bottom:b.top+b.height+d}},b.prototype.reset_rect=function(){return this.$inputor.is("[contentEditable]")?this.cur_rect=null:void 0},b.prototype.mark_range=function(){var a;if(this.$inputor.is("[contentEditable]"))return this.app.window.getSelection&&(a=this.app.window.getSelection()).rangeCount>0?this.range=a.getRangeAt(0):this.app.document.selection?this.ie8_range=this.app.document.selection.createRange():void 0},b.prototype.insert_content_for=function(b){var c,d,e;return d=b.data("value"),e=this.get_opt("insert_tpl"),this.$inputor.is("textarea, input")||!e?d:(c=a.extend({},b.data("item-data"),{"atwho-data-value":d,"atwho-at":this.at}),this.callbacks("tpl_eval").call(this,e,c))},b.prototype.insert=function(b){var c,d,e,f,g,h,i,j,k;return c=this.$inputor,k=this.callbacks("inserting_wrapper").call(this,c,b,this.get_opt("suffix")),c.is("textarea, input")?(h=c.val(),i=h.slice(0,Math.max(this.query.head_pos-this.at.length,0)),j=""+i+k+h.slice(this.query.end_pos||0),c.val(j),c.caret("pos",i.length+k.length,{iframe:this.app.iframe})):(f=this.range)?(e=f.startOffset-(this.query.end_pos-this.query.head_pos)-this.at.length,f.setStart(f.endContainer,Math.max(e,0)),f.setEnd(f.endContainer,f.endOffset),f.deleteContents(),d=a(k,this.app.document)[0],f.insertNode(d),f.setEndAfter(d),f.collapse(!1),g=this.app.window.getSelection(),g.removeAllRanges(),g.addRange(f)):(f=this.ie8_range)&&(f.moveStart("character",this.query.end_pos-this.query.head_pos-this.at.length),f.pasteHTML(k),f.collapse(!1),f.select()),c.is(":focus")||c.focus(),c.change()},b.prototype.render_view=function(a){var b;return b=this.get_opt("search_key"),a=this.callbacks("sorter").call(this,this.query.text,a.slice(0,1001),b),this.view.render(a.slice(0,this.get_opt("limit")))},b.prototype.look_up=function(){var b,c;if(b=this.catch_query())return c=function(a){return a&&a.length>0?this.render_view(a):this.view.hide()},this.model.query(b.text,a.proxy(c,this)),b},b}(),g=function(){function b(a){this.context=a,this.at=this.context.at,this.storage=this.context.$inputor}return b.prototype.destroy=function(){return this.storage.data(this.at,null)},b.prototype.saved=function(){return this.fetch()>0},b.prototype.query=function(a,b){var c,d,e;return c=this.fetch(),d=this.context.get_opt("search_key"),c=this.context.callbacks("filter").call(this.context,a,c,d)||[],e=this.context.callbacks("remote_filter"),c.length>0||!e&&0===c.length?b(c):e.call(this.context,a,b)},b.prototype.fetch=function(){return this.storage.data(this.at)||[]},b.prototype.save=function(a){return this.storage.data(this.at,this.context.callbacks("before_save").call(this.context,a||[]))},b.prototype.load=function(a){return!this.saved()&&a?this._load(a):void 0},b.prototype.reload=function(a){return this._load(a)},b.prototype._load=function(b){return"string"==typeof b?a.ajax(b,{dataType:"json"}).done(function(a){return function(b){return a.save(b)}}(this)):this.save(b)},b}(),h=function(){function b(b){this.context=b,this.$el=a("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"),this.timeout_id=null,this.context.$el.append(this.$el),this.bind_event()}return b.prototype.init=function(){var a;return a=this.context.get_opt("alias")||this.context.at.charCodeAt(0),this.$el.attr({id:"at-view-"+a})},b.prototype.destroy=function(){return this.$el.remove()},b.prototype.bind_event=function(){var b;return b=this.$el.find("ul"),b.on("mouseenter.atwho-view","li",function(c){return b.find(".cur").removeClass("cur"),a(c.currentTarget).addClass("cur")}).on("click",function(a){return function(b){return a.choose(b),b.preventDefault()}}(this))},b.prototype.visible=function(){return this.$el.is(":visible")},b.prototype.choose=function(a){var b,c;return(b=this.$el.find(".cur")).length&&(c=this.context.insert_content_for(b),this.context.insert(this.context.callbacks("before_insert").call(this.context,c,b),b),this.context.trigger("inserted",[b,a]),this.hide(a)),this.context.get_opt("hide_without_suffix")?this.stop_showing=!0:void 0},b.prototype.reposition=function(b){var c,d,e,f;return f=this.context.app.iframeStandalone?this.context.app.window:window,b.bottom+this.$el.height()-a(f).scrollTop()>a(f).height()&&(b.bottom=b.top-this.$el.height()),b.left>(d=a(f).width()-this.$el.width()-5)&&(b.left=d),c={left:b.left,top:b.bottom},null!=(e=this.context.callbacks("before_reposition"))&&e.call(this.context,c),this.$el.offset(c),this.context.trigger("reposition",[c])},b.prototype.next=function(){var a,b;return a=this.$el.find(".cur").removeClass("cur"),b=a.next(),b.length||(b=this.$el.find("li:first")),b.addClass("cur")},b.prototype.prev=function(){var a,b;return a=this.$el.find(".cur").removeClass("cur"),b=a.prev(),b.length||(b=this.$el.find("li:last")),b.addClass("cur")},b.prototype.show=function(){var a;return this.stop_showing?void(this.stop_showing=!1):(this.context.mark_range(),this.visible()||(this.$el.show(),this.context.trigger("shown")),(a=this.context.rect())?this.reposition(a):void 0)},b.prototype.hide=function(a,b){var c;if(this.visible())return isNaN(b)?(this.context.reset_rect(),this.$el.hide(),this.context.trigger("hidden",[a])):(c=function(a){return function(){return a.hide()}}(this),clearTimeout(this.timeout_id),this.timeout_id=setTimeout(c,b))},b.prototype.render=function(b){var c,d,e,f,g,h,i;if(!(a.isArray(b)&&b.length>0))return void this.hide();for(this.$el.find("ul").empty(),d=this.$el.find("ul"),g=this.context.get_opt("tpl"),h=0,i=b.length;i>h;h++)e=b[h],e=a.extend({},e,{"atwho-at":this.context.at}),f=this.context.callbacks("tpl_eval").call(this.context,g,e),c=a(this.context.callbacks("highlighter").call(this.context,f,this.context.query.text)),c.data("item-data",e),d.append(c);return this.show(),this.context.get_opt("highlight_first")?d.find("li:first").addClass("cur"):void 0},b}(),f={DOWN:40,UP:38,ESC:27,TAB:9,ENTER:13,CTRL:17,P:80,N:78},e={before_save:function(b){var c,d,e,f;if(!a.isArray(b))return b;for(f=[],d=0,e=b.length;e>d;d++)c=b[d],f.push(a.isPlainObject(c)?c:{name:c});return f},matcher:function(a,b,c){var d,e,f,g;return a=a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),c&&(a="(?:^|\\s)"+a),f=decodeURI("%C3%80"),g=decodeURI("%C3%BF"),e=new RegExp(""+a+"([A-Za-z"+f+"-"+g+"0-9_+-]*)$|"+a+"([^\\x00-\\xff]*)$","gi"),d=e.exec(b),d?d[2]||d[1]:null},filter:function(a,b,c){var d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],~new String(d[c]).toLowerCase().indexOf(a.toLowerCase())&&g.push(d);return g},remote_filter:null,sorter:function(a,b,c){var d,e,f,g;if(!a)return b;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],d.atwho_order=new String(d[c]).toLowerCase().indexOf(a.toLowerCase()),d.atwho_order>-1&&g.push(d);return g.sort(function(a,b){return a.atwho_order-b.atwho_order})},tpl_eval:function(a,b){var c;try{return a.replace(/\$\{([^\}]*)\}/g,function(a,c){return b[c]})}catch(d){return c=d,""}},highlighter:function(a,b){var c;return b?(c=new RegExp(">\\s*(\\w*?)("+b.replace("+","\\+")+")(\\w*)\\s*<","ig"),a.replace(c,function(a,b,c,d){return"> "+b+"<strong>"+c+"</strong>"+d+" <"})):a},before_insert:function(a){return a},inserting_wrapper:function(a,b,c){var d,e;return d=""===c?c:c||" ",a.is("textarea, input")?""+b+d:"true"===a.attr("contentEditable")?(d=""===c?c:c||"&nbsp;",/firefox/i.test(navigator.userAgent)?e="<span>"+b+d+"</span>":(c="<span contenteditable='false'>"+d+"<span>",e="<span contenteditable='false'>"+b+c+"</span>"),this.app.document.selection&&(e="<span contenteditable='true'>"+b+"</span>"),e):void 0}},b={load:function(a,b){var c;return(c=this.controller(a))?c.model.load(b):void 0},setIframe:function(a,b){return this.setIframe(a,b),null},run:function(){return this.dispatch()},destroy:function(){return this.shutdown(),this.$inputor.data("atwho",null)}},a.fn.atwho=function(d){var e,f;return f=arguments,e=null,this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function(){var g,h;return(h=(g=a(this)).data("atwho"))||g.data("atwho",h=new c(this)),"object"!=typeof d&&d?b[d]&&h?e=b[d].apply(h,Array.prototype.slice.call(f,1)):a.error("Method "+d+" does not exist on jQuery.caret"):h.reg(d.at,d)}),e||this},a.fn.atwho["default"]={at:void 0,alias:void 0,data:null,tpl:"<li data-value='${atwho-at}${name}'>${name}</li>",insert_tpl:"<span id='${id}'>${atwho-data-value}</span>",callbacks:e,search_key:"name",suffix:void 0,hide_without_suffix:!1,start_with_space:!0,highlight_first:!0,limit:5,max_len:20,display_timeout:300,delay:null}});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Spreader.Project = {
    project: {},
    activities: [],
    tasks: [],

    init: function init(data) {
        this.project = data['project'];
        if (data['activities'] != undefined && data['activities'].length) {
            this.activities = data['activities'];
        }
        if (data['tasks'] != undefined && data['tasks'].length) {
            this.tasks = data['tasks'];
        }

        this.reactRender();
    },

    reactRender: function reactRender() {
        var TasksList = React.createClass({
            displayName: 'TasksList',

            render: function render() {
                var tasksListNode = this.props.tasks.map((function (task) {
                    if (task.activity_id == this.props.activity.id) {
                        var taskLink = Spreader.site_url + '/internal/tasks/' + task.id;
                        var qrcodeUrl = Spreader.site_url + '/app/' + task.qrcode_url;
                        return React.createElement(
                            'p',
                            null,
                            React.createElement(
                                'a',
                                { href: taskLink },
                                'T',
                                task.id
                            ),
                            ' 场景',
                            task.term_id,
                            ' 人员',
                            task.amigo_id,
                            ' 报酬',
                            task.reward,
                            ' 派单量',
                            task.mission,
                            ' 描述:',
                            task.description,
                            ' ',
                            React.createElement(
                                'a',
                                { href: qrcodeUrl, target: '_blank' },
                                React.createElement('i', { className: 'glyphicon glyphicon-qrcode' })
                            )
                        );
                    }
                }).bind(this));
                return React.createElement(
                    'td',
                    null,
                    tasksListNode
                );
            }
        });

        var project = this.project,
            ActivityForm = React.createClass({
            displayName: 'ActivityForm',

            getInitialState: function getInitialState() {
                return {
                    action: 'touch',
                    activity: null,
                    tasks: [],
                    errors: {}
                };
            },

            handleClick: function handleClick() {
                $.ajax({
                    url: Spreader.site_url + '/internal/projects/' + project.id + '/activities',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        deadline: this.refs.deadline.getDOMNode().value,
                        background: this.refs.background.getDOMNode().value
                    },
                    beforeSend: function beforeSend(request) {
                        request.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
                    },

                    success: (function (res) {
                        if (res['status'] != undefined && res['status'] == 'ok') {
                            this.setState({ action: 'mv', activity: res['activity'], tasks: res['tasks'] });
                        } else {
                            this.setState({ errors: res });
                        }
                    }).bind(this)
                });
            },

            handleClickRemove: function handleClickRemove() {
                this.setState({ action: 'rm' });
            },

            render: function render() {
                var deadlineError = this.state.errors.deadline == undefined ? '' : 'has-error';
                var backgroundError = this.state.errors.background == undefined ? '' : 'has-error';
                switch (this.state.action) {
                    case 'mv':
                        return React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'A',
                                this.state.activity.id
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.activity.deadline
                            ),
                            React.createElement(TasksList, { activity: this.state.activity, tasks: this.state.tasks }),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        );

                    case 'rm':
                        return null;

                    default:
                        return React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                '[auto]'
                            ),
                            React.createElement(
                                'td',
                                { className: deadlineError },
                                React.createElement('input', { type: 'text', name: 'deadline', ref: 'deadline', className: 'form-control input-sm form-error', 'data-provide': 'datepicker', 'data-date-format': 'yyyy-mm-dd' }),
                                React.createElement(
                                    'p',
                                    { className: 'help-block' },
                                    this.state.errors.deadline
                                )
                            ),
                            React.createElement(
                                'td',
                                { className: backgroundError },
                                React.createElement('textarea', { id: '', name: 'background', ref: 'background', cols: '30', rows: '5', className: 'form-control input-sm' }),
                                React.createElement(
                                    'p',
                                    { className: 'help-block' },
                                    this.state.errors.background
                                )
                            ),
                            React.createElement(
                                'td',
                                null,
                                'New'
                            ),
                            React.createElement(
                                'td',
                                null,
                                React.createElement(
                                    'a',
                                    { onClick: this.handleClick, href: '#' },
                                    '保存'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'a',
                                    { className: 'text-danger', onClick: this.handleClickRemove, href: '#' },
                                    '移除'
                                )
                            )
                        );
                }
            }
        });

        var activities = this.activities,
            tasks = this.tasks,
            ActivitiesList = React.createClass({
            displayName: 'ActivitiesList',

            getInitialState: function getInitialState() {
                return {
                    activities: activities,
                    action: false
                };
            },

            handleClickAdd: function handleClickAdd() {
                this.setState({ activities: this.state.activities.concat([{ id: 0 }]) });
            },

            render: function render() {
                var activityNodes = this.state.activities.map(function (activity) {
                    if (activity.id == 0) {
                        return React.createElement(ActivityForm, null);
                    }
                    return React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'A',
                            activity.id
                        ),
                        React.createElement(
                            'td',
                            null,
                            activity.deadline
                        ),
                        React.createElement(TasksList, { activity: activity, tasks: tasks }),
                        React.createElement('td', null),
                        React.createElement('td', null)
                    );
                });

                return React.createElement(
                    'form',
                    { action: '', method: 'POST' },
                    React.createElement(
                        'table',
                        { className: 'table table-striped' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    { className: 'col-10-10' },
                                    React.createElement(
                                        'a',
                                        { href: 'javascript:;', onClick: this.handleClickAdd },
                                        React.createElement('i', { className: 'glyphicon glyphicon-plus' }),
                                        ' 活动'
                                    )
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'col-10-10' },
                                    '活动截止时间'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    '#场景 @人员 $报酬 =传单数'
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'col-10-10' },
                                    '状态'
                                ),
                                React.createElement(
                                    'th',
                                    { className: 'col-10-10' },
                                    '操作'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            activityNodes
                        )
                    )
                );
            }
        });

        React.render(React.createElement(ActivitiesList, null), document.getElementById('activities-container'));
    }
};

},{}]},{},[1]);

//# sourceMappingURL=base.js.map
