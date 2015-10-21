/** @jsx React.DOM */
/* eslint-disable no-console */
'use strict';

// Global variables for this applicaiton
var MAINVIEW = {
        MainView: null
    },

    // Objects from external javascript libraries
    React;


MAINVIEW.MainView = React.createClass({

    getInitialState: function() {
        return {
            progressbarStyle : { width: '42%'  }
        };
    },


    componentWillMount: function() {
    },


    componentDidMount: function() {
        this.anotherMethod();
    },


    anotherMethod: function() {
        this.setState({ progressbarStyle : {width: '100%'} });
    },


    render: function() {

        return (
            <div>


                {/* The navigation bar */}
                <div className='navbar navbar-default navbar-static-top
                    navbar-fixed-top navbar-inverse'>

                    <div className='container'>

                        {/* The navigation bar on large screens */}
                        <div className='navbar-header'>

                            <button type='button' className='navbar-toggle'
                                    data-toggle='collapse'
                                    data-target='#navbar-ex-collapse'>
                                <span className='sr-only'>Toggle navigation
                                </span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>

                            <a className='navbar-brand'
                                href='http://mxcube.github.io/mxcube/'>
                                <img height='20' alt='Brand'
                                    src='./build/css/mxcube_logo.png'> </img>
                            </a>
                        </div>

                        {/* The navigation bar on small screens */}
                        <div className='collapse navbar-collapse'
                                id='navbar-ex-collapse'>

                            <ul className='nav navbar-nav navbar-right'>
                                <li className='active'>
                                    <a href='#'>Home</a>
                                </li>
                                <li>
                                    <a href='#'>Contacts</a>
                                </li>
                            </ul>

                            <p className='navbar-left navbar-text'>
                                Signed in as Patxi</p>

                            <a className='btn btn-default navbar-btn'>
                                Log out</a>
                        </div>

                    </div>

                </div>


                {/* Go to another page */}
                <div className='col-md-12'>
                    <ul className='pager'>
                        <li className='previous'>
                            <a href='#'>←  Back to sample list</a>
                        </li>

                        <li className='next'>
                            <a href='#'>Next Sample  →</a>
                        </li>
                    </ul>
                </div>


                {/* The main experimental control panel */}
                <div className='col-md-10'>

                    <div className='col-md-12'>

                        <div className='panel panel-primary text-center'>
                            <div className='panel-heading'>
                                <h8 className='panel-title text-center'>
                                    Sample Experiment Control</h8>
                            </div>
                            <div className='panel-body'>
                                <SAMPLEMAIN.SampleMain/>
                            </div>
                        </div>

                    </div>

                    {/* The progress bar */}
                    <div className='col-md-12'>

                        <div className='active progress
                                progress-striped'>
                            <div className='progress-bar'
                                id='progressBar' role='progressbar'
                                style={this.state.progressbarStyle}>
                                42% of Samples Collected
                            </div>
                        </div>

                    </div>

                </div>


                {/* The side panel */}
                <div className='col-md-2'>
                    <div className='panel panel-primary'>

                        <div className='panel-heading'>
                            <h3 className='panel-title'>Whatever goes here</h3>
                        </div>

                        <div className='panel-body'>
                            <p contentEditable='true'>Panel content</p>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
});


React.render(<MAINVIEW.MainView/>, document.getElementById('SampleCentringHere'));
