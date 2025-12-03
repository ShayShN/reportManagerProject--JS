// import { validateReportID } from "./services/database.service.js"
import { createReport } from "./utils/createObject.js"
import { pushReport } from "./services/database.service.js"
import { reports } from "./db/database.js"


function main(){
// show menu
const www = ["uzzi", "m4", "negev"]
const userReport =  createReport(20878, www, "ffffffgggg")
pushReport(userReport)
// validateReportID(userReport)
console.log(reports);
}
main()