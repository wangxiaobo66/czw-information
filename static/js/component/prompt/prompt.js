/**
 * Created by joker.wang on 17/5/2.
 */
const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class Prompt extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            hide:true
        }
    }
    render(){
        let {text,hide} = this.state;
        return(
            <div className={"mc"+(hide?" hide":"")}>
                <div className="tip-contaner">
                    <p className="title">{text}</p>
                    <p className="quest">确定要{text}吗？</p>
                    <div className="flex-row">
                        <div className="btn btn-w" name="confirm" onClick={(e) => this.onclick(e)}>确定</div>
                        <div className="btn btn-y" name="cancel" onClick={(e) => this.onclick(e)}>取消</div>
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
        let name = e.target.getAttribute('name');
        console.log(name);
        let { changeClick } = this.props;
        if(typeof changeClick == "function") {
            changeClick(name);
        }
    }
}