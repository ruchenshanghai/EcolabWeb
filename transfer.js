
// Util.getAdminData().then(data => {
//   fs.writeFileSync('./test.json', JSON.stringify(data));
// })

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./test.json'));
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
    SalesType: obj[index].SalesType,
    AnnualSales: obj[index].AnnualSales,
    EstimatedPCO: obj[index].EstimatedPCO,
  }]);
  tempItem.CompetitorCN = obj[index].CompetitorCN;
  tempItem.FirstCollaborationDate = obj[index].FirstCollaborationDate;
  tempItem.Remark = obj[index].Remark;
  tempItem.MarketClassification = obj[index].MarketClassification;
  tempItem.ServiceTimeRequested = obj[index].ServiceTimeRequested;
  tempItem.ModifyRemark = obj[index].ModifyRemark;
  tempItem.RecordOwner = obj[index].RecordOwner;
  tempItem.CheckedUsers = obj[index].CheckedUsers;
  tempItem.BUDistrict = '2018-01-01';
  tempItem.UpdateUser = obj[index].RecordOwner;
  tempItem.TotalSalesAmount = obj[index].AnnualSales;
  newObj.push(tempItem);
}
fs.writeFileSync('./hmt.json', JSON.stringify(newObj));