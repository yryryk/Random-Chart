let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

let randomData =[];
let attitude = window.innerHeight/2;
let affix1 = 0;
let affix2 = 0;
let affix3 = 0;
let affix4 = 0;
let affix5 = 0;
let k = 0;
let width;
let height;

const randomPiece = () => Math.tan((Math.PI)*(0.94*Math.random()-0.47));

setInterval(function () {
  width = window.innerWidth;
  height = window.innerHeight;

  ctx.canvas.width  = width;
  ctx.canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  if (k%50==0) {affix1 = randomPiece()}
  if (k%100==0) {affix2 = randomPiece()}
  if (k%200==0) {affix3 = randomPiece()}
  if (k%400==0) {affix4 = randomPiece()}
  if (k%800==0) {affix5 = randomPiece(); k=0}
  k++;
  attitude += (affix1/30 + affix2/30 + affix3/30 + affix4/30 + affix5/30 + randomPiece());
  randomData.push(attitude);

  if (attitude>(height-50)) {
    randomData = randomData.map(i=>i-50);
    attitude -= 50;
  }
  if (attitude<50) {
    randomData = randomData.map(i=>i+50);
    attitude += 50;
  }

  let i = 0;
  let accumulatorOfI = 0;
  const average = [];
  while (accumulatorOfI < width/5) {
    i++;
    accumulatorOfI+=i;
    average[i] = randomData.map((item, index) => {
      if (index > accumulatorOfI){
        for (let j = 1; j < accumulatorOfI; j++) {
          item += randomData[index - j];
        }
        item = item/(accumulatorOfI);
      }
      return item
    })

    for (let j = 0; j < accumulatorOfI/2; j++) {
      average[i].shift()
    }
  }

 for (let j = 0; j < width*2 && j < randomData.length; j++){
    ctx.fillStyle = "Turquoise";
    ctx.fillRect(j/2,(height - average[4][j]), 3, 3);
  };

  if (randomData.length> width*2-10){
    randomData.shift();
  }

}, 10);
