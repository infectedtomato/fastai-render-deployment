var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var new_size = get_size(image.width, image.height, max_side_px);
      [canvas.width, canvas.height] = new_size;
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
      console.log("Converted");

    el("image-picked").className = "";
    };
     image.src = e.target.result;
  };
     reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please upload an image for recognition!!");

  el("analyze-button").innerHTML = "Processing Image...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `Result = ${response["result"]}`;
    }
    el("analyze-button").innerHTML = "Recognise";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

