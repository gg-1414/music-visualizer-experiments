window.onload = function() {

  const file = document.getElementById("thefile");
  console.dir(file)

  const audio = document.getElementById("audio");

  file.onchange = function() { // when the value of an element has been changed
    const files = this.files;

    audio.src = URL.createObjectURL(files[0]); // represents the specified File object
    console.log('FILES[0]: ', files[0].name)
    const h2 = document.getElementById('name')
    const name = files[0].name
    h2.innerText = `${name}`
    // debugger
    // => File(8478962) {name: "Can I (Ekali Remix).mp3", lastModified: 1511457791000, lastModifiedDate: Thu Nov 23 2017 12:23:11 GMT-0500 (Eastern Standard Time), webkitRelativePath: "", size: 8478962, …}
    // lastModified: 1511457791000
    // lastModifiedDate: Thu Nov 23 2017 12:23:11 GMT-0500 (Eastern Standard Time) {}
    // name: "Can I (Ekali Remix).mp3"
    // size: 8478962
    // type: "audio/mp3"
    // webkitRelativePath: ""
    // __proto__: File
    console.log(typeof files[0])
    // => object
    console.log(audio.src)
    console.log(audio)
    // => blob:null/bef687cc-cc5a-4d44-a5e6-4d9c4d3fd9b8
    audio.load(); // reloads audio element
    audio.play(); // starts playing the audio
    const context = new AudioContext(); // (interface) audio-processing graph
    let src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    src.connect(analyser); // connects src to the analyser
    analyser.connect(context.destination); // end destination of an audio graph in a given context
    // sends sound to the speakers or headphones

    //_______ thickness of lines (power of 2) _______
    // analyser.fftSize = 32;
    // analyser.fftSize = 64;
    // analyser.fftSize = 128;
    // analyser.fftSize = 256;
    // analyser.fftSize = 512;
    // analyser.fftSize = 1024;
    // analyser.fftSize = 2048;
    // analyser.fftSize = 4096;
    // analyser.fftSize = 8192;
    analyser.fftSize = 16384;
    // analyser.fftSize = 32768;

    // (FFT) algorithm that samples a signal over a period of time
    // and divides it into its frequency components (single sinusoidal oscillations)

    // lower the size, less bars (but wider)
    // split up into less frequency
    // _______________________________________________

    const bufferLength = analyser.frequencyBinCount; // (read-only property)
    // unsigned integer half of fftSize
    // equates to number of data values you have to play with for the visualization
    console.dir(typeof bufferLength)
    // => number
    console.log('BUFFER-LENGTH: ', bufferLength); // 8192

    const dataArray = new Uint8Array(bufferLength); // converts to 8-bit unsigned integer array
    console.log('DATA-ARRAY: ', dataArray)

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    console.log('WIDTH: ', WIDTH, 'HEIGHT: ', HEIGHT)

    const barWidth = (WIDTH / bufferLength) * 12.5;
    console.log('BARWIDTH: ', barWidth)

    console.log('TOTAL WIDTH: ', (117*10)+(118*barWidth))
    // SETTING (i < 118) => 1429.27734375
    // SETTING (i < bufferLength) => 1429.27734375
    let barHeight;
    let x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame); // takes callback to invoke before rendering

      x = 0;

      analyser.getByteFrequencyData(dataArray); // copies current frequency data into an Unit8Array passed into it

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      let r, g, b;
      let bars = 118 // set number of bars you want
      let y = 2.3

      for (let i = 0; i < bufferLength; i++) { // 118 bars total
        barHeight = (dataArray[i] * y);

        // if (dataArray[i] > 200){
        //   r = 250
        //   g = 50 * (i/bufferLength) + 80;
        //   b = barHeight + ((i/bufferLength)) + 100
        // } else if (dataArray[i] > 180){
        //   r = barHeight + ((i/bufferLength)) + 10
        //   g = 50 * (i/bufferLength) + 40
        //   b = 250
        // } else if (dataArray[i] > 100){
        //   r = barHeight + (500 * (i/bufferLength))
        //   g = (i/bufferLength) + 80
        //   b = 250
        // } else if (dataArray[i] < 80){
        //   r = barHeight + (50 * (i/bufferLength))
        //   g = (i/bufferLength) - 60
        //   b = 250
        // } else if (dataArray[i] < 70){
        //   r = barHeight + (30 * (i/bufferLength))
        //   g = (i/bufferLength) - 80
        //   b = 250
        // } else {
        //   r = barHeight + (100 * (i/bufferLength));
        //   g = (i/bufferLength);
        //   b = 250;
        // }

        // if (dataArray[i] > 200){
        //   r = 255
        //   g = 68
        //   b = 236
        // } else if (dataArray[i] > 140){
        //   r = 211
        //   g = 68
        //   b = 255
        // } else if (dataArray[i] > 110){
        //   r = 167
        //   g = 68
        //   b = 255
        // } else if (dataArray[i] < 90){
        //   r = 99
        //   g = 68
        //   b = 255
        // } else if (dataArray[i] < 80){
        //   r = 68
        //   g = 89
        //   b = 255
        // } else {
        //   r = 99
        //   g = 68
        //   b = 255
        // }

        if (dataArray[i] > 210){ // pink
          r = 250
          g = 0
          b = 255
        } else if (dataArray[i] > 200){ // yellow
          r = 250
          g = 255
          b = 0
        } else if (dataArray[i] > 190){ // yellow/green
          r = 204
          g = 255
          b = 0
        } else if (dataArray[i] > 180){ // blue/green
          r = 0
          g = 219
          b = 131
        } else if (dataArray[i] < 150){ // light blue
          r = 0
          g = 199
          b = 255
        } else if (dataArray[i] < 140){ // blue
          r = 0
          g = 12
          b = 255
        }

    //   if (dataArray[i] > 200){ // pink
    //   r = 250
    //   g = 0
    //   b = 255
    // } else if (dataArray[i] > 180){ // purple
    //   r = 127
    //   g = 0
    //   b = 255
    // } else if (dataArray[i] > 160){ // blue
    //   r = 59
    //   g = 0
    //   b = 255
    // } else if (dataArray[i] > 130){ // blue/green
    //   r = 0
    //   g = 25
    //   b = 255
    // } else if (dataArray[i] < 90){ // light blue
    //   r = 0
    //   g = 135
    //   b = 255
    // } else if (dataArray[i] < 80){ // dark blue
    //   r = 0
    //   g = 255
    //   b = 250
    // }

      // if (dataArray[i] > 200){ // pink
      //   r = 250
      //   g = 50 * (i/bufferLength) + 80;
      //   b = barHeight + ((i/bufferLength)) + 100
      // } else if (dataArray[i] > 180){ // dark pink
      //   r = barHeight + ((i/bufferLength)) + 10
      //   g = 50 * (i/bufferLength) + 40
      //   b = 250
      // } else if (dataArray[i] > 150){ // dark magenta?
      //   r = (i/bufferLength) + 80
      //   g = barHeight + (500 * (i/bufferLength))
      //   b = 250
      // } else if (dataArray[i] < 100){ // magenta?
      //   r = (i/bufferLength) - 60
      //   g = barHeight + (100 * (i/bufferLength))
      //   b = 250
      // } else if (dataArray[i] < 70){ // purple
      //   r = (i/bufferLength) - 80
      //   g = barHeight + ((i/bufferLength) + 10)
      //   b = 250
      // } else { // dark pink?
      //   r = (i/bufferLength) + 50;
      //   g = barHeight + (100 * (i/bufferLength));
      //   b = 250;
      // }

      // if (dataArray[i] > 200){ // (255, 0, 182)
      //   r = 255
      //   g = 0
      //   b = 182
      // } else if (dataArray[i] > 180){ //red
      //   r = 255
      //   g = 43
      //   b = 43
      // } else if (dataArray[i] > 160){ // orange
      //   r = 255
      //   g = 127
      //   b = 0
      // } else if (dataArray[i] > 140){ // yellow
      //   r = 250
      //   g = 255
      //   b = 0
      // } else if (dataArray[i] > 120){ // green
      //   r = 33
      //   g = 255
      //   b = 0
      // } else if (dataArray[i] > 100){ // blue
      //   r = 0
      //   g = 255
      //   b = 229
      // } else if (dataArray[i] > 80){ // purple
      //   r = 0
      //   g = 76
      //   b = 255
      // } else if (dataArray[i] > 60){ // pink
      //   r = 93
      //   g = 0
      //   b = 255
      // } else { // purple
      //   r = 228
      //   g = 58
      //   b = 255
      // }


      // else { // dark pink?
      //   r = (i/bufferLength) + 50;
      //   g = barHeight + (100 * (i/bufferLength));
      //   b = 250;
      // }

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        // console.log(`rgb(${r},${g},${b})`)
        ctx.fillRect(x, (HEIGHT - barHeight ), barWidth, barHeight);
        // (x, y, width(px), height(px))

        // x += barWidth + 1; // +1 to have them not directly next to one another
        x += barWidth + 10
        // y += 0.01
      }
    }

    audio.play();
    renderFrame();
  };
};
