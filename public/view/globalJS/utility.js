createCard = (img, index, title, body, eventListner) => {
  var tmp = "";

  tmp +=
    '<div class="media" data-index=' +
    index +
    ' onclick="' +
    eventListner +
    '">';
  tmp += '  <div class="media-left">';
  tmp += '    <img src="' + img + '" class="media-object" style="width:37%">';
  tmp += "  </div>";
  tmp += '  <div class="media-body">';
  tmp += '    <h4 class="media-heading">' + title + "</h4>";
  tmp += "    <p>" + body + "</p>";
  tmp += "  </div>";
  tmp += "</div>";

  return tmp;
};

const createCheckBox = (key, label, eventListener, checked) => {
  let checkbox = "";

  checkbox += '<div class="form-group">';
  checkbox += '  <label class="switch">';
  if (label) {
    checkbox += "     <p>" + label + "</p> ";
  }

  if (checked) {
    checkbox +=
      '     <input checked type="checkbox" id="' +
      key +
      '"  onchange="' +
      eventListener +
      '">';
  } else {
    checkbox +=
      '     <input  type="checkbox" id="' +
      key +
      '"  onchange="' +
      eventListener +
      '">';
  }

  checkbox += '     <span class="slider round"></span>';
  checkbox += "  </label>";
  checkbox += "</div>";

  return checkbox;
};

const createImgInput = (key, label, value, eventListener, capture) => {
  let tmp = "";

  tmp += '  <div class="image-upload form-group">';
  tmp += '      <label for="' + key + '">';
  if (value) {
    tmp +=
      '         <i class="fa fa-camera ' +
      key +
      '"  style="font-size: 2rem;color:#5cb85c;" aria-hidden="true"></i>' +
      label;
  } else {
    tmp +=
      '         <i class="fa fa-camera ' +
      key +
      '"  style="font-size: 2rem;" aria-hidden="true"></i>' +
      label;
  }
  tmp += "      </label>";
  if (capture) {
    tmp +=
      '      <input id="' +
      key +
      '" capture="camera" value="' +
      value +
      '"  onchange="' +
      eventListener +
      '"   accept="image/*" type="file"/>';
  } else {
    tmp +=
      '      <input id="' +
      key +
      '" value="' +
      value +
      '"  onchange="' +
      eventListener +
      '"    accept="image/*" type="file"/>';
  }

  tmp += "  </div>";

  return tmp;
};

const createHelpText = text => {
  let helpText = "";

  helpText += '<span class="tooltip"><img src="/media/icons/info.png"/>';
  helpText += '<span class="tooltiptext">' + text + "</span>";
  helpText += "</span>";

  return helpText;
};

const createSelectOption = (key, label, values, eventListener, select) => {
  let tmp = "";
  tmp += '<div class="form-group">';

  tmp +=
    '<select id="' +
    key +
    '" class="form-control" onchange="' +
    eventListener +
    '">';

  var option = "";
  option += '<option value="">--None--';
  option += "</option>";
  $.each(values, function (index, obj) {
    option +=
      '<option value="' +
      obj +
      '" ' +
      (select == obj ? "selected" : " ") +
      ">" +
      obj;
    option += "</option>";
  });
  tmp += option;
  tmp += "</select>";
  tmp += "</div>";
  return tmp;
};

createRangeSlider = (id, value, displayValue, eventListener, min, max) => {
  let tmp = "";

  tmp += '<div class="slidecontainer">';
  tmp += '<div class="rangeSlider">';
  tmp +=
    ' <input type="range" data-Id="' +
    id +
    '" min="' +
    min +
    '" max="' +
    max +
    '" value="' +
    value +
    '" onchange="' +
    eventListener +
    '" class="range" id="' +
    id +
    '">';
  tmp +=
    ' <div class="backColor" id="backColor' +
    id +
    '" style="width:' +
    value +
    '%"></div>';
  tmp += "</div>";
  tmp +=
    ' <p>[ <span id="quantity' + id + '">' + displayValue + "</span> ]</p>";
  tmp += "</div>";
  return tmp;
};
const createInputReadonly = (key, label, eventListener, value) => {
  let input = "";

  input += '<div class="form-group">';
  if (label) {
    input += '  <label class="control-label">';
    input += label;
    input += "  </label>";
  }
  input +=
    '     <input class="form-control" type="text" value="' +
    value +
    '" readonly id="' +
    key +
    '"  onkeyup="' +
    eventListener +
    '">';
  input += "</div>";

  return input;
};
const createNumberInput = (key, label, eventListener, value) => {
  let input = "";

  input += '<div class="form-group">';
  if (label) {
    input += '  <label class="control-label">';
    input += label;
    input += "  </label>";
  }

  input +=
    '     <input class="form-control" type="number" value="' +
    value +
    '" id="' +
    key +
    '"  onkeyup="' +
    eventListener +
    '">';
  input += "</div>";

  return input;
};
const createRodioInput = (key, label, eventListener, name, checked) => {
  let rad = "";
  rad += '     <div class="form-group">';
  rad += '         <div class="radio">';
  rad +=
    '             <label><input type="radio" ' +
    (checked ? "checked" : "") +
    ' onchange="' +
    eventListener +
    '" id="' +
    key +
    '" name="' +
    name +
    '">' +
    label +
    "</label>";
  rad += "         </div>";
  rad += "     </div>";
  return rad;
};

const createDateInput = (key, label, eventListener, value,max,min) => {
  let input = "";

  input += '<div class="form-group">';
  if (label) {
    input += '  <label class="control-label">';
    input += label;
    input += "  </label>";
  }
  if(max&&min){
    input +=
    '     <input class="form-control date-value" data-date="" data-date-format="DD/MM/YYYY" max="'+max+'" min="'+min+'" type="date" value="' +
    value +
    '" id="' +
    key +
    '"  onchange="' +
    eventListener +
    '">';
  input += "</div>";
  }
  else{
    input +=
    '     <input class="form-control date-value" data-date="" data-date-format="DD/MM/YYYY"  type="date" value="' +
    value +
    '" id="' +
    key +
    '"  onchange="' +
    eventListener +
    '">';
  input += "</div>";
  }
  

  return input;
};



