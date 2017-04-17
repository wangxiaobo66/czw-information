const eventEmitter = require('event-emitter');
import 'whatwg-fetch';
module.exports = {
    events: eventEmitter({}),
    match: {
        mobile: {
            reg: /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
            msg: '请正确填写您的手机号码'
        },
        tel: {
            reg: /^(\d{3,4}-?)?\d{7,9}$/g,
            mag: '请正确填写您的电话号码'
        },
        textArea: {
            reg: /^([?!,.*\n\w\u4e00-\u9fa5\u3000-\u301e\ufe10-\ufe19\ufe30-\ufe44\ufe50-\ufe6b\uff01-\uffee]{0,20})$/,
            msg: '请输入不超过200个字符'
        },
        idCard: {
            reg: /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/,
            msg: '请正确填写您的身份证号码'
        },
        email: {
            reg:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            msg:'请正确的填写您的邮箱'
        },
        password:{
            reg:/^[a-z\d]{6,16}$/,
            msg:'请正确的填写您的密码'
        },
        name:{
            reg:/^[a-z\d]{6,16}$/,
            msg:'请正确的填写您的用户名'
        },
        areaCode:{
            reg:/^\d{3,4}$/,
            msg:'请正确的填写您的区号'
        }
    },
    //wxbjiami
    base64encode: function(str){
        var out, i, len;
        var c1, c2, c3;

        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if(i === len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if(i === len)
            {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    },
    //pingyuan
    objToUrlString: function(url, obj) {
        if(typeof obj === 'object' || !obj) {
            let string = '?';
            if (url.indexOf('&') !== -1) {
                string = '&';
            }
            for (let props in obj) {
                let params = props + '=' + obj[props] + '&';
                string += params;
            }
            string = string.substring(0, string.length-1);
            return url + string;
        } else {
            console.log("util.objToUrlString需要传入对象(一维)类型参数");
        }
    },
    getLocalTime: function(time) {
        let date = new Date(parseInt(time));
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1);
        let D = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();

        return Y + '-' + M + '-' + D;
    },
    contains: function( a, b ) { //from jquery.contains
        if ( b ) {
            while ( (b = b.parentNode) ) {
                if ( b === a ) {
                    return true;
                }
            }
        }
        return false;
    },
    getRequest: function(url, data) {
        var fullUrl = this.objToUrlString(url, data);
        return fetch(fullUrl, {
            headers: {
            },
            credentials: 'include'
        });
    },

    postRequest: function(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01', //接受数据格式
                'Content-Type': 'application/json; charset=UTF-8', //请求数据格式
                //"x-csrf-token": scoreweb.token
            },
            credentials: 'include', //使用cookie  默认不使用cookie
            body: JSON.stringify(data)
        })
    },

    post: function (url, data) {
        // let currentUserId = window.sessionStorage.getItem(LOGIN_USER_KEY);
        // if (currentUserId) {
        //     data.userId = currentUserId;
        // }
        window.loading('请稍候...');

        let deferred = $.Deferred();
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json; charset=UTF-8',
            async: true,
            timeout: 300000,
            crossDomain: true,
            success: function (rep) {
                window.unloading();
                deferred.resolveWith(this, [rep]);
                // if (+rep.status === 200 || +rep.status === 400) {
                //     deferred.resolveWith(this, [rep]);
                // } else {
                //     deferred.rejectWith(this, [rep]);
                //     console.log('*************** ', JSON.stringify(rep), ' ***************');
                // }
            },
            error: function (xhr, type) {
                deferred.rejectWith(this, ['网络异常, 请稍候再试']);
                console.log('【网络异常, 请稍候再试】*************** ', JSON.stringify(xhr), ' ***************');
                // lib.alert('网络异常, 请稍候再试');
                // window.toast('网络异常, 请稍候再试');
            }
        });

        return deferred.promise();

        // return fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/javascript, */*; q=0.01', //接受数据格式
        //         'Content-Type': 'application/json; charset=UTF-8' //请求数据格式
        //         //"x-csrf-token": scoreweb.token
        //     },
        //     credentials: 'include', //使用cookie  默认不使用cookie
        //     body: JSON.stringify(data)
        // }).then(rep => {
        //     window.untoast();
        //     return rep;
        // });

    },
    //hash
    getHash: function(url){
        return url.substring((url.indexOf("#") + 1), url.length);
    },
    //从cookie里去取名为msession的字段
    M_SESSION:document.cookie.replace(/(?:(?:^|.*;\s*)msession\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    UrlSearch: function (){
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("/");
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
        var arr=str.split("/"); //各个参数放到数组里
        return [arr[arr.length-1],arr[arr.length-2]];//输出数组里的最后两个值
    },
    //数组去重
    /*
    Array: function (array){
        var res = [];
        var json = {};
        for(var i = 0; i < array.length; i++){
            if(!json[array[i]]){
                res.push(array[i]);
                json[array[i]] = 1;
            }
        }
        return res;
    },
    */
    //配置hhttp
    http: function(){
        //return "http://139.198.5.38:10001";
        return "";
    },
    //存取本地缓存
    sessionStorage:function(type,name,val){
        switch (type){
            case 'get'://取
                return sessionStorage.getItem(name);
                break;
            case 'set'://存
                sessionStorage.setItem(name, val);
                break;
        }
    },
    localStorage:function(type,name,val){
        switch (type){
            case 'get'://取
                return localStorage.getItem(name);
                break;
            case 'set'://存
                localStorage.setItem(name, val);
                break;
        }
    }
};