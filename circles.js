window.onload = function() {

  const file = document.getElementById('thefile');
  const audio = document.getElementById('audio');

  file.onchange = function() {
    const files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    const h2 = document.getElementById('name');
    const name = files[0].name;
    h2.innerText = `${name}`;

    audio.load();
    audio.play();

    const context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    console.log('DATA-ARRAY: ', dataArray)

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const barWidth = (WIDTH/bufferLength) * 12.5;
    let barHeight;
    let x = 0;

    const one = document.querySelector('#one');
    const two = document.querySelector('#two');
    const three = document.querySelector('#three');
    const four = document.querySelector('#four');
    const five = document.querySelector('#five');

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      one.style.border = '2px solid transparent'
      two.style.border = '2px solid transparent'
      three.style.border = '2px solid transparent'
      four.style.border = '2px solid transparent'
      five.style.border = '2px solid transparent'

      let bars = 118;
      let y = 2;

      for (let i = 0; i < bufferLength; i++) {
        if (dataArray[i] === 130) {
          one.style.border = '2px solid red';
        } else if (dataArray[i] === 100) {
          two.style.border = '2px solid yellow';
        } else if (dataArray[i] === 70) {
          three.style.border = '2px solid pink';
        } else if (dataArray[i] === 40) {
          four.style.border = '2px solid blue';
        } else if (dataArray[i] === 10) {
          five.style.border = '2px solid purple';
        }

      }
    }
    audio.play();
    renderFrame();
  }

}
