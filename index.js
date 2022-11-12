var robot = require('robotjs');

function main() {

    var cowsFarmed = 0;
    var couldNotFindCow = 0;

    console.log("starting");
    sleep(4000);

    while (true) {
        var cow = findCow();

        if (cow === false) {
            console.log("I have missed " + ++couldNotFindCow + " cows");
        } else {
            robot.moveMouse(cow.x, cow.y);
            robot.mouseClick();
            console.log(++cowsFarmed + " cows have fell to my wrath");
            sleep(20000);
        }

    }

    //console.log("done.");
}

function findGoblin() {
    var x = 0, y = 0, width = 1920, height = 1080;
    var img = robot.screen.capture(x, y, width, height);

    var goblin_colors = [
        "8a6116",
        "875f16",
        "ae7b1b", 
        "725211", 
        "916617", 
        "9b6e19"
    ]

    for (var i = 0; i < 100; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);

        if (goblin_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found goblin at:" + screen_x + ", " + screen_y + " color " + sample_color);
            return { x: screen_x, y: screen_y };
        }
    }

    return false;
}

function findChicken() {
    var x = 300, y = 300, width = 1300, height = 300;
    var img = robot.screen.capture(x, y, width, height);

    var chicken_colors = [
        "b19769",
        "a1885f",
        "6a5a3f",
        "b79c6e"
    ]

    for (var i = 0; i < 1000; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);

        if (chicken_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found chicken at:" + screen_x + ", " + screen_y + " color " + sample_color);
            return { x: screen_x, y: screen_y };
        }
    }

    return false;
}

function findCow() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);
    
    var cow_colors = [
        "736155",
        "5d5045",
        "756356",
        "6f5643",
        "755a45",
        "463121",
        "3c2b23",
        "382921",
        "311d17",
        "4b362b",
        "4f4039",
        "291d17"
    ]

    for (var i = 0; i < 2500; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);

        if (cow_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found cow at:" + screen_x + ", " + screen_y + " color " + sample_color);
            return { x: screen_x, y: screen_y };
        }
    }

    return false;
}

function farmCrabs() {
    sleep(600000);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();