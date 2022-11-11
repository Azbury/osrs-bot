var robot = require('robotjs');

function main() {
    console.log("starting");
    sleep(4000);

    while (true) {
        var goblin = findGoblin();

        robot.moveMouse(tree.x, tree.y);
        robot.mouseClick();

        sleep(10000);
    }

    console.log("done.");
}

function findGoblin() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);

    var goblin_colors = ["635949", "341f03", "9d908f", "676c1c", "5a3e06", "574e40"];

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