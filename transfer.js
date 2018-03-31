
var Util = require('./lib/Util');
var fs = require('fs');

var obj = JSON.parse(fs.readFileSync('./gtw-backup.json'));
console.log(obj.length);
var newObj = [];
for (let index in obj) {
  var tempItem = {};
  tempItem.Reviewer = obj[index].Reviewer;
  tempItem.BUDistrict = obj[index].BUDistrict;
  tempItem.OpportunityCode = obj[index].OpportunityCode;
  tempItem.Province = obj[index].Province;
  tempItem.City = obj[index].City;
  tempItem.Site = obj[index].Site;
  tempItem.ChineseName = obj[index].ChineseName;
  tempItem.EnglishName = obj[index].EnglishName;
  tempItem.PipelineStatus = obj[index].PipelineStatus;
  tempItem.ContractTerm = obj[index].ContractTerm;
  tempItem.TargetRate = obj[index].TargetRate;
  tempItem.Currency = '人民币';
  tempItem.CorporateChineseName = obj[index].CorporateAccountChinese;
  tempItem.CorporateEnglishName = obj[index].CorporateAccountEnglish;
  tempItem.SalesRep = obj[index].SalesRep;
  tempItem.AssistCAM = obj[index].AssistCAMName;
  tempItem.FollowingStatus = obj[index].FollowingStatus;
  tempItem.CTCBU = obj[index].CTCBU;
  tempItem.CTCSales = obj[index].CTCSales;
  tempItem.FollowingStatusRemark = obj[index].FollowingStatusRemark;
  tempItem.SalesDetails = JSON.stringify([{
    TypeName: 'Total Pest Program#全方位',
    ProgramName: 'RCF#全方位',
    AnnualSales: obj[index].AnnualSales,
    EstimatedPCO: obj[index].EstimatedPCO,
  }]);
  tempItem.TotalSalesAmount = obj[index].AnnualSales;
  tempItem.CompetitorCN = obj[index].CompetitorCN;
  tempItem.FirstCollaborationDate = obj[index].FirstCollaborationDate;
  tempItem.Remark = obj[index].Remark;
  tempItem.MarketClassification = obj[index].MarketClassification;
  tempItem.ServiceTimeRequested = obj[index].ServiceTimeRequested;
  tempItem.ModifyRemark = obj[index].ModifyRemark;
  tempItem.RecordOwner = obj[index].RecordOwner;
  tempItem.CheckedUsers = obj[index].CheckedUsers;
  tempItem.UpdateDate = '2018-03-31';
  tempItem.UpdateUser = obj[index].RecordOwner;
  newObj.push(tempItem);
}
fs.writeFileSync('./hmt-backup.json', JSON.stringify(newObj));