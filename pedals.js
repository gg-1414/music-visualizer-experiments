window.onload = function() {

  const file = document.getElementById('thefile')
  const audio = document.getElementById('audio')

  file.onchange = function() {
    const files = this.files
    audio.src = URL.createObjectURL(files[0])
    const h2 = document.getElementById('name')
    const name = files[0].name
    h2.innerText = `${name}`

    audio.load()
    audio.play()

    const context = new AudioContext()
    let src = context.createMediaElementSource(audio)
    const analyser = context.createAnalyser()

    const canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')

    src.connect(analyser)
    analyser.connect(context.destination)

    analyser.fftSize = 16384
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    const barWidth = (WIDTH/bufferLength) * 12.5
    let barHeight;
    let x = 0

    function renderFrame() {
      requestAnimationFrame(renderFrame)

      x = 0

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = "rgba(0,0,0,0.1)"
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      let bars = 118;
      let y = 2

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] * y)

        ctx.fillStyle = "#fff"
        ctx.fillRect(x, barHeight, 50, 3)
        
        x += 20
      }
    }
    audio.play()
    renderFrame()
  }

}
