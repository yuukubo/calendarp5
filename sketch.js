// calendarp5

let game_title = "* calendarp5 * c11.6";
let game_title_X, game_title_Y;

let canvas_W, canvas_H;
let is_init = 1;

let calendar_X;
let calendar_Y;
let calendar_W;
let calendar_H;
let calendar_RGB;
let sat_RGB;
let sun_RGB;
let weekday_RGB;
let background_RGB;
let on_RGB;
let off_RGB;

let DOW;
let last_day;

let first_DOW_X;
let first_DOW_Y;
let DOW_cell_W;
let DOW_cell_H;
let frame_RGB;

let first_day_X;
let first_day_Y;
let day_cell_W;
let day_cell_H;
let day_cell_RGB;

let disp_date_ojb;
let disp_year;
let disp_month;

let next_month_X;
let next_month_Y;
let next_month_W;
let next_month_H;
let next_month_text;
let next_month_XYWHtext;

let prev_month_X;
let prev_month_Y;
let prev_month_W;
let prev_month_H;
let prev_month_text;
let prev_month_XYWHtext;

let button_arr;
let button_RGB;

let day_arr;
let padding_cnt;
let day_arr_cnt;

let chg_year_btn_X;
let chg_year_btn_Y;
let chg_year_btn_W;
let chg_year_btn_H;
let chg_year_btn;
let chg_year_btn_val;

function setup() {
//  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
//  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
  chg_year_btn = createSelect();
  set_yaer_list();
  chg_year_btn.changed(selectForm);
  set_val();
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
}

function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_calendar(calendar_RGB[0], calendar_RGB[1], calendar_RGB[2], calendar_X, calendar_Y, calendar_W, calendar_H, disp_date_ojb);
  set_game_title();
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
  mousePressed();
}

function mousePressed() {
  if (hit_chk(next_month_X, next_month_Y, next_month_W, next_month_H)) {
    disp_date_ojb.setMonth(disp_date_ojb.getMonth() + 1);
    set_day_arr();
  }
  if (hit_chk(prev_month_X, prev_month_Y, prev_month_W, prev_month_H)) {
    disp_date_ojb.setMonth(disp_date_ojb.getMonth() - 1);
    set_day_arr();
  }
}

function set_frame(frame_R, frame_G, frame_B, first_DOW_X, first_DOW_Y, DOW_cell_W, DOW_cell_H) {
  push();
  strokeWeight(0.1);
  rectMode(CENTER);
  fill(frame_R, frame_G, frame_B);
  for (let i = 0; i < DOW.length; i++) {
    rect(first_DOW_X + DOW_cell_W * i, first_DOW_Y, DOW_cell_W, DOW_cell_H, 4);
  }

  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i = 0; i < DOW.length; i++) {
    if (i == 0) {
      fill(sun_RGB[0], sun_RGB[1], sun_RGB[2]);
    } else if (i == 6) {
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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      rect(first_day_X + day_cell_W * j, first_day_Y + day_cell_H * i, day_cell_W, day_cell_H, 4);
    }
  }

  textSize(9);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (j == 0) {
        fill(sun_RGB[0], sun_RGB[1], sun_RGB[2]);
      } else if (j == 6) {
        fill(sat_RGB[0], sat_RGB[1], sat_RGB[2]);
      } else {
        fill(weekday_RGB[0], weekday_RGB[1], weekday_RGB[2]);
      }
      text(day_arr[day_arr_cnt], first_day_X + day_cell_W * j, first_day_Y + day_cell_H * i);
      day_arr_cnt++;
    }
  }
  day_arr_cnt = 0;
  pop();
}

function set_calendar(calendar_R, calendar_G, calendar_B, calendar_X, calendar_Y, calendar_W, calendar_H, disp_date_ojb) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(calendar_R, calendar_G, calendar_B);
  rect(calendar_X, calendar_Y, calendar_W, calendar_H, 4);

  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(10);
  text(disp_year + " / " + nf(disp_month, 2), calendar_X, calendar_Y);

  pop();
}

