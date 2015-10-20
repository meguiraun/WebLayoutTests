/** @jsx React.DOM */
/* global $*/
/* eslint-disable no-console */
'use strict';

// Global variables for this applicaiton
var SAMPLEVIEW_APP = {
        SampleCentring: null,
        EditableField: null
    },

    // Objects from external javascript libraries
    React;


SAMPLEVIEW_APP.SampleCentring = React.createClass({displayName: "SampleCentring",


    getInitialState: function() {
        return {
            sampleName: 'Sample_42',
            currentZoom: 0,
            zoomLevels:['Zoom 1', 'Zoom 2', 'Zoom 3', 'Zoom 4', 'Zoom 5',
                'Zoom 6', 'Zoom 7','Zoom 8','Zoom 9', 'Zoom 10'],
            zoomText: 'Zoom 1',
            light:0,
            pos:[]
        };
    },


    componentWillMount: function() {
    },


    aMethod: function() {
        console.log('aMethod Called');
    },


    takeSnapshot: function() {
        console.log('snapshot');
        // Click points will also appear as it is right now, the image is
        // automatically downloaded
        var dataURL = document.getElementById('SampleImage').src.replace(
            'image/png', 'image/octet-stream');
        // dataURL = dataURL.replace('image/png', 'image/octet-stream');
        // document.location.href = dataURL;
        window.open(dataURL);
    },


    drawSampleImage: function() {
        // Draws the image from the diff HO. In addition, if there are points
        // already marked in the canvas re-display them,

        console.log('drawSampleImage started');

        var scale = this.state.zoomText,
            points = this.state.pos,
            new_image = new Image,
            canvas = null,
            context = null,
            canvas_size = [659, 493];


        function drawCircle(point, radius) {
            context.beginPath();
            context.arc(point[0], point[1], radius, 0, Math.PI * 2);
            context.stroke();
        }


        function drawPoints() {
            // Redraw all the existing points, if there are any

            console.log('drawPoints started');

            points.map(function(point) {
                console.log('iterating over points');
                drawCircle(point, 5);
                drawCircle(point, 1);
            });

            console.log('Done drawing points');
        }


        function drawLine(x0, y0, x1, y1) {
            // Draw a line betweeen two points

            context.strokeStyle = 'red';

            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.stroke();
        }


        function drawDistanceLine() {
            // Draw a line between the last two points clicked

            var numPoints = points.length;

            if (numPoints > 1) {
                drawLine(
                    points[numPoints - 2][0], points[numPoints - 2][1],
                    points[numPoints - 1][0], points[numPoints - 1][1]);
            }
        }


        function drawText(argText, x0, y0) {
            // Draw text somewhere on the image

            context.strokeStyle = 'red';
            context.font = '11px Verdana';

            context.beginPath();
            context.strokeText(argText, x0, y0);
            context.stroke();
        }


        function drawDistanceText() {
            // Display the distance measured between the last two points
            // clicked

            var numPoints = points.length, x0, y0, x1, y1, xDiff, yDiff,
                distance;

            if (numPoints > 1) {
                x0 = points[numPoints - 1][0];
                x1 = points[numPoints - 2][0];
                y0 = points[numPoints - 1][1];
                y1 = points[numPoints - 2][1];

                xDiff = x1 - x0;
                yDiff = y1 - y0;

                distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
                distance = Math.round(distance * 100) / 100;

                drawText('Point 1:   (' + x0 + ', ' + y0 + ')',
                    canvas_size[0] - 150, canvas_size[1] - 63);
                drawText('Point 2:   (' + x1 + ', ' + y1 + ')',
                    canvas_size[0] - 150, canvas_size[1] - 43);
                drawText('Distance: ' + distance + ' pixels',
                    canvas_size[0] - 150, canvas_size[1] - 23);
            }
        }


        function drawScale() {
            // Draw an axes scale, along with the zoom level, in the lower left

            drawText(scale, 15, canvas_size[1] - 23);
            drawLine(10, canvas_size[1] - 43, 10, canvas_size[1] - 13);
            drawLine(10, canvas_size[1] - 13, 40, canvas_size[1] - 13);
        }


        function drawImage() {
            // Clear the canvas, then display the image

            canvas = document.getElementById('canvas');
            context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas_size[0], canvas_size[1]);
            context.drawImage(new_image, 0, 0);
        }


        new_image.onload = function() {
            // Wait until the iamge is loaded to draw everything
            // -- perhaps one should also wiat until the function called by the
            //    onClick event has finished as well

            drawImage();
            drawScale();
            drawPoints();
            drawDistanceLine();
            drawDistanceText();
        };

        // The source for the image - needs to be defined after 'onload'
        // This needs to be changed in the future to present video images
        new_image.src = './build/md2.jpg';

        console.log('drawSampleImage ended');
    },


    drawPoint: function(x, y) {

        console.log('coordinates:  (' + x + ', ' + y + ')');
        // // Called by clicking in the canvas, displays a circle with a dot in
        // // the center
        // context = document.getElementById('canvas').getContext('2d');

        // // Draw circle
        // context.beginPath();
        // context.arc(x, y, 5, 0, Math.PI * 2);
        // context.stroke();

        // // Draw center point
        // context.beginPath();
        // context.arc(x, y, 1, 0, Math.PI * 2);
        // context.stroke();
    },


    deletePoints: function() {
        console.log('deleting');
        this.setState({pos: []});
    },


    getPosition: function(element) {
        // Adjust point position according to the position of the canvas in
        // the web-page
        var xPosition = 0, yPosition = 0;

        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft +
                element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop +
                element.clientTop);
            element = element.offsetParent;
        }
        return { x: xPosition, y: yPosition };
    },


    onClick: function(e) {
        console.log('onClick started');

        // Save click coordinates
        var parentPosition = this.getPosition(e.currentTarget),
            x = e.clientX - parentPosition.x,
            y = e.clientY - parentPosition.y,
            aux = this.state.pos,
            numPoints, xDiff, yDiff, distance;

        aux.push([x, y]);
        this.setState({pos: aux});
        // this.drawPoint(x, y);

        document.getElementById('coordinateTextDisplay').innerHTML =
            'coordinates:  (' + x + ', ' + y + ')';

        console.log('coordinates:  (' + x + ', ' + y + ')');
        console.log('onClick ended');

        console.log(aux[0]);
        console.log(aux.length);

        numPoints = aux.length;
        if (numPoints > 1) {
            xDiff = aux[numPoints - 2][0] - aux[numPoints - 1][0];
            yDiff = aux[numPoints - 2][1] - aux[numPoints - 1][1];
            distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
            distance = Math.round(distance * 100) / 100;


            document.getElementById('coordinateTextDisplay').innerHTML =
                'point 1: ' + '(' +
                aux[numPoints - 2][0] + ', ' +
                aux[numPoints - 2][1] + ') , ' +
                'point 2: ' + '(' +
                aux[numPoints - 1][0] + ', ' +
                aux[numPoints - 1][1] + '), ' +
                'distance: ' + distance;
        }

        // $.ajax({
        //     url: '/onClick',
        //     data: {'PosX': x, 'PosY': y},
        //     type: 'PUT',
        //     success: function(res) {
        //         console.log(res);
        //     },
        //     error: function(error) {
        //         console.log(error);
        //     }
        // });

    },


    addCentringPoint: function() {
    },


    startCentring: function() {
    },


    measureDistance: function() {
    },


    getBeamPosition: function() {
    },


    componentDidMount: function() {
    },


    lightOnOff: function(ev) {
        console.log('ligth on/off requested' + ev);
        var newLight = Number(!this.state.ligth);

        $.ajax({
            url: '/mxcube/api/v0.1/samplecentring/light/move?newpos=newLight',
            // Not really needed, everything in the url (motor and newpos)
            data: {'moveable': 'Light', 'position':newLight},
            type: 'PUT',

            success: function(res) {
                console.log(res);
                this.set.state({ligth:newLight});
            },

            error: function(error) {
                console.log(error);
            }
        });
    },


    zoomIn: function(ev) {

        console.log('zoomIn:' + ev);

        var newIndex = Math.max(0, Math.min(this.state.currentZoom += 1, 9)),
            newZoom = this.state.zoomLevels[newIndex];

        this.setState({currentZoom: newIndex});
        this.setState({zoomText: newZoom});

        $.ajax({
            url: '/mxcube/api/v0.1/samplecentring/zoom/move',
            data: JSON.stringify({'moveable': 'Zoom', 'position': newZoom},
                null, '\t'),
            contentType: 'application/json;charset=UTF-8',
            type: 'PUT',

            success: function(res) {
                console.log(res);
            },

            error: function(error) {
                console.log(error);
            }
        });
    },


    zoomOut: function(ev) {
        console.log('zoomOut:' + ev);

        var newIndex = Math.max(0, Math.min(this.state.currentZoom -= 1, 9)),
            newZoom = this.state.zoomLevels[newIndex];

        this.setState({currentZoom: newIndex});
        this.setState({zoomText: newZoom});

        $.ajax({
            url: '/mxcube/api/v0.1/samplecentring/zoom/move?newpos=' + newZoom,
            // Not really needed, everything in the url (motor and newpos)
            data: JSON.stringify({'moveable': 'Zoom', 'position': newZoom},
                    null, '\t'),
            contentType: 'application/json;charset=UTF-8',
            type: 'PUT',

            success: function(res) {
                console.log(res);
            },

            error: function(error) {
                console.log(error);
            }
        });
    },


    // Only will send data when 'enter' key is pressed, the spinbox up/down
    // fire the onInput event, as well as anything type in the box, so for
    // setting 314.5 -> four event are sent.
    // TODO: add event handling for the spin box, so a different filter is
    // needed.
    push: function(id, data) {
        console.log('push requested');
        $.ajax({
            url: '/mxcube/api/v0.1/samplecentring/' + id + '/move?newpos=' +
                data,
            // Not really needed, everything in the url (motor and newpos)
            data: {'moveable': id, 'position':data},
            type: 'PUT',

            success: function(res) {
                console.log(res);
            },

            error: function(error) {
                console.log(error);
            }
        });
    },


    isNumberKey: function(ev) {
        var charCode = (ev.which) ? ev.which : event.keyCode;
        // Be carefull, ascii 46 = '.', but 47='/' and 48='0', a better
        // filtering required
        if (charCode > 31 && (charCode < 46 || charCode > 57)) {
            return false;
        }

        if (ev.key == 'Enter') {
            this.push(ev.target.id,
                document.getElementById(ev.target.id).value);
        }
        return true;
    },


    componentDidUpdate: function() {
        this.drawSampleImage();
        console.log('componentDidUpdate finished');
    },


    render: function() {
        var videoStyle = {position:'absolute', top:0, left:0, zIndex:-1 },
            canvasStyle = {position:'relative', zIndex:1};

        //    <video id='video' style={videoStyle}
        //        poster='/mxcube/api/v0.1/samplecentring/camera/stream' />
        //    <img src='/Users/mikegu/Desktop/md2.jpg'  style={videoStyle}
        //        id='SampleImage' className='center-block img-responsive'>
        //    </img>
                //  <img id='scream' width='220' height='277'
                //      src='./build/md2.jpg' alt='The Scream'> </img>

        return (
            React.createElement("div", null, 

                React.createElement("canvas", {id: "canvas", style: canvasStyle, height: 493, 
                    width: 659, onClick: this.onClick}, " "), 

                React.createElement("video", {id: "video", style: videoStyle, 
                    poster: "./build/md2.jpg"}, " "), 

                React.createElement("div", {id: "coordinateTextDisplay"}, " "), 

                React.createElement("hr", null), 

                React.createElement("div", {className: "panel panel-info"}, 

                    React.createElement("div", {className: "panel-heading"}, 
                        React.createElement("h3", {className: "panel-title"}, "Controls")
                    ), 

                    React.createElement("div", {className: "panel-body"}, 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.takeSnapshot}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa-save"})
                        ), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.aMethod}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa-calculator"})
                        ), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.aMethod}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa-arrows-v"})
                        ), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.aMethod}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa-camera"})
                        ), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.aMethod}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa-arrows"})
                        ), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.deletePoints}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa-times"})
                        ), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.zoomIn}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa fa-search-plus"}
                            )), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.zoomOut}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa fa-search-minus"}
                        )), 

                        React.createElement("button", {type: "button", 
                            className: "btn btn-link pull-center", 
                            onClick: this.lightOnOff}, 
                            React.createElement("i", {className: "fa fa-2x fa-fw fa fa-lightbulb-o"}
                            )
                        ), 

                        React.createElement("div", {class: "input-group"}, 

                            React.createElement("span", {class: "input-group-addon", id: "basic-addon1"}, 
                                "Kappa"), 
                            React.createElement("input", {type: "number", id: "Kappa", step: "0.01", 
                                min: "0", max: "360", 
                                class: "form-control", placeholder: "kappa", 
                                "aria-describedby": "basic-addon1", 
                                onKeyPress: this.isNumberKey, 
                                onkeyup: this.isNumberKey}, " "), 

                            React.createElement("span", {class: "input-group-addon", id: "basic-addon2"}, 
                                "Omega"), 
                            React.createElement("input", {type: "number", id: "Omega", step: "0.01", 
                                min: "0", max: "360", 
                                class: "form-control", placeholder: "omega", 
                                "aria-describedby": "basic-addon2", 
                                intermediateChanges: "true", 
                                onKeyPress: this.isNumberKey}, " "), 

                            React.createElement("span", {class: "input-group-addon", id: "basic-addon3"}, 
                                "Phi"), 
                            React.createElement("input", {type: "number", id: "Phi", step: "0.01", 
                                min: "0", max: "360", 
                                class: "form-control", placeholder: "Phi", 
                                "aria-describedby": "basic-addon3", 
                                onKeyPress: this.isNumberKey}
                            )

                        )

                    )
                ), 

                React.createElement(SingleSampleTree, null), 

                React.createElement(ExperimentConfiguration, null)

            )
        );
    }
});


SAMPLEVIEW_APP.EditableField = React.createClass({displayName: "EditableField",


    componentDidMount: function() {
        $(this.refs.editable.getDOMNode()).editable();
    },


    render: function() {
        return (
            React.createElement("p", null, this.props.name, ":", 
                React.createElement("a", {href: "#", ref: "editable", 
                    "data-name": this.props.name, "data-pk": this.props.id, 
                    "data-url": "/beam_line_update", "data-type": "text", 
                    "data-title": "Edit value"}, 
                    this.props.value
                )
            )
        );
    }
});
