import React, {Component} from 'react';
import './App.css';
import Sidebar from './modules/sidebar/sidebar';

class App extends Component {

    render(){

        return(

            <div className="App">
                <Sidebar/>
                <div id="section">
                    {this.props.children}    
                </div>              
            </div>

        );
    }

}

export default App;