function set_button(button_R, button_G, button_B, button_arr) {
  push();
  noStroke();
  rectMode(CENTER);
  textSize(20);
  textFont("Crimson Text");
  textAlign(CENTER, CENTER);
  for (let i = 0; i < button_arr.length; i++) {
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
  text(game_title, game_title_X, game_title_Y);
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
  day_arr_cnt = 0;
  day_arr = [];
  disp_date_ojb.setDate(1);
  disp_month = disp_date_ojb.getMonth() + 1;
  disp_year = disp_date_ojb.getFullYear();
  for (let i = 0; i < disp_date_ojb.getDay(); i++) {
    day_arr.push(" ");
  }
  for (let i = 0; i < last_day[disp_month - 1]; i++) {
    day_arr.push(i + 1);
  }
  if (disp_month == 2) {
    console.log(disp_month);
    if (disp_date_ojb.getFullYear() % 400 == 0) {
      console.log("400 leap : " + disp_date_ojb.getFullYear());
      day_arr.push(29);
    } else if (disp_date_ojb.getFullYear() % 100 == 0) {
      console.log("100 leap : " + disp_date_ojb.getFullYear());
    } else if (disp_date_ojb.getFullYear() % 4 == 0) {
      console.log("4 leap : " + disp_date_ojb.getFullYear());
      day_arr.push(29);
    } else {
      console.log("not leap : " + disp_date_ojb.getFullYear());
    }
  }
  padding_cnt = 6 * 7 - day_arr.length;
  for (let i = 0; i < padding_cnt; i++) {
    day_arr.push(" ");
  }
}

function set_yaer_list() {
  chg_year_btn.option("jump year");
  for (let i = 1970; i < 2051; i++) {
    chg_year_btn.option(i);
  }
}

function selectForm() {
  if (chg_year_btn.value() != "jump year") {
    chg_year_btn_val = chg_year_btn.value();
    disp_date_ojb.setFullYear(chg_year_btn_val);
    disp_year = disp_date_ojb.getFullYear();
    set_day_arr();
    console.log("jump to : " + disp_year);
  } else {
    console.log("stay : " + disp_year);
  }
}

function set_val() {
  if (is_init) {
    calendar_RGB = [200, 200, 200];
    sat_RGB = [10, 10, 250];
    sun_RGB = [250, 10, 10];
    weekday_RGB = [10, 10, 10];
    background_RGB = [230, 230, 230];
    on_RGB = [250, 250, 250, 150];
    off_RGB = [50, 50, 50, 150];

    DOW = ["日", "月", "火", "水", "木", "金", "土"]
    last_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    frame_RGB = [200, 200, 200];

    day_cell_RGB = [240, 240, 240];

    disp_date_ojb = new Date();
    disp_year = disp_date_ojb.getFullYear();
    disp_month = disp_date_ojb.getMonth() + 1;
    disp_date_ojb.setDate(1);

    next_month_text = "->";
    prev_month_text = "<-";

    button_RGB = [210, 210, 210];

    day_arr = [];
    padding_cnt = 6 * 7 - day_arr.length;
    day_arr_cnt = 0;
    set_day_arr();

    is_init = 0;
  }

  [canvas_W, canvas_H] = [windowWidth - 20, windowHeight - 20];
  [game_title_X, game_title_Y] = [canvas_W * 37 / 40, canvas_H * 29 / 30]

  calendar_X = canvas_W / 2;
  calendar_Y = canvas_H * 4 / 32;
  calendar_W = 200;
  calendar_H = 46;

  first_DOW_X = canvas_W * 2 / 10;
  first_DOW_Y = calendar_Y + calendar_H * 2;
  DOW_cell_W = canvas_W * 2 / 20;
  DOW_cell_H = canvas_H * 2 / 20;

  first_day_X = canvas_W * 2 / 10;
  first_day_Y = first_DOW_Y + DOW_cell_H;
  day_cell_W = canvas_W * 2 / 20;
  day_cell_H = canvas_H * 2 / 20;

  next_month_X = calendar_X + calendar_W / 2;
  next_month_Y = calendar_Y;
  next_month_W = 50;
  next_month_H = calendar_H;
  next_month_XYWHtext = [next_month_X, next_month_Y, next_month_W, next_month_H, next_month_text];

  prev_month_X = calendar_X - calendar_W / 2;
  prev_month_Y = calendar_Y;
  prev_month_W = 50;
  prev_month_H = calendar_H;
  prev_month_XYWHtext = [prev_month_X, prev_month_Y, prev_month_W, prev_month_H, prev_month_text];

  button_arr = [next_month_XYWHtext, prev_month_XYWHtext];

  chg_year_btn_X = calendar_X;
  chg_year_btn_Y = calendar_Y + calendar_H * 3 / 4;
  chg_year_btn_W = calendar_W;
  chg_year_btn_H = calendar_H;
  chg_year_btn.position(chg_year_btn_X, chg_year_btn_Y);
}

function windowResized() {
  set_val();
  resizeCanvas(canvas_W, canvas_H);
  console.log("resize(w, h) : " + canvas_W + ", " + canvas_H);
}