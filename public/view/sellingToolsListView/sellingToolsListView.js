let fileList = [
    // {
    //     "Id" : 12345,
    //     "Name" : "Deepak.pdf",
    //     "File" : "",
    //     "Size" : "12 KB",
    //     "createdDate" : "2020-06-05T11:46:56.000Z",
    //     "base64" : "SWYgSSBoYWQgYSBuaWNrbGUgZm9yIGV2ZXJ5IHRpbWUgSSBoYWQgYSBuaWNrbGUsIEknZCBoYXZlIGVhdGVuIHR3aWNlIGFzIG1hbnkgcGlja2xlcy4="
    // },
    // {
    //     "Id" : 777345,
    //     "Name" : "Ajitesh.doc",
    //     "File" : "",
    //     "Size" : "3.5 KB",
    //     "createdDate" : "2020-06-04T11:46:56.000Z",
    //     "base64" : "SWYgSSBoYWQgYSBuaWNrbGUgZm9yIGV2ZXJ5IHRpbWUgSSBoYWQgYSBuaWNrbGUsIEknZCBoYXZlIGVhdGVuIHR3aWNlIGFzIG1hbnkgcGlja2xlcy4="
    // },
    // {
    //     "Id" : 98345,
    //     "Name" : "Audio.mp4",
    //     "File" : "",
    //     "Size" : "3.5 KB",
    //     "createdDate" : "2020-06-04T11:46:56.000Z",
    //      "base64" : "http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3"
    // }
];

let fileListMaster = [];
let setOfExt = new Set();
let listOfFiles = [];
let fileNDataMap = new Map();

const initializeMethod = () =>{
    fileListMaster = fileList;
    fileListMaster.filter((ele) => {
        setOfExt.add(ele.FileExtension);
    });

    createSelectOption(setOfExt);

    fileList = fileList.sort((a, b) => new Date(a.CreatedDate) - new Date(b.CreatedDate));

    for(let i of fileList){
        if(i.Title.toLowerCase().includes('preview')){
            fileNDataMap.set(i.Title.split('-')[0].trim(),i.VersionData);
        }
    }
    
    showFileList(fileList);
    
};

const createSelectOption = (options) =>{
    $('#selectExt').html('');
    let tmp = '';
    
        
    tmp = '<option disabled selected value="">Select Extension</option>';
    tmp += '<option value="">--None--</option>';

    options.forEach(option => {
        tmp +=`
            <option value="${option}">${option}</option>
        `;
    });
    
    $('#selectExt').append(tmp);
};

const showFileList = (fileList) =>{
    $('#listOfFiles').empty();
    let tmp = '';
    const options = {
        weekday: "long",
        year: "numeric",
        month:"long",
        day:"numeric"
   };
    if(fileList.length>0)
    {
        $('#listOfFiles').html('');
        for(let i=0;i<fileList.length;i++)
        {
            if(!fileList[i].Title.toLowerCase().includes('preview')){
        
                let img = '';
                let ext = fileList[i].FileExtension;
                if(fileList[i].FileExtension == 'pdf')
                {
                    img = '/media/icons/pdf.jpg';
                }else if(fileList[i].FileExtension == 'doc')
                {
                    img = '/media/icons/doc.jpg';
                }
                else if(fileList[i].FileExtension == 'mp4')
                {
                    img = '/media/icons/video.png';
                }
                else if(fileList[i].FileExtension == 'png' ||fileList[i].FileExtension == 'jpg'||fileList[i].FileExtension == 'jpeg')
                {
                    img = '/media/icons/image-icon.jpg';
                }

                let base64;
                if(fileNDataMap.has(fileList[i].Title)){
                    base64 = fileNDataMap.get(fileList[i].Title)
                }
                // let base64 = fileList[i].VersionData; 
               // <img src="${img}" class="media-object" style="width:60px">
                        
                tmp +=`
                <div class="media" onclick="showDocument('${ext}','${fileList[i].Id}')">
                    <div class="media-left">
                    ${base64 ? `<img src="data:image/${fileList[i].FileExtension};base64,${base64}" alt="Image Not Supported" style="width:70px;height:70px" />
                    `:
                    `<img src="${img}" class="media-object" style="width:60px">`}
                    
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${fileList[i].Title}</h4>
                        <p class="text-muted"><span>${formatBytes(fileList[i].ContentSize)}</span><span>${new Date(fileList[i].CreatedDate).toLocaleDateString('en-US',options)}</span></p>
                    </div>
                </div>
                `;
            }
        }
        $('#listOfFiles').append(tmp);
    }
    else{
        tmp+= `<div class="alert alert-info text-center" role="alert">
        No Files for this category found!
      </div>`;
      $('#listOfFiles').append(tmp);
    }

};



const showDocument = (ext,Id) =>{

    if(ext == 'pdf')
    {
        window.location.href = `/view/sellingToolsListView/fileViewer.html?type=${ext}&id=${Id}`;   
    }else if(ext == 'mp3')
    {
        $('#audioModal').modal('show');
        $('#audio').attr('src','');
        $('#audio').attr('src','data:audio/ogg;'+base64);
    }else if(ext == 'mp4')
    {   
        window.location.href = `/view/sellingToolsListView/fileViewer.html?type=${ext}&id=${Id}`;   
    }
    else if(ext == 'png'||ext == 'jpeg'||ext == 'jpg')
    {   
        window.location.href = `/view/sellingToolsListView/fileViewer.html?type=${ext}&id=${Id}`;   
    }
}


const handleChangeFilter = () =>{
    let searchInput = $('#searchBox').val() ? $('#searchBox').val() : null;
    let selectEle = $('#selectExt').val() ? $('#selectExt').val() : null;


    
    fileList = fileListMaster.filter((ele) => {
        let isValid = true;
        if (ele.Title && searchInput) {
          if (ele.Title.toLowerCase().indexOf(searchInput.toLowerCase()) < 0) {
            isValid = false;
          }
        }

        if (ele.FileExtension && selectEle) {
            if (ele.FileExtension.toLowerCase().indexOf(selectEle.toLowerCase()) < 0) {
              isValid = false;
            }
          }
        return isValid;
    });

    showFileList(fileList);
};


let clickCount = 0;
const sortFiles = (ele) =>{
    let id = $(ele).attr('id');

    clickCount++;

    if(clickCount % 2 == 0)
    {
        if(id == 'sortingDate')
        {
            fileList = fileList.sort((a, b) => new Date(a.CreatedDate) - new Date(b.CreatedDate));
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-down"></i> Date');
        }
        else{
            fileList = fileList.sort((a, b) => (a.color > b.color) ? 1 : -1);
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-down"></i> Name');
        }
    }else{
        if(id == 'sortingDate')
        {
            fileList = fileList.sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-up"></i> Date');
        }
        else{
            fileList = fileList.sort((a, b) => (a.color < b.color) ? 1 : -1);
            $(`#${id}`).html('');
            $(`#${id}`).html('<i class="fas fa-sort-amount-up"></i> Name');
        }
    }
    showFileList(fileList); 
};



// Bytes Conversion to MB
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 MB';
    // console.log(bytes);
    // const k = 1024*1024;
    // const dm = decimals < 0 ? 0 : decimals;
    // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    // const i = Math.floor(Math.log(bytes) / Math.log(k));
    const mbConstant = 0.00000095367432;


    return parseFloat(mbConstant*bytes).toFixed(2)+' MB';
}