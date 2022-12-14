const createPickListKYC = (values,displays,selected,label,key,eventListner,multipicklist,disabled) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'form-group';
    let inputInput = document.createElement('select');
    inputInput.className =  'form-control ';
    inputInput.id = key;
    inputInput.value = '';
    inputInput.type = 'text';
    inputInput.setAttribute('data-record',key);
    if(multipicklist){
        
        inputInput.multiple = true;
    }
    let inputLabel = document.createElement('label');
    inputLabel.setAttribute('for',key);
    inputLabel.className = 'control-label';
    inputLabel.innerHTML = label;
    let option = document.createElement('option');
    option.className = 'mdl-menu__item';
    option.innerHTML = '--Please Select--';
    inputInput.disabled = disabled;

    option.value = '';
    if(multipicklist){
        option.disabled = true;
    }
    inputInput.appendChild(option);
    
    if(eventListner){
            inputInput.addEventListener('change',eventListner);
    }
    if(typeof selected === "object"){
        let selectedSet = new Set(selected);
        values.forEach((ele,index) => {
            let option = document.createElement('option');
            option.className = 'mdl-menu__item';
            option.setAttribute('value',ele);
            if(selectedSet.has(ele)){
                option.setAttribute('selected',true);
            }
            option.innerHTML = displays[index];
            
            inputInput.appendChild(option);
        });
    }   
    else{
        values.forEach((ele,index) => {
            let option = document.createElement('option');
            option.className = 'mdl-menu__item';
            option.setAttribute('value',ele);
            if(selected===ele){
                option.setAttribute('selected',true);
            }
            option.innerHTML = displays[index];
            
            inputInput.appendChild(option);
        });
    }
    
    let edit = document.createElement('div');
    if(key == 'Channel' || key == 'Sub_Channel' || key == 'Type' || key == 'Beer_Selection' || key == 'Zomato_Cost_for_2'){
        edit.className = 'editBtn ';
        
        edit.setAttribute('data-toggle','modal');
        let modalId = '#'+key+'modal';
        edit.setAttribute('data-target',modalId);
        
        let i = document.createElement('i');
        i.className = 'far fa-edit';
        edit.appendChild(i);
    }

    outerDiv.appendChild(inputLabel);
    outerDiv.appendChild(inputInput);
    outerDiv.appendChild(edit);

    return outerDiv;
};

const textFieldCreation = (key,label,eventListener,value) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label';
    let inputEle = document.createElement('input');
    inputEle.className = 'mdl-textfield__input';
    inputEle.type = 'text';
    inputEle.id = key;
    inputEle.value = value;
    let inputLabel = document.createElement('div');
    inputLabel.className = 'mdl-textfield__label';
    inputLabel.for = key;
    inputLabel.innerHTML = label;
    outerDiv.appendChild(inputEle);
    outerDiv.appendChild(inputLabel);
    if(eventListener){
        inputEle.addEventListener('keyup',eventListener);
    }
    return outerDiv;
};

const dateFieldCreation = (key,label,eventListener,value,required) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label';
    let inputEle = document.createElement('input');
    inputEle.className = 'mdl-textfield__input';
    inputEle.type = 'date';
    inputEle.id = key;
    inputEle.value = value;
    inputEle.required = required?required : false;
    let inputLabel = document.createElement('div');
    inputLabel.className = 'mdl-textfield__label';
    inputLabel.for = key;
    inputLabel.innerHTML = label;
    outerDiv.appendChild(inputEle);
    outerDiv.appendChild(inputLabel);
    if(eventListener){
        inputEle.addEventListener('change',eventListener);
    }
    return outerDiv;
};

const numberFieldCreation = (key,label,eventListener,value,readOnly) => {
  let outerDiv = document.createElement('div');
  outerDiv.className = 'form-group';
  let inputNo = document.createElement('input');
  inputNo.className = 'form-control';
  inputNo.type = 'number';
  inputNo.pattern = '-?[0-9]*(\.[0-9]+)?';
  inputNo.id = key;
  inputNo.value = value;
  if(readOnly){
      inputNo.readOnly = true;
  }
  let noLabel = document.createElement('label');
  noLabel.className = 'control-label';
  noLabel.for = key;
  noLabel.innerHTML = label;
  if(eventListener){
    inputNo.addEventListener('keyup',eventListener);
  }
  outerDiv.appendChild(noLabel);
  outerDiv.appendChild(inputNo);
  
  
  return outerDiv;
};


const checkBoxCreationKYC = (key,label,eventListener,checked) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'form-group';
    let checkLabel = document.createElement('label');
    checkLabel.className = 'control-label switch';
    checkLabel.innerHTML = label;
    checkLabel.for = key;
    let checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.id = key;
    checkInput.className = 'form-control';
    checkInput.checked = checked;
    let checkSpan = document.createElement('span');
    checkSpan.className = 'slider round';

    if(eventListener){
        checkInput.addEventListener('change',eventListener); 
    }
    checkLabel.appendChild(checkInput);
    checkLabel.appendChild(checkSpan);
    outerDiv.appendChild(checkLabel);
   
    return outerDiv;
};
const checkBoxCreationReason = (key,label,eventListener,checked,disabled) => {
    let outerDiv = document.createElement('div');
    outerDiv.className = 'form-group';
    let checkLabel = document.createElement('label');
    checkLabel.className = 'control-label switch';
    checkLabel.innerHTML = label;
    checkLabel.for = key;
    let checkInput = document.createElement('input');
    checkInput.type = 'checkbox';
    checkInput.id = key;
    checkInput.className = 'form-control';
    if(checked){
        checkInput.setAttribute('checked',true);
    }
    
    
    checkInput.disabled = disabled;
    let checkSpan = document.createElement('span');
    checkSpan.className = 'slider round';

    if(eventListener){
        checkInput.addEventListener('change',eventListener); 
    }

    let edit = document.createElement('div');
    // key == 'Beacon_Flag'
    if(key == 'QCO_Flag'){
        edit.className = 'editBtn';
        edit.setAttribute('data-toggle','modal');
        let modalId = '#'+key+'modal';
        edit.setAttribute('data-target',modalId);
        
        let i = document.createElement('i');
        i.className = 'far fa-edit';
        edit.appendChild(i);
    }

    checkLabel.appendChild(checkInput);
    checkLabel.appendChild(checkSpan);
    outerDiv.appendChild(checkLabel);
    outerDiv.appendChild(edit);

   
    return outerDiv;
};