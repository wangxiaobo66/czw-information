/**
 * Created by joker.wang on 17/4/24.
 */
const render = require('react-dom').render;
const React = require('react');
const util = require('../../app/util.js');
let PropTypes = React.PropTypes;

export class Details extends React.Component {
    constructor(props) {
        super(props);
        let details = this.props.obj;
        this.state={
            details:details
        };
    }
    render(){
        let {details} = this.state;
        let date = util.date(details.publish_date);
        return(
            <li className="published">
                <p>
                    <span>ID号</span>
                    <span>{details.id}</span>
                </p>
                <p>
                    <span>中标主题</span>
                    <span>{details.title}</span>
                </p>
                <p className={details.ok_status==200?"published":"unpublish"}>
                    <span>发布状态</span>
                    <span className="item"></span>
                </p>
                <p>
                    <span>提交时间</span>
                    <span>{util.formatDate(date)}</span>
                </p>
                <div className="flex-row-around">
                    <div className="btn btn-y" name="details" id={details.id} onClick={(e) => this.click(e)}>查看</div>
                    {
                        details.ok_status==0?
                            <div className="btn btn-w" name="delete" id={details.id} onClick={(e) => this.click(e)}>删除</div>
                            :
                                details.type != 2000?
                                <div className="btn btn-w" name="associated" id={details.id} onClick={(e) => this.click(e)}>关联</div>
                                :null
                    }
                </div>
            </li>
        )
    }
    componentWillReceiveProps(nextProps) {

    }
    click(e){
        let name = e.target.getAttribute('name');
        let id = e.target.id;
        switch (name){
            case 'details':
                this.details(id);
                break;
            case 'delete':
                this.delete(id);
                break;
            case 'associated':
                this.associated(id);
                break;
        }
    }
    details(id){//查看详情
        let WXFBSESSIONID = util.localStorage('get','WXFBSESSIONID');
        console.log(WXFBSESSIONID,'**');
        let data = {"id":id,"WXFBSESSIONID":WXFBSESSIONID};
        util.postRequest('/messageDetails',data).then(body=> {
            body.json().then(
                json => {
                    let { changeDetails } = this.props;
                    if(typeof changeDetails == "function") {
                        changeDetails(json);
                    }
                })
        })
    }
    delete(id){//删除
        let { changeDelete } = this.props;
        if(typeof changeDelete == "function") {
            changeDelete(id);
        }
    }
    associated(id){//关联
        let {changeAssociated} = this.props;
        if(typeof changeAssociated == "function"){
            changeAssociated(id)
        }
    }
}
Details.propTypes = {

};