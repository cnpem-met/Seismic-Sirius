import React, {Component} from 'react';
import $ from 'jquery';
import './speedometer.css'

export default class Speedometer extends Component{

    constructor(props){
        super(props);
        this.state = {percentage: 0}
    }

    componentDidMount(){
        this.setSpeed();
        setInterval(this.setSpeed.bind(this), 5000);
    }

    setSpeed(){
        fetch('http://10.0.38.242/api/index.php?option=samplerate')
            .then((response) => response.json())
            .then(responseJson => {
                $('.semi-donut').css({"--from": `${this.state.percentage * 0.18}deg`});
                $('.semi-donut').css({"--to": `${responseJson.monitor.status * 0.18}deg`});
                $('.semi-donut').css({"animation": "setSpeed 1s forwards"});
                setTimeout(() => {
                    $('.semi-donut').css({"animation": "none"});
                    $('.semi-donut').css({"transform": `rotate(${responseJson.monitor.status * 0.18}deg)`});
                }, 1000)
                this.setState({percentage: responseJson.monitor.status})
            });
    }
    

    render(){
        return(
            <div className="speedometer">
                <div className="circular-chart">
                    <div className="semi-donut"></div>
                    <div className="content">{this.state.percentage} Hz</div>
                </div>
                <div className="chart-footer">
                    <div className="begin">{this.props.begin}</div>
                    <div className="end">{this.props.end}</div>
                </div>
            </div>
        );
    }

}