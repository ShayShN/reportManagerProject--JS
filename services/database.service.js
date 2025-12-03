import { reports } from "../db/database.js"; 


export function pushReport(data) {
    reports.push(data)
}

export function showAll() {
    return reports.sort((a, b) => a.id - b.id)
}

export function showByField(field) {
    return reports.sort((a, b) => a.field - b.field)
}

export function searchingByID(idnum) {
    const search = reports.filter((report) => {
        return idnum === report.id
    })
    return search
}

export function deletReportByID(idnum) {
    reports.forEach((report, i) => {
        if (report[i] === idnum){
            report.splice(0, i)
        }
    }); 
}