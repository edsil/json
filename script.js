"use strict";
async function loadJSON(jsonFile) {
  var jsonData;

  const requHead = {
    method: "get",
    headers: { "content-type": "text/csv;charset=UTF-16" },
  };
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

const myData = await loadJSON("./Docs.json");
const myJson = JSON.parse(myData);
myJson.forEach((element) => {
  element.Classes.forEach((item) => {
    /*if (item.ClassName.toString().includes("_ModularFrame_C")) {
      console.log(item.mDisplayName + "=> " + item.ClassName);
    }*/
    if (item.ClassName.toString().includes("Recipe_LightsControlPanel")) {
      if (item.mIngredients.toString().startsWith("((ItemClass=")) {
        console.log(item.ClassName);
        console.log(item.mIngredients);
        console.log(parseRecipe(item.mIngredients));
      }
    }
    //console.log(typeof item.ClassName);
  });
});

function parseRecipe(txt) {
  const t = String(txt);
  const items = [];
  if (!t.startsWith("((ItemClass=")) return items;
  var pos = t.indexOf("/Game/FactoryGame");
  while (pos > 0) {
    var tS = pos + 18;
    var tE = t.indexOf("/", tS + 1);
    var type = t.slice(tS, tE);
    var cS = tE + 1;
    var cE = t.indexOf("/", cS + 1);
    var category = t.slice(cS, cE);
    var iS = cE + 1;
    var iE = t.indexOf("/", iS + 1);
    var item = t.slice(iS, iE);
    var nS = iE + 1;
    var nE = t.indexOf('"', nS + 1);
    var clName = t.slice(nS, nE);
    var aS = t.indexOf("Amount=", nE) + 7;
    var aE = t.indexOf(")", aS);
    var amount = t.slice(aS, aE);
    pos = t.indexOf("/Game/FactoryGame", aE);
    items.push({
      type: type,
      category: category,
      item: item,
      itemClass: clName,
      amount: amount,
    });
  }
  return items;
}
