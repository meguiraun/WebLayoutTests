/** @jsx React.DOM */
/* eslint-disable no-console */
'use strict';

// Global variables for this applicaiton
var SAMPLEMAIN = {
        SampleCentring: null
    },

    // Objects from external javascript libraries
    React;


SAMPLEMAIN.SampleMain = React.createClass({displayName: "SampleMain",


    getInitialState: function() {
        return {
            sampleName: 'Sample_42'
        };
    },


    componentWillMount: function() {
    },


    changeProgress: function() {
        // var pBar = document.getElementById('progressBar');
        // pBar.style
    },

    render: function() {
        return (
            React.createElement("div", {className: "col-xs-12"}, 
                React.createElement("div", {className: "panel panel-primary text-center"}, 

                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "Sample Centering")
                    ), 

                    React.createElement("div", {className: "panel-body"}, 
                        React.createElement(SAMPLEVIEW.SampleCentring, null)
                    )

                )
            )
        );
    }
});
