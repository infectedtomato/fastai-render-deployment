var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input, file) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
     el('image-picked').src = e.target.result;
     el('image-picked').className = '';
     var image = new Image();
        image.onload=function(){
            el("image-picked").src=image.src;
            var canvas=document.createElement("canvas");
            var context=canvas.getContext("2d");
            new_size = get_sizes(image.width, image.height, max_side_px)
            [canvas.width,canvas.height] = new_size;
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            console.log("Converted");

  };
  reader.readAsDataURL(file);
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

