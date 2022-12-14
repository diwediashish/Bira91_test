exports.fetchHomePageData =async (req,res) => {
    try{
        let sfConnection = req.conn;
        let reports =await sfConnection.query("SELECT Id,DeveloperName FROM Report WHERE FolderName LIKE '%Backend%'").execute();
        let reportIdMap = new Map();
        let reportValues = {};
        let timeoutHandler ;
        res.setHeader('Content-Type','application/json');
        // Time Out Check
        timeoutHandler = setTimeout(() => {
            res.write('');
        },20000);
        // Time Out Check
        reports.records.forEach(ele => {
            if(ele.DeveloperName==='Volume_Achievement_Overall'){
                reportIdMap.set('Volume_Achievement_Overall',ele.Id);
            }
            if(ele.DeveloperName==='Volume_Target_overall'){
                reportIdMap.set('Volume_Target_overall',ele.Id);
            }
            if(ele.DeveloperName==='Volume_Achievement_Premium'){
                reportIdMap.set('Volume_Achievement_Premium',ele.Id);
            }
            if(ele.DeveloperName==='Volume_Target_Premium'){
                reportIdMap.set('Volume_Target_Premium',ele.Id);
            }
            if(ele.DeveloperName==='Volume_Achievement_Boom'){
                reportIdMap.set('Volume_Achievement_Boom',ele.Id);
            }
            if(ele.DeveloperName==='Volume_Target_Boom'){
                reportIdMap.set('Volume_Target_Boom',ele.Id);
            }
            if(ele.DeveloperName==='Distribution_Premium_Achievement1'){
                reportIdMap.set('Distribution_Premium_Achievement1',ele.Id);
            }
            if(ele.DeveloperName==='Distribution_Premium_Target1'){
                reportIdMap.set('Distribution_Premium_Target1',ele.Id);
            }
            if(ele.DeveloperName==='Distribution_Boom_Achievement1'){
                reportIdMap.set('Distribution_Boom_Achievement1',ele.Id);
            }
            if(ele.DeveloperName==='Distribution_Boom_Target1'){
                reportIdMap.set('Distribution_Boom_Target1',ele.Id);
            }
            if(ele.DeveloperName==='Range_Target'){
                reportIdMap.set('Range_Target',ele.Id);
            }
            if(ele.DeveloperName==='Range_Achievement'){
                reportIdMap.set('Range_Achievement',ele.Id);
            }
        });
        for(let [key,value] of  reportIdMap.entries()){
            let reportReference = sfConnection.analytics.report(value);
            let reportData =await reportReference.execute({ details: true });
            if(key==='Range_Achievement'){
                let liquidSold = 0;
                let noOfOutletSet = new Set();
            
                for(let i of reportData.groupingsDown.groupings){
                    liquidSold++;
                    i.groupings.forEach(ele => {
                        noOfOutletSet.add(ele.value);
                    });
                    
                }
                reportValues.Range_Achievement = parseFloat(parseFloat(liquidSold)/parseFloat(noOfOutletSet.size === 0 ? 1 : noOfOutletSet.size )).toFixed(2);
            }
            else{
                reportValues[key] = reportData.factMap['T!T'].aggregates[0].value;
            }
        }
        let dashboards = await sfConnection.query("Select Id,DeveloperName,Title FROM Dashboard WHERE Title = 'Target vs Achievement' OR Title='Range Target vs Achievement' ORDER BY Title");
        
        if(dashboards){
            if(dashboards.records){
                if(dashboards.records[0]){
                    reportValues['Range'] = dashboards.records[0].Id;
                }
                if(dashboards.records[1]){
                    reportValues['Volume'] = dashboards.records[1].Id;
                }
            }
        }
        // reportValues['loginUrl'] = sfConnection.loginUrl;
        // res.status(200).json({isError : false,isAuth : true,reportValues :reportValues });
        reportValues['loginUrl'] = sfConnection.loginUrl;
        res.write(JSON.stringify(reportValues));
        clearTimeout(timeoutHandler);
        res.end();
    }
    catch(e){
        // console.log(e);
        // res.status(500).json({isError : true,isAuth : true,message : e});
        console.log(e);
        res.end();
        
    }
    
};

