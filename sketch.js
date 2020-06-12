// calendarp5

let game_title = "* calendarp5 * c6.0"
let [canvas_W, canvas_H] = [600, 400];
let calendar_X = canvas_W / 2;
let calendar_Y = canvas_H / 12;
let calendar_W = 200;
let calendar_H = 50;
let calendar_RGB = [200, 200, 200];
let sat_RGB = [10, 10, 250];
let sun_RGB = [250, 10, 10];
let weekday_RGB = [10, 10, 10];
let is_calendar_on = 0;
let background_RGB = [230, 230 ,230];
let on_RGB = [250, 250, 250, 150];
let off_RGB = [50, 50, 50, 150];
let is_touch = 0;

let DOW = ["日", "月", "火", "水", "木", "金", "土"]
let last_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let first_DOW_X = canvas_W * 2 / 10;
let first_DOW_Y = canvas_H * 3 / 12;
let DOW_cell_W = canvas_W * 2 / 20;
let DOW_cell_H = canvas_H * 2 / 20;
let frame_RGB = [200, 200, 200];

let first_day_X = canvas_W * 2 / 10;
let first_day_Y = first_DOW_Y + DOW_cell_H;
let day_cell_W = canvas_W * 2 / 20;
let day_cell_H = canvas_H * 2 / 20;
let day_cell_RGB = [240, 240, 240];

let disp_date_ojb = new Date();
let disp_year = disp_date_ojb.getFullYear();
let disp_month = disp_date_ojb.getMonth() + 1;
disp_date_ojb.setDate(1);

let next_month_X = calendar_X + calendar_W / 2;
let next_month_Y = calendar_Y;
let next_month_W = 50;
let next_month_H = 50;
let next_month_text = "->";
let next_month_XYWHtext = [next_month_X, next_month_Y, next_month_W, next_month_H, next_month_text];

let prev_month_X = calendar_X - calendar_W / 2;
let prev_month_Y = calendar_Y;
let prev_month_W = 50;
let prev_month_H = 50;
let prev_month_text = "<-";
let prev_month_XYWHtext = [prev_month_X, prev_month_Y, prev_month_W, prev_month_H, prev_month_text];

let button_arr = [next_month_XYWHtext, prev_month_XYWHtext];
let button_RGB = [210, 210, 210];

let day_arr = [];
for (let i=0; i<disp_date_ojb.getDay(); i++) {
  day_arr.push(" ");
}

for (let i=0; i<last_day[disp_month-1]; i++) {
  day_arr.push(i+1);
}

let padding_cnt = 6*7 - day_arr.length;
for (let i=0; i<padding_cnt; i++) {
  day_arr.push(" ");
}

let day_arr_cnt = 0;

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove",  function (event) { event.preventDefault(); }, { passive: false });
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
  
}

function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_calendar(calendar_RGB[0], calendar_RGB[1], calendar_RGB[2], calendar_X, calendar_Y, calendar_W, calendar_H, disp_date_ojb);
  if (1 == is_touch) {
    touched();
    is_touch = 0;
  }
  set_game_title();
  if (day_arr_cnt==0) {
    set_day_arr();
  }
  set_frame(frame_RGB[0], frame_RGB[1], frame_RGB[2], first_DOW_X, first_DOW_Y, DOW_cell_W, DOW_cell_H);
  set_day_cell(day_cell_RGB[0], day_cell_RGB[1], day_cell_RGB[2], first_day_X, first_day_Y, day_cell_W, day_cell_H, day_arr, day_arr_cnt);
  set_button(button_RGB[0], button_RGB[1], button_RGB[2], button_arr);
  set_pointer();
}

