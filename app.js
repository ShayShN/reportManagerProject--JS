// import { validateReportID } from "./services/database.service.js"
import { createReport } from "./utils/createObject.js"
import { pushReport } from "./services/database.service.js"
import { reports } from "./db/database.js"
import { validateReportID } from "./utils/function.js"



const www = ["uzzi", "m4", "negev"]
const arrReports = [createReport(20878, www, "ffffffgggg"),
                    createReport(2087899, "grozza", "merder")]


function main(){
    // show menu

    pushReport(arrReports)
    validateReportID()
    console.log(reports);
}
main()