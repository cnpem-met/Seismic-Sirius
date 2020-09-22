import React, {Component} from 'react';
import './monitoring.css';
import $ from 'jquery';

export default class Monitoring extends Component{

    constructor(props){
        super(props);
        this.state = {status: this.props.status, lastBoot: this.props.lastBoot};
    }

    componentDidMount(){
        this.updateMonitor();
        this.menuPressed();
        setInterval(setInterval(this.updateMonitor.bind(this), 1000));
    }

    updateMonitor(){
        fetch(`http://10.0.38.242/api/index.php?option=${this.props.title.toLowerCase()}`)
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                    status: responseJson.monitor.status,
                    lastBoot: responseJson.monitor.last
                })
            });
    }

    menuPressed(){
        if(this.state.status === "ON"){
            $(`.informations #${this.props.title}`).css({"color": "rgb(1, 176, 117)"});
            $(`.informations #${this.props.title}`).css({"text-shadow": "0px 0.3px 4px  rgb(1, 176, 117)"});
            $(`.subtitle #b${this.props.title}`).css({"background-color": "red"});
            return "STOP";
        } else {
            $(`.informations #${this.props.title}`).css({"color": "red"});
            $(`.informations #${this.props.title}`).css({"text-shadow": "0px 0.3px 4px  red"});
            $(`.subtitle #b${this.props.title}`).css({"background-color": "rgb(1, 176, 117)"});
            return "START";
        }
    }

    buttonAction(){
        fetch(`http://10.0.38.242/api/updateMonitor.php?option=${this.props.title.toLowerCase()}`)
            .then(() =>{
                if(this.state.status === "ON"){
                    this.setState({status: "OFF"});
                } else {
                    this.setState({status: "ON"});
                }
            })
    }

    render(){
        return(

            <div className="informations">
                <div className="subtitle">
                    {this.props.title} 
                    <button disabled id={"b"+this.props.title} onClick={() => this.buttonAction()}>{this.menuPressed()}</button>
                </div>
                <div className="content" id={this.props.title}>{this.state.status}</div>
                <div id="lastBoot">LAST BOOT: {this.state.lastBoot}</div>
            </div>

        );
    }

}//archiving