'use strict';
console.log("asd");




async function loadJSON(jsonFile) {
    var jsonData;

    const requHead = { method: "get", headers: { "content-type": "text/csv;charset=UTF-16" } };
    try {
        const resp = await fetch(jsonFile, requHead);
        if (resp.status === 200) {
            const data = await resp.text();
            const jsonData = data;
            return jsonData;
        } else {
            console.log("Error code: " + resp.status + ": " + fileName);
            console.log("Error reading: " + jsonFile + ". " + resp.status);
            return -1;
        }
    } catch (err) {
        console.log(err);
        console.log("Error reading: " + jsonFile + ". " + err);
        return -1;
    }
}

const myData = await loadJSON('./Docs.json');
const myJson = JSON.parse(myData);
myJson.forEach(element => {
    element.Classes.forEach(item => {
        if (item.ClassName.toString().includes("_ModularFrame_C")) {
            console.log(item.mDisplayName + "=> " + item.ClassName);
        }
        // console.log(typeof(item.ClassName));
    }
    )
});



