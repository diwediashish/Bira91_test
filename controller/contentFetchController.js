
const soapHelper = require('../utility/sfSoapHelper');
let responseDummy;
exports.fetchContentShared = async(req,res) => {
  try{
    let isDataSent = false;
    let isFinished = false;
    responseDummy = res;
    
    const waitAndSend = () => {
        setTimeout(() => {
          // If the response hasn't finished and hasn't sent any data back....
          if (!isFinished && !isDataSent) {
            // Need to write the status code/headers if they haven't been sent yet.
            responseDummy.write('');
            // Wait another 15 seconds
            waitAndSend();  
          }
        }, 15000);
      };
    const contentVersionArr = [req.body.contentVersionId];
    waitAndSend();
    for(let i of contentVersionArr){
        isDataSent = false;
        let resp = await soapHelper.fetchContentFileBase64Data(i,req);
        isDataSent = true;
        res.write((resp.result[0].VersionData));
    }
    isDataSent = true;
    isFinished = true;
    res.end();
  }
  catch(e){
    res.end();
  }
};


exports.fetchContentVersionIds = async (req,res) => {
  try{
    const sfConnection = req.conn;
    let queryString = 'SELECT Id,Title,Selling_Tools_Type__c,ContentSize,FileType,FileExtension,CreatedDate FROM ContentVersion WHERE Selling_Tools_Type__c!=null';
    if(req.body.syncDateTime){
        queryString += " AND  LastModifiedDate >= " + req.body.syncDateTime;
    }
    let sellingTools = await sfConnection.query(queryString);
    res.status(200).json({isError : false,isAuth :true,contentVersionIds : (sellingTools && sellingTools.records) ?sellingTools.records : [] });
  }
  catch(e){
    console.log(e);
    res.status(500).json({isError : true,isAuth :true,message : e});
  }
  
};

  
