


//Get instance of RecordOperations Class
let recordOperations = new ZCRM.Record.Operations();
//Get instance of ParameterMap Class
let paramInstance = new ParameterMap();
//Encoding must be done for parentheses or comma
await paramInstance.add(ZCRM.Record.Model.SearchRecordsParam.CRITERIA, "(Deal_Name:starts_with: HWP | '+postcode')");
//Call searchRecords method that takes ParameterMap Instance and moduleAPIName as parameter
let response = await recordOperations.searchRecords("Deals", paramInstance);


