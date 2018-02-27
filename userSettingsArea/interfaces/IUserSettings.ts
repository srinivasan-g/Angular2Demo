export interface IUserSettings{  
     id:string;
    userId:number;
    userGroupId:number;
    isLocalOptions:boolean;
    vehiclePriceSettings:IVehiclePriceSettings;
    useImperialProjectDb:boolean;
    excludeEmptyPrice:boolean;
    builtVehicles:boolean;
    outgoingModelYears:boolean;
    createdOn:Date;
    updatedOn:Date;
    currencyCode:string;
    lastSelectedMarket:string;
}

export interface IVehiclePriceSettings{  
    isRetailPrice:boolean;   
    isBasePrice:boolean;
    isCountrySpecificPrice:boolean;
    isCountrySpecificPrice2:boolean;
    isRetailPriceinclDelivery:boolean;
}