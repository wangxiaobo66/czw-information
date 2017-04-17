/**
 * Created by wangxiaobo on 17/4/16.
 */
const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class Capacity extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            hide:true
        }
    }
    render() {
        let {text,hide} = this.state;
        return(
            <div className={"mc"+(hide?" hide":"")}>
                <div className="tip-contaner no-top">
                    <p className="quest">{text}</p>
                    <div className="flex-row">
                        <div className="btn btn-y" onClick={(e) => this.onclick(e)}>确定</div>
                    </div>
                </div>
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            text:nextProps.text,
            hide:nextProps.hide
        })
    }
    onclick(e){
        let { changeHide } = this.props;
        if(typeof changeHide == "function") {
            changeHide(true);
        }
    }
}

Capacity.propTypes = {

};