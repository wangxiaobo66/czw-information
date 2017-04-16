/**
 * Created by wangxiaobo on 17/4/16.
 */
const util = require('../../app/util.js');
const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class Capacity extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text:this.props.text,
            hide:this.props.hide
        }
    }
    render() {
        let {text , hide} = this.state;
        return(
            <div className={"mc"+hide?" hide":""}>
                <div className="tip-contaner no-top">
                    <p className="quest">{text}</p>
                    <div className="flex-row">
                        <div className="btn btn-y" onClick={(e) = this.onclick(e)}>确定</div>
                    </div>
                </div>
            </div>
        )
    }
    onclick(e){
        this.setState({
            hide:true
        })
    }
}

Capacity.propTypes = {

};