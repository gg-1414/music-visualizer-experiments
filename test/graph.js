// nice transitional colors (blue, purple, pink)
  if (dataArray[i] > 200){
    r = barHeight + (50 * (i/bufferLength)) + 10 // <--
    g = 50 * (i/bufferLength) + 80
    b = 250
  } else if (dataArray[i] < 50){
    r = barHeight + (50 * (i/bufferLength)) - 30
    g = 50 * (i/bufferLength) - 30
    b = 250
  } else {
    r = barHeight + (1000 * (i/bufferLength));
    g = 50 * (i/bufferLength);
    b = 250;
  }

// too much pink
  if (dataArray[i] > 200){
    r = barHeight + (50 * (i/bufferLength)) + 80 // <--
    g = 50 * (i/bufferLength) + 80
    b = 250
  } else if (dataArray[i] < 50){
    r = barHeight + (50 * (i/bufferLength)) - 30
    g = 50 * (i/bufferLength) - 30
    b = 250
  } else {
    r = barHeight + (1000 * (i/bufferLength));
    g = 50 * (i/bufferLength);
    b = 250;
  }

  // i like
  if (dataArray[i] > 200){
    r = barHeight + (50 * (i/bufferLength)) + 110
    g = 50 * (i/bufferLength) + 150
    b = 250
  } else if (dataArray[i] < 50){
    r = barHeight + (50 * (i/bufferLength)) - 30
    g = 50 * (i/bufferLength) - 80
    b = 250
  } else {
    r = barHeight + (100 * (i/bufferLength));
    g = 50 * (i/bufferLength);
    b = 250;
  }
  ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;

  ///////// THIN LINES ///////////////////
  let y = 1.5

  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] * y);

    if (dataArray[i] > 200){
      r = 250
      g = 220
      b = 250
    } else if (dataArray[i] > 190){
      r = barHeight + (5000 * (i/bufferLength))
      g = 50 * (i/bufferLength) + 100
      b = 250
    } else if (dataArray[i] > 180){
      r = barHeight + (500 * (i/bufferLength))
      g = 50 * (i/bufferLength) + 80
      b = 250
    } else if (dataArray[i] < 130){
      r = barHeight + (50 * (i/bufferLength)) - 30
      g = 50 * (i/bufferLength) - 80
      b = 250
    } else if (dataArray[i] < 100){
      r = barHeight + (50 * (i/bufferLength)) - 100
      g = 50 * (i/bufferLength) - 100
      b = 250
    } else {
      r = barHeight + (100 * (i/bufferLength));
      g = 50 * (i/bufferLength);
      b = 250;
    }

    ctx.fillStyle = `rgba(${r},${g},${b},1)`;
    ctx.fillRect(x, (HEIGHT - barHeight - 20), barWidth, barHeight);

    x += barWidth + 20
  }
/////////////////////////////////////////////
