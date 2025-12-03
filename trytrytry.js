export const reports = [];


export function validateId(id) {
    const isNumber = typeof id === "number";
    const isString = typeof id === "string" && id.trim() !== "";

    if (!isNumber && !isString) {
        throw new Error("ID invalid");
    }
    return true;
}

export function validateReportKeys(report) {
    const required = ["id", "terroristName", "weapons", "text"];

    const missing = required.filter(key => !(key in report));

    if (missing.length > 0) {
        throw new Error("Missing report keys: " + missing.join(", "));
    }

    return true;
}




import { validateId } from "../utils/validate.js";
import { nanoid } from "nanoid";

export function createReport({ id, terroristName, weapons, text }) {
    // אם לא סופק ID → יצירת ID
    if (!id) id = nanoid();

    validateId(id);

    if (!terroristName) {
        terroristName = "Muhammad — unknown last name";
    }

    return {
        id: id.toString(),
        terroristName,
        weapons: Array.isArray(weapons) ? weapons : [],
        text: text || ""
    };
}






import { reports } from "../db/database.js";
import { validateReportKeys } from "../utils/validate.js";

export function saveReport(report) {
    validateReportKeys(report);

    const exists = reports.find(r => r.id === report.id);
    if (exists) throw new Error("Report with same ID exists!");

    reports.push(report);
    return report;
}




import { reports } from "../db/database.js";

export function getAllReports() {
    return [...reports].sort((a, b) => a.id.localeCompare(b.id));
}

export function getReportsSortedBy(field) {
    return [...reports].sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
    });
}









import { reports } from "../db/database.js";

export function searchById(id) {
    const report = reports.find(r => r.id === id);
    if (!report) throw new Error("Report not found");
    return report;
}








import { reports } from "../db/database.js";

export function deleteById(id) {
    const index = reports.findIndex(r => r.id === id);

    if (index === -1) throw new Error("Report not found");

    const removed = reports.splice(index, 1);
    return removed[0];
}











import { searchById } from "./search.js";

export function updateReport(id, updates) {
    const report = searchById(id);

    const validKeys = ["id", "terroristName", "weapons", "text"];

    for (const key in updates) {
        if (!validKeys.includes(key)) {
            throw new Error("Invalid update key: " + key);
        }
    }

    Object.assign(report, updates);

    return report;
}










import readline from "readline-sync";

import { createReport } from "../services/create.js";
import { saveReport } from "../services/save.js";
import { getAllReports, getReportsSortedBy } from "../services/get.js";
import { searchById } from "../services/search.js";
import { deleteById } from "../services/delete.js";
import { updateReport } from "../services/update.js";

function menu() {
    console.log(`
1. Add a new intelligence report
2. Show all reports
3. Search report by ID
4. Delete report by ID
5. Edit report by ID
0. Exit
`);
}

while (true) {
    menu();
    const choice = readline.question("Choose: ");

    try {
        if (choice === "1") {
            const id = readline.question("ID (optional): ");
            const name = readline.question("Terrorist name: ");
            const weapons = readline.question("Weapons (comma separated): ")
                                .split(",").map(w => w.trim());
            const text = readline.question("Text: ");

            const report = createReport({ id, terroristName: name, weapons, text });
            saveReport(report);
            console.log("Report saved");

        } else if (choice === "2") {
            console.log(getAllReports());

        } else if (choice === "3") {
            const id = readline.question("ID: ");
            console.log(searchById(id));

        } else if (choice === "4") {
            const id = readline.question("ID: ");
            console.log(deleteById(id));

        } else if (choice === "5") {
            const id = readline.question("ID: ");
            const field = readline.question("Field to edit: ");
            const value = readline.question("New value: ");
            console.log(updateReport(id, { [field]: value }));

        } else if (choice === "0") {
            console.log("Goodbye!");
            break;
        }

    } catch (err) {
        console.log("ERROR:", err.message);
    }
}
