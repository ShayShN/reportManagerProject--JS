export function validatId(id) {
    if(typeof(id) === "number" || typeof(id) === "string" && id !== ""){
        return true;
    }
    else{throw new Error("ID wrong!")}
}

export function validateReportID(dataNew) {
    for (data of reports){
        if(data.id !== dataNew.id && typeof dataNew.id === "string"){
            reports.push(dataNew)
        }
        else{console.log("ID alreadi exicst!");
        }
    }  
}
console.log(validatId(""));
 