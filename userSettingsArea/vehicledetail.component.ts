import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../../common/fadeInAnimation';
import { UserSelectOptionServices } from '../../services/user.option';
import { DataSharingService } from '../../common/dataSharing';
import { ConfigService, IConfig } from '../../app.config';

@Component({
  selector: 'app-vehicledetail',
  templateUrl: './vehicledetail.component.html',
  styleUrls: ['./vehicledetail.component.css'],
  inputs: ['formateVehicleData', 'getMinWidth', 'showNumerical'],
  animations: [flyInOut]
})
export class VehicledetailComponent implements OnInit {
  config: IConfig;
  public formateVehicleData = this.formateVehicleData;
  public getMinWidth: any = this.getMinWidth;
  public showNumerical: boolean = this.showNumerical;
  constructor(
    private userOption: UserSelectOptionServices,
    private dataSharing: DataSharingService,
    private configService: ConfigService
  ) {
    this.config = this.configService.getAppConfig();
   }

  ngOnInit() {
  }
  getTooTip(data: any) {
    /* this.store.select('addBuildVehicle').subscribe((data: any) => {
    
    }) */
    //console.log(data);
    let toolTipString: string;

    if (data.formattedValues) {
      data.formattedValues.forEach(element => {
        toolTipString = element.optionCode ? "<li class='toolTipsLineHeight'> [ " + element.optionCode + " ] " + element.optionDescription + "</li>" : '';
      });
    }

    if (data.attributeNodes) {

      data.attributeNodes.forEach(element => {
        let attributes = ["Requires:", "Excludes:", "Includes:"];
        let partsOfStr = element.label.split("#-#");
        if (attributes.indexOf(partsOfStr[0]) !== -1) {
          toolTipString = toolTipString ? toolTipString + "<li class='toolTipsLineHeight'>" + partsOfStr[1] + "</li>" : "<li class='toolTipsLineHeight'>" + partsOfStr[1] + "</li>";
        } else {
          let partsOfAndOr = element.label.split("#|#");
          if (partsOfAndOr[0].trim() === "And" || partsOfAndOr[0].trim() === "and" || partsOfAndOr[0].trim() === "Or" || partsOfAndOr[0].trim() === "or") {
            toolTipString = toolTipString ? toolTipString + "<li class='toolTipsLineHeight'>" + partsOfAndOr[1] + "</li>" : "<li class='toolTipsLineHeight'>" + partsOfAndOr[1] + "</li>";
          } else {
            toolTipString = toolTipString ? toolTipString + "<li class='toolTipsLineHeight'>" + element.label + "</li>" : "<li class='toolTipsLineHeight'>" + element.label + "</li>";
          }
        }

        if (element.nodes.length > 0) {
          element.nodes.forEach(node => {
            toolTipString = toolTipString ? toolTipString + "<li class='toolTipsLineHeight'>" + element.label + "</li>" : "<li class='toolTipsLineHeight'>" + element.label + "</li>";
          })
        }

      })
      toolTipString = "<ul class='list-unstyled tooltipSpaceUl'>" + toolTipString + "</ul>";
      return toolTipString;
    }


  }
  /* getIpAddress(){
    let clientIpAddress = null;
    if (clientIpAddress === null) {
      http.get(httpPathService.getMyIp).then(function (response) {
        clientIpAddress = response.data;
      });
    }
    return clientIpAddress;
  }; */

  buildOption(data: any) {
    this.dataSharing.setLoadSpinner(false);
    let userStateInfo: any;
    let primaryOption: string;
    let optionId: string;
    let user = JSON.parse(localStorage.getItem('currentUser'));
    data.formattedValues.forEach((item) => {
      if(item.optionId !== 0 && item.optionCode!== null){
      primaryOption = "[" + item.optionCode + "]"
      optionId = item.optionId.toString()
      }
    })

    let selectedBuildValue = { vehicleId: data.vehicleId.toString(), marketDatabaseName: data.marketDatabaseName, vehiclePrice: data.buildVehiclePrice.toString(), 
      primaryOption: primaryOption, optionId: optionId, unbuild: false, optionPrice:"undefined", requiredOptions:[] };
this.dataSharing.setOptionList(selectedBuildValue);


    userStateInfo = {
      optionToBuildInfo: selectedBuildValue,
      userGuid: user.user.guid,
      ipAddress: "172.16.192.170",
      isAuthentic: true,
      companyId: user.user.jatoCompanyId ,
      defaultLanguage: user.user.languageId,
      defaultCurrency: user.user.currency,
      emailAdress: "",
      userId: user.user.userId,
      userDateTime: new Date(),
      currentLanguageCode: "en",
      currencySymbol: "&#8364;",
      isOptionBuildFromBrochurePage: true
    }
    let url = this.config.optionBuildVehicle;
    this.userOption.buildOption(url,userStateInfo)  
  }
}
