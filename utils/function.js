export function validateReportID(dataNew) {
    for (data of reports){
        if(data.id !== dataNew.id && typeof dataNew.id === "string"){
            reports.push(dataNew)
        }
        else{new console.error("ID alreadi exicst!");
        }
    }  
}
