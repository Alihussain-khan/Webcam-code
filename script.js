document.addEventListener("DOMContentLoaded", () => {
  //checking if the js is running
  console.log("running");

  //declaring variables and connecting them with html elements
  let startcamera = document.getElementById("but");
  var webcam = document.getElementById("vid");
  var btn2 = document.getElementById("btn2");
  var btn3 = document.getElementById("btn3");
  var start = document.getElementById("btn4");
  var stop = document.getElementById("btn5");
  var mediaDevices = navigator.mediaDevices;
  var pause = true;

  //eventlistener that starts the video camera
  startcamera.addEventListener("click", () => {
    console.log("running");
    mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        console.log(stream);
        const mediaRecorder = new MediaRecorder(stream);
        //starting the recording
        start.addEventListener("click", () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
        });

        //stopping the recording
        stop.addEventListener("click", () => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
        });

        //array for the video file
        var recordedChunks = [];

        //when it starts recording, it starts to push the data into the array
        mediaRecorder.ondataavailable = function (e) {
          recordedChunks.push(e.data);
        };

        //on stop the recorded data is turned into a video and downloaded
        mediaRecorder.onstop = function () {
          var blob = new Blob(recordedChunks, {
            type: "video/mp4",
          });
          var url = URL.createObjectURL(blob);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = "test.webm";
          a.click();
          window.URL.revokeObjectURL(url);
        };

        //playing the web cam data for view
        webcam.srcObject = stream;
        console.log(webcam.srcObject);
        webcam.addEventListener("loadedmetadata", () => {
          webcam.play();

          //pausing the video, it can be played on second click
          btn2.addEventListener("click", () => {
            if (pause) {
              webcam.pause();
              pause = false;
            } else {
              webcam.play();
              pause = true;
            }
          });
          //stopping the camera
          btn3.addEventListener("click", () => {
            webcam.srcObject = null;
            stream.getTracks().forEach((track) => track.stop());
          });
        });
      })
      .catch(alert);
  });
});
