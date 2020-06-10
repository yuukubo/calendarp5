// calendarp5

let game_title = "* calendarp5 * c1.1"
let [canvas_W, canvas_H] = [600, 400];
let calendar_X = canvas_W / 2;
let calendar_Y = canvas_H / 2;
let calendar_W = 200;
let calendar_H = 100;
let calendar_RGB = [150, 150, 150];
let is_calendar_on = 0;
let background_RGB = [230, 230 ,230];
let on_RGB = [250, 250, 250, 150];
let off_RGB = [50, 50, 50, 150];
let is_touch = 0;

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove",  function (event) { event.preventDefault(); }, { passive: false });
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
}
 
function draw() {
  let today_ojb = new Date();

  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_game_title();
  set_calendar(calendar_RGB[0], calendar_RGB[1], calendar_RGB[2], calendar_X, calendar_Y, calendar_W, calendar_H, today_ojb);
  if (1 == is_touch) {
    touched();
    is_touch = 0;
  }
  set_pointer();
}

function set_pointer() {
  push();
  noStroke();
  fill(255, 255, 0)
  circle(mouseX, mouseY, 4);
  pop();
}

function touchStarted() {
  is_touch = 1;
}
function touched() {
  mousePressed();
  is_touch = 0;
}
function touchEnded() {
  is_touch = 0;
}
function mousePressed() {
  if ((calendar_X - calendar_W / 2 < mouseX && mouseX < calendar_X + calendar_W / 2) && (calendar_Y - calendar_H / 2 < mouseY && mouseY < calendar_Y + calendar_H / 2)) {
    if (is_calendar_on) {
      is_calendar_on = 0;
    } else {
      is_calendar_on = 1;
    }
  }
}
function set_calendar(calendar_R, calendar_G, calendar_B, calendar_X, calendar_Y, calendar_W, calendar_H, today_ojb) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(calendar_R, calendar_G, calendar_B);
  rect(calendar_X, calendar_Y, calendar_W, calendar_H, 4);
  if (!is_calendar_on) {
    fill(calendar_R + 30, calendar_G + 30, calendar_B + 30);
    rect(calendar_X - 5, calendar_Y -5, calendar_W, calendar_H, 4);
  }

  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(10);
  text(today_ojb.getFullYear() + " / " + nf((today_ojb.getMonth()+1), 2) + " / " + nf(today_ojb.getDate(), 2), calendar_X, calendar_Y);

  pop();
}

function set_game_title() {
  push();
  textSize(10);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(10);
  text(game_title, canvas_W * 9 / 10, canvas_H -20);
  pop();
}
