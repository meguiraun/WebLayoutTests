/** @jsx React.DOM */
var SampleCentring = React.createClass({displayName: "SampleCentring",
	getInitialState: function () {
    return {
      sampleName: 'Sample_42',
      currentZoom: 0,
      zoomLevels:["Zoom 1","Zoom 2","Zoom 3","Zoom 4","Zoom 5","Zoom 6","Zoom 7","Zoom 8","Zoom 9", "Zoom 10"],
      zoomText: "Zoom 1",
      light:0,
      pos:[]
    }
  },
  componentWillMount: function(){
  },
  aMethod: function(){
      console.log('aMethod Called')  
  },
  takeSnapshot: function(){
    console.log("snapshot");
    //click points will also appear as it is rigth now, the image is automatically downloaded
    var dataURL = document.getElementById('SampleImage').src.replace("image/png", "image/octet-stream");//toDataURL("image/png");
    //dataURL = dataURL.replace("image/png", "image/octet-stream");
//    document.location.href = dataURL;
    window.open(dataURL);
  },
  drawSampleImage: function(){
    //Draws the image from the diff HO. In addition, if there are points
    // already marked in the canvas re-display them, 
    var context = document.getElementById("canvas").getContext('2d');
    context.clearRect(0, 0, 659, 493);
    var scale = this.state.zoomText;
    // var image = new Image();
    // image.src = "data:image/jpeg;base64,"+im_src;// +"\n--!>
    var points = this.state.pos;
    // image.onload = function(){
      // context.drawImage(document.getElementById("video"),0,0)
        //the next line for drawing a "|_" with the zoom text on the bottom left corner
      context.beginPath();
      context.moveTo(10, 450);
      context.lineTo(10, 480);
      context.lineTo(40, 480);
      context.strokeStyle = "red"; //red  
      context.font="10px Verdana";
      //the following text should be linked to the zoom level
      context.strokeText(scale,15,470);
      context.stroke();
      //if there are already some spots on the image redraw them
      points.map(function(point){
          console.log('iterating over points')
          context.beginPath();
          context.arc(point[0], point[1], 5, 0, Math.PI * 2);
          context.stroke();
          context.beginPath();
          context.arc(point[0], point[1], 1, 0, Math.PI * 2);
          context.stroke();

      });
    // };
  },
  drawPoint: function(x,y){
    //called by clicking in the canvas, displays a circle with a dot in the center
    var context = document.getElementById("canvas").getContext('2d');
    //draw circle
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.stroke();
    //draw center point
    context.beginPath();
    context.arc(x, y, 1, 0, Math.PI * 2);
    context.stroke();
  },
  deletePoints: function(){
    console.log("deleting")
    this.setState({pos: []});
    },
  getPosition: function (element) {
    //adjust point position according to the position of the canvas in the web-page
      var xPosition = 0;
      var yPosition = 0;
      
      while (element) {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
        }
      return { x: xPosition, y: yPosition };
  },
  onClick: function(e){
    var parentPosition = this.getPosition(e.currentTarget);
    var x = e.clientX - parentPosition.x;
    var y = e.clientY - parentPosition.y;
    var aux = this.state.pos
    aux.push([x,y])
    this.setState({pos: aux})
    this.drawPoint(x,y);
    $.ajax({
        url: '/onClick',
        data: {'PosX': x, 'PosY': y},
      type: 'PUT',
        success: function(res) {
            console.log(res);
        },
        error: function(error) {
            console.log(error);
        },
    });
  },
  addCentringPoint: function(){
  },
  startCentring: function(){
  },
  measureDistance: function(){
  },
  getBeamPosition: function(){
  },
  componentDidMount: function(){
  },
  lightOnOff: function(ev){
    console.log("ligth on/off requested")
    var newLight = Number(!this.state.ligth)
    $.ajax({
          url: '/mxcube/api/v0.1/samplecentring/light/move?newpos=newLight',
          data: {'moveable': 'Light', 'position':newLight},//not really needed, everything in the url (motor and newpos) 
        type: 'PUT',
          success: function(res) {
              console.log(res);
              this.set.state({ligth:newLight})
          },
          error: function(error) {
            console.log(error);
          },
      });
  },
  zoomIn: function(ev){
    var newIndex = Math.max(0, Math.min(this.state.currentZoom+=1, 9))
    var newZoom = this.state.zoomLevels[newIndex]
    this.setState({currentZoom: newIndex})
    this.setState({zoomText: newZoom})
    $.ajax({
          url: '/mxcube/api/v0.1/samplecentring/zoom/move',
          data: JSON.stringify({'moveable': 'Zoom', 'position': newZoom}, null, '\t'),
          contentType: 'application/json;charset=UTF-8',
          type: 'PUT',
          success: function(res) {
              console.log(res);
          },
          error: function(error) {
            console.log(error);
          },
      });
  },
  zoomOut: function(ev){
    var newIndex = Math.max(0, Math.min(this.state.currentZoom-=1, 9))
    var newZoom = this.state.zoomLevels[newIndex]
    this.setState({currentZoom: newIndex})
    this.setState({zoomText: newZoom})
    $.ajax({
      url: '/mxcube/api/v0.1/samplecentring/zoom/move?newpos='+newZoom,
      data: JSON.stringify({'moveable': 'Zoom', 'position': newZoom}, null, '\t'),//not really needed, everything in the url (motor and newpos) 
      contentType: 'application/json;charset=UTF-8',
      type: 'PUT',
      success: function(res) {
          console.log(res);
      },
      error: function(error) {
        console.log(error);
      },
    });
    },
  //only will send data when 'enter' key is pressed, the spinbox up/down fire the onInput event, as well as anything type in the box, so for setting 314.5 -> four event are sent. TODO: add event handling for the spin box, so a different filter is needed.
  push: function(id,data){
    console.log("push requested")
    $.ajax({
      url: '/mxcube/api/v0.1/samplecentring/'+id+'/move?newpos='+data,
      data: {'moveable': id, 'position':data},//not really needed, everything in the url (motor and newpos) 
      type: 'PUT',
      success: function(res) {
          console.log(res);
        },
      error: function(error) {
        console.log(error);
        },
    });
  },
  isNumberKey: function(ev){
      var charCode = (ev.which) ? ev.which : event.keyCode
      //be carefull, ascii 46 = '.', but 47='/' and 48='0', a better filtering required
      if (charCode > 31 && (charCode < 46 || charCode > 57)){
            return false;}
      if (ev.key == "Enter"){
            this.push(ev.target.id,document.getElementById(ev.target.id).value)
      }
         return true;
      },
  componentDidUpdate: function(){
      this.drawSampleImage();
      console.log('comp did update')
    },

  render: function () {
    var videoStyle = {position:'absolute', top:0, left:0, zIndex:-1 };
    var canvasStyle = {position:'relative', zIndex:1};
//    <video id="video" style={videoStyle} poster="/mxcube/api/v0.1/samplecentring/camera/stream" />
//    <img src="/Users/mikegu/Desktop/md2.jpg"  style={videoStyle} id='SampleImage' className="center-block img-responsive"> </img>
    return (
                React.createElement("div", null, 
                    React.createElement("canvas", {id: "canvas", style: canvasStyle, height: 493, width: 659, onClick: this.onClick}), 
                    React.createElement("video", {id: "video", style: videoStyle, poster: "/Users/mikegu/Desktop/md2.jpg"}), 
                    React.createElement("hr", null), 
                    React.createElement("div", {className: "panel panel-info"}, 
                        React.createElement("div", {className: "panel-heading"}, 
                            React.createElement("h3", {className: "panel-title"}, "Controls")
                        ), 
                        React.createElement("div", {className: "panel-body"}, 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.takeSnapshot}, React.createElement("i", {className: "fa fa-2x fa-fw fa-save"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.aMethod}, React.createElement("i", {className: "fa fa-2x fa-fw fa-calculator"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.aMethod}, React.createElement("i", {className: "fa fa-2x fa-fw fa-arrows-v"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.aMethod}, React.createElement("i", {className: "fa fa-2x fa-fw fa-camera"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.aMethod}, React.createElement("i", {className: "fa fa-2x fa-fw fa-arrows"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.deletePoints}, React.createElement("i", {className: "fa fa-2x fa-fw fa-times"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.zoomIn}, React.createElement("i", {className: "fa fa-2x fa-fw fa fa-search-plus"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.zoomOut}, React.createElement("i", {className: "fa fa-2x fa-fw fa fa-search-minus"})), 
                            React.createElement("button", {type: "button", className: "btn btn-link  pull-center", onClick: this.lightOnOff}, React.createElement("i", {className: "fa fa-2x fa-fw fa fa-lightbulb-o"})), 
                            React.createElement("div", {class: "input-group"}, 
                              React.createElement("span", {class: "input-group-addon", id: "basic-addon1"}, "Kappa   "), 
                              React.createElement("input", {type: "number", id: "Kappa", step: "0.01", min: "0", max: "360", class: "form-control", placeholder: "kappa", "aria-describedby": "basic-addon1", onKeyPress: this.isNumberKey, onkeyup: this.isNumberKey}, " "), 
                              React.createElement("span", {class: "input-group-addon", id: "basic-addon2"}, "Omega   "), 
                              React.createElement("input", {type: "number", id: "Omega", step: "0.01", min: "0", max: "360", class: "form-control", placeholder: "omega", "aria-describedby": "basic-addon2", intermediateChanges: "true", onKeyPress: this.isNumberKey}, " "), 
                              React.createElement("span", {class: "input-group-addon", id: "basic-addon3"}, "Phi   "), 
                              React.createElement("input", {type: "number", id: "Phi", step: "0.01", min: "0", max: "360", class: "form-control", placeholder: "Phi", "aria-describedby": "basic-addon3", onKeyPress: this.isNumberKey}, " ")
                            )
                        )
                    ), 
                    React.createElement(SingleSampleTree, null), 
                    React.createElement(ExperimentConfiguration, null)
                )
            );        
  },
});
var EditableField = React.createClass({displayName: "EditableField",
  
   componentDidMount: function() {
      $(this.refs.editable.getDOMNode()).editable();
   }, 

   render: function() {
       return React.createElement("p", null, this.props.name, ": ", React.createElement("a", {href: "#", ref: "editable", "data-name": this.props.name, "data-pk": this.props.id, "data-url": "/beam_line_update", "data-type": "text", "data-title": "Edit value"}, this.props.value))
   } 
})

