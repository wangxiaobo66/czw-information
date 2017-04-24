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
        console.log(details);
        return(
            <li className="unpublish">
                <p>
                    <span>ID号</span>
                    <span>{details.record_id}</span>
                </p>
                <p>
                    <span>中标主题</span>
                    <span>{details.title}</span>
                </p>
                <p>
                    <span>发布状态</span>
                    <span className="item"></span>
                </p>
                <p>
                    <span>提交时间</span>
                    <span>{util.getLocalTime(details.submit_date)}</span>
                </p>
                <div className="flex-row-around">
                    <div className="btn btn-y">查看</div>
                    <div className="btn btn-w">删除</div>
                </div>
            </li>
        )
    }
    componentWillReceiveProps(nextProps) {

    }
}
Details.propTypes = {

};