function set_pointer() {
  push();
  noStroke();
  fill(0, 200, 200)
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
  if (hit_chk(calendar_X, calendar_Y, calendar_W, calendar_H)) {
    if (is_calendar_on) {
      is_calendar_on = 0;
    } else {
      is_calendar_on = 1;
    }
  }
  if (hit_chk(next_month_X, next_month_Y, next_month_W, next_month_H)) {
    disp_date_ojb.setMonth(disp_date_ojb.getMonth() + 1);
    disp_month = disp_date_ojb.getMonth() + 1;
    day_arr_cnt = 0;
    day_arr = [];
  }
  if (hit_chk(prev_month_X, prev_month_Y, prev_month_W, prev_month_H)) {
    disp_date_ojb.setMonth(disp_date_ojb.getMonth() - 1);
    disp_month = disp_date_ojb.getMonth() - 1;
    day_arr_cnt = 0;
    day_arr = [];
  }
}
function set_frame(frame_R, frame_G, frame_B, first_DOW_X, first_DOW_Y, DOW_cell_W, DOW_cell_H) {
  push();
  strokeWeight(0.1);
  rectMode(CENTER);
  fill(frame_R, frame_G, frame_B);
  for (let i=0; i<DOW.length; i++) {
    rect(first_DOW_X + DOW_cell_W * i, first_DOW_Y, DOW_cell_W, DOW_cell_H, 4);
  }
  
  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i=0; i<DOW.length; i++) {
    if (i==0) {
      fill(sun_RGB[0], sun_RGB[1], sun_RGB[2]);
    } else if(i==6) {
      fill(sat_RGB[0], sat_RGB[1], sat_RGB[2]);
    } else {
      fill(weekday_RGB[0], weekday_RGB[1], weekday_RGB[2]);
    }
    text(DOW[i], first_DOW_X + DOW_cell_W * i, first_DOW_Y);
  }

  pop();
}
function set_day_cell(day_cell_R, day_cell_G, day_cell_B, first_day_X, first_day_Y, day_cell_W, day_cell_H, day_arr, day_arr_cnt) {
  push();
  strokeWeight(0.1);
  rectMode(CENTER);
  fill(day_cell_R, day_cell_G, day_cell_B);
  for (let i=0; i<6; i++) {
    for (let j=0; j<7; j++) {
      rect(first_day_X + day_cell_W * j, first_day_Y + day_cell_H * i, day_cell_W, day_cell_H, 4);
    }
  }

  textSize(9);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i=0; i<6; i++) {
    for (let j=0; j<7; j++) {
      if (j==0) {
        fill(sun_RGB[0], sun_RGB[1], sun_RGB[2]);
      } else if(j==6) {
        fill(sat_RGB[0], sat_RGB[1], sat_RGB[2]);
      } else {
        fill(weekday_RGB[0], weekday_RGB[1], weekday_RGB[2]);
      }
      text(day_arr[day_arr_cnt], first_day_X + day_cell_W * j, first_day_Y + day_cell_H * i);
      day_arr_cnt++;
    }
  }

  pop();
}
function set_calendar(calendar_R, calendar_G, calendar_B, calendar_X, calendar_Y, calendar_W, calendar_H, disp_date_ojb) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(calendar_R, calendar_G, calendar_B);
  rect(calendar_X, calendar_Y, calendar_W, calendar_H, 4);
//  if (!is_calendar_on) {
//    fill(calendar_R + 30, calendar_G + 30, calendar_B + 30);
//    rect(calendar_X - 5, calendar_Y -5, calendar_W, calendar_H, 4);
//  }

  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(10);
  text(disp_date_ojb.getFullYear() + " / " + nf((disp_date_ojb.getMonth()+1), 2), calendar_X, calendar_Y);

  pop();
}
function set_button(button_R, button_G, button_B, button_arr) {
  push();
  noStroke();
  rectMode(CENTER);
  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  for (let i=0; i<button_arr.length; i++) {
    fill(button_R, button_G, button_B);
    rect(button_arr[i][0], button_arr[i][1], button_arr[i][2], button_arr[i][3], 4);
    fill(10);
    text(button_arr[i][4], button_arr[i][0], button_arr[i][1]);
  }
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

function hit_chk(target_X, target_Y, target_W, target_H) {
  if ((target_X - target_W / 2 < mouseX && mouseX < target_X + target_W / 2) && (target_Y - target_H / 2 < mouseY && mouseY < target_Y + target_H / 2)) {
    return 1;
  } else {
    return 0;
  }
}

function set_day_arr() {
  for (let i=0; i<disp_date_ojb.getDay(); i++) {
    day_arr.push(" ");
  }
  
  for (let i=0; i<last_day[disp_month-1]; i++) {
    day_arr.push(i+1);
  }
  
  for (let i=0; i<padding_cnt; i++) {
    day_arr.push(" ");
  }  
}