/** @jsx React.DOM */
/* eslint-disable no-console */
'use strict';


// Global variables for this applicaiton
var EXPERIMENTCONFIG = {

        ExperimentConfiguration: null
    },

    // Objects from external javascript libraries
    React;


EXPERIMENTCONFIG.ExperimentConfiguration = React.createClass({displayName: "ExperimentConfiguration",


    addCentring: function() {
        window.app_dispatcher.trigger('queue:new_item',
            {
                kind: 'SampleCentring',
                text: 'params'
            });
    },


    addCharacterisation: function() {
        window.app_dispatcher.trigger('queue:new_item',
            {
                kind: 'Characterisation',
                text: 'params'
            });
    },


    addStandardCollection: function() {
        window.app_dispatcher.trigger('queue:new_item',
            {
                kind: 'StandardCollection',
                text: 'params'
            });
        console.log('event sent...');
    },


    addHelicalCollection: function() {
    },


    addMeshCollection: function() {
    },


    render: function() {
        return (
            React.createElement("div", {className: "col-xs-12"}, 

                React.createElement("div", {className: "panel panel-info"}, 

                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "Experiment Configuration"
                        )
                    ), 

                    React.createElement("div", {className: "panel body"}, 
                        React.createElement("a", {className: "btn btn-primary", 
                            onClick: this.addCentring}, 
                            React.createElement("i", {className: "fa fa-fw fa-plus-square"}), 
                                "Centring"), 
                        React.createElement("a", {className: "btn btn-primary", 
                            onClick: this.addCharacterisation}, 
                            React.createElement("i", {className: "fa fa-fw fa-plus-square"}), 
                                "Characterization"), 
                        React.createElement("a", {className: "btn btn-primary", 
                            onClick: this.addStandardCollection}, 
                            React.createElement("i", {className: "fa fa-fw fa-plus-square"}), 
                                "Standard Collection"), 
                        React.createElement("div", {className: "btn-group"}, 
                            React.createElement("a", {className: "btn btn-primary dropdown-toggle", 
                                "data-toggle": "dropdown"}, 
                                React.createElement("span", {className: "fa fa-caret-down"}), 
                                "Advanced "), 
                            React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "#"}, "Helical")
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "#"}, "Mesh")
                                ), 
                                React.createElement("li", null, 
                                    React.createElement("a", {href: "#"}, "Fancy Method")
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});
