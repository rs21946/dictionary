const input = document.getElementById("input");
const search = document.getElementById("searchbtn");
const history = document.getElementById("history");
const mainbody = document.querySelector(".body");


history.addEventListener("click", () => {
  if (history.innerText == "HISTORY") {
    document.querySelector(".heading").innerText = "My DICTIONARY App History";
    document.querySelector(".result").innerHTML = "";
    document.querySelector(".inpword").innerText = "";
    document.querySelector(".searchpage").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.querySelector(".history").style.display = "flex";
    
    mainbody.style.backgroundColor = "#ffff";
    history.innerText = "SEARCH";
    

    if (localStorage.length === 0) {
      let history = document.querySelector(".history");
      history.innerHTML = `<div id="length"><h2>No History Found..</h2></div>`;
    }

    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) === "count") {
        continue;
      }
      let div = document.createElement("div");
      div.setAttribute("class", "newdiv");
      div.style.borderRadius = "15px";
      div.innerHTML = `<span>Word: <span class="getdata">${localStorage.key(
        i
      )}</span></span>
            <br>
            <p>${localStorage.getItem(localStorage.key(i))}</p>
            <img onclick="deletediv(this)" id="dlt" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png">`;
      let histdiv = document.querySelector(".history");
      histdiv.appendChild(div);
    }
  } else if (history.innerText == "SEARCH") {
    document.querySelector(".heading").innerText = "My DICTIONARY App";
    document.querySelector(".history").innerHTML = "";
    document.querySelector(".history").style.display = "none";
    document.querySelector(".searchpage").style.display = "flex";
    document.getElementById("result").style.display = "block";
    history.innerText = "HISTORY";
    
    mainbody.style.backgroundColor = "#fff";
  }
});

function deletedDiv(currentElement) {
  let key = currentElement.parentElement.querySelector(".getdata").innerText;
  currentElement.parentElement.remove();
//   console.log(key);
  localStorage.removeItem(key);

  if (localStorage.length === 0) {
    let history = document.querySelector(".history");
    history.innerHTML = `<div id="length"><h2>No History Found..</h2></div>`;
  }
  // console.log(currentElement.parentElement.firstChild.innerText);
}

// FETCH the API

search.addEventListener("click", () => {

    let inVal = input.value;
 
    if(inVal === ""){
      return;
    }

  // document.querySelector(".searching").innerText =" ";
    // "Searching for the meaning....";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inVal}`)
    .then((response) => response.json())
    .then((data) => {

     
             
          if(data[0] === undefined){
            document.querySelector(".inpword").innerText = "";
            document.querySelector(".searching").innerText = "";
            document.querySelector(".result").innerHTML = `<div id="length"><h3>Result Not Found</h3></div>`;
            input.value = "";
            return;
          }
// storing data to local storage

      localStorage.setItem(
        `${inVal}`,
        data[0].meanings[0].definitions[0].definition

      );
      document.querySelector(".result").innerHTML =
        data[0].meanings[0].definitions[0].definition;
      document.querySelector(".searching").innerText = "";
      document.querySelector(".inpword").innerText = inVal;
      input.value = "";
    });
});
