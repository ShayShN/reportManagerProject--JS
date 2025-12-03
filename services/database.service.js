import { reports } from "../db/database.js";


export function pushReport(data) {
    for(r in data){
        reports.push(r)
    }
}

export function showAll() {
    return toSorted((a, b) => a.id - b.id)
}

export function showByField(field) {
    return reports.toSorted((a, b) => String(a[field]).localeCompare(b[field])
    )
}

export function searchingByID(idnum) {
    const search = reports.filter((report) => {
        return idnum === report.id
    })
    return search
}

export function deletReportByID(idnum) {
    try {
        const index = reports.findIndex((report) => {
            return report.id === idnum
        })
        if (index !== -1) {
            reports.splice(i, 1)
        }
    } catch (error) {
        console.log('eror', error);

    }

};

const arr = ["teroristName", "id", "weopens"];

export function updateReport(idnum, newObject) {
    const index = reports.findIndex((report) => {
        return report.id === idnum
    })
    if (index !== -1) {
        for (const key in newObject) {
            if (!key in arr) {
                return false;
            }
        }
        const update = { ...reports[index], ...newObject }
        reports.splice(index, 1, update);
        return true;
    }
    return false;
}


