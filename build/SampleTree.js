/** @jsx React.DOM */
/* global $*/
/* eslint-disable no-console */
'use strict';


// Global variables for this applicaiton
var SAMPLETREE = {

        SingleSampleTree: null,

        EditableField: null,

        params: {
            Characterisation : {
                osc_range: { label: 'Oscillation range', default_value: 0.1 },
                osc_start: { label: 'Oscillation start', default_value: 0 },
                exp_time: { label: 'Exposure time', default_value: 0.02 },
                n_images: { label: 'Number of images', default_value: 1 } } ,
            StandardCollection : {
                osc_range: { label: 'Oscillation range', default_value: 0.1 },
                osc_start: { label: 'Oscillation start', default_value: 0 },
                exp_time: { label: 'Exposure time', default_value: 0.02 },
                n_images: { label: 'Number of images', default_value: 1 } },
            SampleCentring : {
                center_points: {
                    label: 'Centring status',
                    default_value: 'False' },
                n_images: {
                    label: 'Number of images',
                    default_value: 1 }
            }
        },

        queueInfo: {
            sampleID: '42',

            // status: 0 not done, 1 done, 2 failed
            list: [
                {
                    name: 'SampleCentring_1',
                    status: 0,
                    params: {},
                    queueID: 1
                },
                {
                    name: 'Characterisation_1',
                    status: 1,
                    params: {},
                    queueID: 2
                },
                {
                    name : 'SampleCentring_1',
                    status: 0,
                    params: {},
                    queueID: 3
                },
                {
                    name: 'StandardCollection_1',
                    status: 2,
                    params: {},
                    queueID: 4
                }
            ]
        }
    },

    // Objects from external javascript libraries
    React;


