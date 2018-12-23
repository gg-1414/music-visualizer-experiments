window.onload = function() {

  canvasCtx = document.getElementById('canvas')

  var audioCtx = new AudioContext();
  var analyser = audioCtx.createAnalyser();

  // ...

  analyser.fftSize = 2048;
  var bufferLength = analyser.fftSize;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  // draw an oscilloscope of the current audio source

  function draw() {

    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.width = window.innerWidth;
    canvasCtx.height = window.innerHeight;
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    // canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    // canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    // canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

    //   if(i === 0) {
    //     canvasCtx.moveTo(x, y);
    //   } else {
    //     canvasCtx.lineTo(x, y);
    //   }
    //
      x += sliceWidth;
    }

    // canvasCtx.lineTo(canvas.width, canvas.height/2);
    // canvasCtx.stroke();
  };
  //
  draw();
}

// A simple, typical workflow for web audio would look something like this:

// 1. Create audio context
// 2. Inside the context, create sources — such as <audio>, oscillator, stream
// 3. Create effects nodes, such as reverb, biquad filter, panner, compressor
// 4. Choose final destination of audio, for example your system speakers
// 5. Connect the sources up to the effects, and the effects to the destination.
