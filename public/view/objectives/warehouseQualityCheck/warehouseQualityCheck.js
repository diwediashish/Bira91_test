let warehouseAudit = {};

let warehouseAuditField = [
    "X5S__c", "Warehouse_Safety__c", "Direct_Sunlight__c", "Stock_Location__c", "Warehouse_Lighting__c", "Pest_Control_Personnel_Visit__c",
 "Pest_Control_Device__c", "Pest_Evidence__c", "Pesticide_Spray__c","Warehouse_Buliding_amp_Construction__c",
 "Any_Interior_Leakage__c", "Warehouse_Ventilation__c","Warehouse_Facilities__c","Warehouse_Doors_amp_Shutters__c",
"Loading_amp_Unloading_Loader__c","Warehouse_Stock_Age_Control__c","Non_confroming_Beer__c","Procedural_Repackaging__c",
"Finished_Product_Loading_Inspection__c","Finished_Product_Storage__c","Can_daily_inspection__c","Handle_loading__c",
"Can_Palleting__c","Verify_Package_Inspection__c","Vehicle_Requirement_amp_Vehicle_Reques__c","Vehicle_Inspection__c",
"Prevent_Mix_Loading_Management__c","Stacking_Height__c",];

let mapOfFieldLabel = new Map([
   ["X5S__c","5S"],
   ["Warehouse_Safety__c","Warehouse Safety"],
   ["Direct_Sunlight__c","Direct Sunlight"],
   ["Stock_Location__c","Stock Location"],
   ["Warehouse_Lighting__c","Warehouse Lighting"],
   ["Pest_Control_Personnel_Visit__c","Pest Control Personnel Visit"],
   ["Pest_Control_Device__c","Pest Control Device"], 
   ["Pest_Evidence__c","Pest Evidence"],
   ["Pesticide_Spray__c","Pesticide Spray"],
   ["Warehouse_Buliding_amp_Construction__c","Warehouse Buliding & Construction"],
   ["Any_Interior_Leakage__c","Any Interior Leakage"],
   ["Warehouse_Ventilation__c","Warehouse Ventilation"],
   ["Warehouse_Facilities__c","Warehouse Facilities"],
   ["Warehouse_Doors_amp_Shutters__c","Warehouse Doors & Shutters"],
   ["Loading_amp_Unloading_Loader__c","Loading & Unloading Loader"],
   ["Warehouse_Stock_Age_Control__c","Warehouse Stock Age Control"],
   ["Non_confroming_Beer__c","Non confroming Beer"],
   ["Procedural_Repackaging__c","Procedural Repackaging"],
   ["Finished_Product_Loading_Inspection__c","Finished Product Loading Inspection"],
   ["Finished_Product_Storage__c","Finished Product Storage"],
   ["Can_daily_inspection__c","Can daily inspection"],
   ["Handle_loading__c","Handle loading"],
   ["Can_Palleting__c","Can Palleting"],
   ["Verify_Package_Inspection__c","Verify Package Inspection"],
   ["Vehicle_Requirement_amp_Vehicle_Reques__c","Vehicle Requirement & Vehicle Request"],
   ["Vehicle_Inspection__c","Vehicle Inspection"],
   ["Prevent_Mix_Loading_Management__c","Prevent Mix Loading Management"],
   ["Stacking_Height__c","Stacking Height"],
]);

initializeWarehouse = () =>{
    createWarehouseAudit();
};

const createWarehouseAudit = () =>{
    let tmp = '';

    $('#warehouse').html('');
    for(let i = 0;i <warehouseAuditField.length; i++)
    {
        tmp += `
        
            <div class="col-xs-6">
                <label>${mapOfFieldLabel.get(warehouseAuditField[i])}</label>
            </div>
            <div class="col-xs-6">
                <label class="switch">
                    <input type="checkbox" value="" id="${warehouseAuditField[i]}" onchange="checkBoxChangeHandler(this)">
                    <span class="slider round"></span>
                </label>
            </div>
        `;
    }
    $('#warehouse').append(tmp);
};

const checkBoxChangeHandler = (ele) =>{
    wareHouseQualityCheck[$(ele).attr('id')] = $(ele).prop('checked');
};

