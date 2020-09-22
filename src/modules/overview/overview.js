import React, {Component} from 'react';
import Speedometer from '../speedometer/speedometer';
import Monitoring from '../monitoring/monitoring';
import SeismicPreview from '../seismicpreview/seismicpreview';
import Historic from '../historic/historic';
import './overview.css';

export default class Overview extends Component{

    render(){
        return(

            <div className="cards">
                    <div className="card1">
                        <Monitoring title="Seismic"/>
                        <div className="separation"></div>
                        <Monitoring title="Epics"/>
                        <div className="separation"></div>
                        <Monitoring title="Raw"/>
                        <div className="separation"></div>
                        <Monitoring title="MSEED"/>
                    </div>
                    <div className="colunas">
                        <div className="coluna1">
                            <div className="card2">
                                <div className="title-cards">Seismic Preview</div>
                                <SeismicPreview channel="1" type="preview" title="Channel 1" height="0.2" concat="1"/>
                                <SeismicPreview channel="2" type="preview" title="Channel 2" height="0.2" concat="1"/>
                                <SeismicPreview channel="3" type="preview" title="Channel 3" height="0.2" concat="1"/>

                            </div>
                        </div>
                        <div className="coluna2">
                            <div className="card3">
                                <div className="title-cards">Acquisition Frequency</div>
                                <Speedometer begin="0 Hz" end="1000 Hz"/>
                            </div>
                            <div className="card3">
                                <div className="title-cards">Last Acquisitions</div>
                                <Historic/>
                            </div>
                        </div>
                    </div>
                </div>

        );
    }

}