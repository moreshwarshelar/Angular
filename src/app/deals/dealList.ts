export class Deals {
  constructor(ID:string, Title:string, Address: string, FundName:string, PropertyType, DealStage: string, DealStatus: string,DealType: string,MnpiStatus: string,PrimaryAcquisitionOfficer: string,Market: string,SubMarket: string,PropertyRegion: string,TIAAValuation: string,SFUnit: string,InvestmentID: string) {
    this.id = ID;
    this.dealName=Title;
    this.address= Address;
    this.fundName=FundName;
    this.propertyType= PropertyType;
    this.dealStage= DealStage;
    this.dealStatus= DealStatus;
    this.dealType= DealType;
    this.mnpiStatus= MnpiStatus;
    this.primaryAcquisitionOfficer= PrimaryAcquisitionOfficer;
    this.market= Market;
    this.subMarket= SubMarket;
    this.propertyRegion= PropertyRegion;
    this.tIAAValuation= TIAAValuation;
    this.sFUnit= SFUnit;
    this.investmentID= InvestmentID;
  }
  id:string;
  dealName:string;
  address: string;
  fundName:string;
  propertyType: string;
  dealStage: string;
  dealStatus: string;
  dealType: string;
  mnpiStatus: string;
  primaryAcquisitionOfficer: string;
  market: string;
  subMarket: string;
  propertyRegion: string;
  tIAAValuation: string;
  sFUnit: string;
  investmentID: string;
}