SAMPLETREE.SingleSampleTree = React.createClass({displayName: "SingleSampleTree",


    getInitialState: function() {
        console.log('SAMPLETREE.SingleSampleTree getInitialState called');

        return SAMPLETREE.queueInfo;
    },


    addQueueItem: function(newItem) {

        SAMPLETREE.queueInfo.list.push(
            {
                name: this.generateElementId(newItem['kind']),
                status: 0,
                params: {},
                queueID: SAMPLETREE.queueInfo.list.length + 1
            }
        );

        this.setState({list: SAMPLETREE.queueInfo.list});
    },


    removeQueueItem: function(itemToRemove) {

        var i, index = 0;

        console.log('itemToRemove: ' + itemToRemove);
        console.log('length: ' + SAMPLETREE.queueInfo.list.length);

        // Search for the array index of item in the list that should be
        // removed
        for (i = 0; i < SAMPLETREE.queueInfo.list.length; i += 1) {

            if (SAMPLETREE.queueInfo.list[i].queueID === itemToRemove) {
                index = i;
                console.log('will remove: ' +
                    SAMPLETREE.queueInfo.list[i].name);
            }
        }

        if (index >= 0) {
            // Remove the item with the array index found
            SAMPLETREE.queueInfo.list.splice(index, 1);

            // Change the queue item indicies where needed
            for (i = 0; i < SAMPLETREE.queueInfo.list.length; i += 1) {

                if (SAMPLETREE.queueInfo.list[i].queueID > itemToRemove) {
                    SAMPLETREE.queueInfo.list[i].queueID -= 1;
                }
            }

            this.setState({list: SAMPLETREE.queueInfo.list});
        }
    },


    runThisItem: function(item) {
        console.log(item);
    },


    componentWillMount: function() {
        window.app_dispatcher.on('queue:new_item', this.addQueueItem);
        this.getInitialState();
    },


    componentWillUnMount: function() {
        window.app_dispatcher.off('queue:new_item', this.addQueueItem);
    },


    aMethod: function() {
        console.log('aMethod Called');
    },


    formatParameters: function(paramType) {

        var fields = [], key, paramDict, value, name;

        // fields.push( <EditableField key={fieldno}
        //    sampleid={this.props.sample.sampleId}
        //    name={field} value={value} /> );

        paramDict = SAMPLETREE.params[paramType.split('_')[0]];

        for (key in paramDict) {
            value = paramDict[key]['default_value'];
            name = paramDict[key]['label'];
            fields.push(
                React.createElement(SAMPLETREE.EditableField, {name: name, value: value}));
        }
        return fields;
    },


    formatStatus: function(status) {
        switch (status) {
        case 0: return 'fa fa-fw fa-circle-o';
        case 1: return 'fa fa-fw fa-check-circle-o';
        case 2: return 'fa fa-fw fa-exclamation-circle';
        }
    },


    generateElementId: function(newElement) {
        var occurrences = 0, i;

        for (i = 0; i < this.state.list.length; i += 1) {

            if (this.state.list[i].name.split('_')[0] === newElement) {
                occurrences += 1;
            }
        }

        return newElement + '_' + (occurrences + 1);
    },


    render: function() {

        console.log('rendering queue items');

        var that = this, arr = [], key;

        this.getInitialState();

        for (key in this.state.list) {
            arr.push(this.state.list[key]);
        }

        return (

            React.createElement("div", {className: "col-xs-12"}, 
                React.createElement("div", {className: "panel panel-info"}, 

                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h1", {className: "panel-title"}, "Queue")
                    ), 

                    React.createElement("div", {className: "panel-body"}, 

                        React.createElement("div", {className: "col-xs-5 col-xs-offset-2"}, 

                            React.createElement("button", {type: "button", 
                                className: "btn btn-block btn-success", 
                                onClick: this.aMethod}, "Run", 
                                React.createElement("i", {className: "fa fa-play-circle fa-fw"})
                            )

                        ), 

                        React.createElement("div", {className: "col-xs-5"}, 

                            React.createElement("button", {type: "button", 
                                className: "btn btn-block btn-danger", 
                                onClick: this.aMethod}, "Stop", 
                                React.createElement("i", {className: "fa fa-stop fa-fw"})
                            )

                        ), 

                        React.createElement("div", {className: "col-xs-12 text-center"}, 
                            React.createElement("b", null, "Sample ", SAMPLETREE.queueInfo.sampleID)
                        ), 

                        arr.map(function(listValue) {

                            return (
                                React.createElement("div", {className: "text-left col-xs-12 queue-list"}, 

                                    React.createElement("div", {className: "col-xs-5 queue-list"}, 
                                        React.createElement("b", null, listValue.queueID, ". "), 

                                        React.createElement("a", {"data-toggle": "collapse", 
                                            className: "queue-list", 
                                            href: '#collapse' +
                                                listValue.name}, 
                                                listValue.name
                                        ), 

                                        React.createElement("div", {className: "collapse", 
                                            id: 'collapse' + listValue.name}, 
                                            React.createElement("div", {className: "well"}, 
                                                that.formatParameters(
                                                    listValue.name)
                                            )
                                        )
                                    ), 

                                    React.createElement("div", {className: "text-right col-xs-7"}, 

                                        React.createElement("button", {type: "button", 
                                                className: "btn btn-link" + ' ' +
                                                "queue-list", 
                                                onClick: 
                                                    that.removeQueueItem.bind(
                                                        that,
                                                        listValue.queueID
                                                    )
                                                }, 
                                            React.createElement("i", {className: "fa fa-fw fa-eraser"}
                                            )
                                        ), 

                                        React.createElement("button", {type: "button", 
                                                className: "btn btn-link", 
                                                onClick: that.runThisItem.bind(
                                                    that,listValue.name)}, 
                                            React.createElement("i", {className: "fa fa-fw fa-play-circle"}
                                            )
                                        ), 

                                        React.createElement("button", {type: "button", 
                                                className: "btn btn-link", 
                                                onClick: that.aMethod}, 
                                            React.createElement("i", {className: that.formatStatus(
                                                listValue.status)})
                                        )
                                    )
                                )
                            );
                        })

                    )
                )
            )
        );
    }
});


SAMPLETREE.EditableField = React.createClass({displayName: "EditableField",


    componentDidMount: function() {
        $(this.refs.editable.getDOMNode()).editable();
    },


    render: function() {
        return React.createElement("p", null, this.props.name, ":", 
                React.createElement("a", {href: "#", ref: "editable", "data-name": this.props.name, 
                    "data-pk": this.props.id, "data-url": "/beam_line_update", 
                    "data-type": "text", "data-title": "Edit value"}, 
                    this.props.value
                )
            );
    }
});
