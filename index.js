var robot = require('robotjs');

function main() {
    console.log("starting");
    sleep(4000);

    while (true) {
        var goblin = findGoblin();

        if (goblin === false) {
            console.log("Could not find goblin");
            break;
        }

        robot.moveMouse(goblin.x, goblin.y);
        robot.mouseClick();

        sleep(30000);
    }

    console.log("done.");
}

function findGoblin() {
    var x = 300, y = 300, width = 1300, height = 500;
    var img = robot.screen.capture(x, y, width, height);

    var goblin_colors = ["574e40", "595042", "635949", "736855", "605747", "5e5545", "5c5244", "655b4b", "736855"];

    for (var i = 0; i < 2000; i++) {
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

main();