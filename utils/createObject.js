export function createReport(id, weapons, text, teroristName="Muhammad — unknown last name"){
    // const finnalId = valdateId(id)
    const object = {
                "id": id,
                "teroristName": teroristName,
                "weapons": weapons,
                "text": text
    }
    return object
}


