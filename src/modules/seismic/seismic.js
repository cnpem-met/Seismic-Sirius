import React, {Component} from 'react';
import './seismic.css';
import SeismicPreview from '../seismicpreview/seismicpreview';
import FouerierPreview from '../seismicpreview/fourierpreview';
import DayPlot from '../seismicpreview/dayplot';
import $ from 'jquery';

export default class Seismic extends Component{

    constructor(props){
        super(props);
        this.state = {typeChart: null, request: ""};
    }

    renderChart(){
        this.setState({typeChart: null});
        var iniTime = $("#iniTime").val();
        var iniDate = new Date($('#iniDate').val() + ' ' + iniTime);
        var endTime = $("#endTime").val();
        var endDate = new Date($('#endDate').val() + ' ' + endTime);
        var typeChart = $("#typeChart").children("option:selected").val();
        
        var seconds = (endDate.getTime() - iniDate.getTime()) / 1000;
        var start = new Date(iniDate.getFullYear(), 0, 0);
        var diff = iniDate - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        var requisition = iniDate.getFullYear()+";"+day+";"+iniTime+":00:00;"+seconds+";sismico";
	    this.setState({request: requisition});

        if(typeChart === "Dayplot"){
            this.setState({typeChart:
                <div>
                    <DayPlot channel="1" type="" title="DayPlot Channel 1" requisition={this.state.request}/>
                    <DayPlot channel="2" type="" title="DayPlot Channel 1" requisition={this.state.request}/>
                    <DayPlot channel="3" type="" title="DayPlot Channel 1" requisition={this.state.request}/>
                </div>
            });
        } else {
            this.setState({typeChart:
                <div>
                    <SeismicPreview channel="1" type="" title="Channel 1" height="0.35" requisition={requisition}/>
                    <SeismicPreview channel="2" type="" title="Channel 2" height="0.35" requisition={requisition}/>
		            <SeismicPreview channel="3" type="" title="Channel 3" height="0.35" requisition={requisition}/>
                </div>
            });
        }

    }

    render(){
        return(

            <div className="cards">
                <div className="colunas">
                    <div className="coluna3">

                        <div className="card2">
                            <div className="title-cards">Seismic Data</div>
                            {this.state.typeChart}
                        </div>

                    </div>

                    <div className="coluna4">
                        <div className="card4">
                            <div className="title-cards">Forms</div>
                            <div className="forms">
                                <div className="input">
                                    <div className="title-input">Initial Date</div>
                                    <input type="date" id="iniDate"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">Initial Time</div>
                                    <input type="time" id="iniTime"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">End Date</div>
                                    <input type="date" id="endDate"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">End Time</div>
                                    <input type="time" id="endTime"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">Type Plot</div>
                                    <select id="typeChart">
                                        <option>Linear</option>
                                        <option>Dayplot</option>
                                    </select>
                                </div>
                                <button onClick={() => this.renderChart()}>Send</button>
                            </div>
                        </div>
                        <div className="card4">
                            <div className="title-cards">Fouerier Preview</div>
                            <FouerierPreview channel="1" title="Channel 1" height="0.26" type="preview"/>
                            <div className="description">
                                See the complete Fourier Transform of these datas: <br></br>
                                <button>Here</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }

}
