// Loaded via <script> tag, create shortcut to access PDF.js exports.
let pdfjsLib = window['pdfjs-dist/build/pdf'];

 let base64 = null;
const initializeFile = () =>{

    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('type')==='mp4'){
       

        $('#video').html('');

        let tmp = `
         <source  type="video/webm" src="data:video/webm;base64,${base64.VersionData}">
         <source type="video/mp4" src="data:video/mp4;base64,${base64.VersionData}">
        `;
        $('#video').append(tmp);
        $('.video-section').css('display','block');
        

    }else if(urlParams.get('type')==='pdf'){  
        let ext = urlParams.get('type');
        
        // let tmp =`<embed width="100%" height="100%" src="data:application/${ext};base64,${base64.VersionData}" type="application/${ext}" />`;
        // // let tmp =`<object  data="data:application/${ext};base64,${base64.VersionData}"  type="application/${ext}" />`;
        // $('.doc-section').append(tmp);
        $('.doc-section').css('display','block');
        var pdfData = atob(base64.VersionData);
        pdfjsLib.getDocument({data: pdfData}).promise.then(function(pdfDoc_) {
            pdfDoc = pdfDoc_;
            document.getElementById('page_count').textContent = pdfDoc.numPages;
    
            // Initial/first page rendering
            renderPage(pageNum);
            });
    }
    else if(urlParams.get('type')==='png' || urlParams.get('type')==='jpg'|| urlParams.get('type')==='jpeg'){
      let ext = urlParams.get('type');
      

      let tmp =  `
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-12">
            <img src="data:image/${ext};base64,${base64.VersionData}" alt="Image Not Supported" style="width:100%" />
            </div>  
          </div>
        </div>
      `;

      $('.image-section').append(tmp);
      $('.image-section').css('display','block');
        
    }
   
};


// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);


