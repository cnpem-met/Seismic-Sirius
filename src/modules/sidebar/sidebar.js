import React, {Component} from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class Sidebar extends Component{

    componentDidMount(){
        this.menuPressed("overview");
    }

    menuPressed(option){
        $("#overview").removeClass("active");
        $("#seismic").removeClass("active");
        $("#fourierTransform").removeClass("active");

        switch(option){
            case "overview":
                $("#overview").addClass("active");
                break;
            case "seismic":
                $("#seismic").addClass("active");
                break;
            case "fourierTransform":
                $("#fourierTransform").addClass("active");
                break;
            case "exportCSV":
                $("#exportCSV").addClass("active");
                break;
            default:
                $("#overview").addClass("active");
                break;
        }
    }

    render(){
        return(

            <div className="sideMenu">
                <div className="user">
                    <div className="bullet"><b>SS</b></div>
                    Sirius Seismometer <br/> <i>SEISMIC ANALYSIS</i>
                </div>

                <div className="menu">
                    <Link to="/"><button id="overview" className="active" onClick={() => this.menuPressed('overview')}>Overview</button></Link>
                    <button id="alert">Alerts</button>
                    <Link to="/seismic"><button id="seismic" onClick={() => this.menuPressed('seismic')}>Seismic</button></Link>
                    <Link to="/fourier"><button id="fourierTransform" onClick={() => this.menuPressed('fourierTransform')}>Fourier Transform</button></Link>
                    <button id="exportCSV">Export CSV</button>
                </div>
            </div>

        );
    }

}