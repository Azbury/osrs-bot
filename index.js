var robot = require('robotjs');

function main() {
    var couldNotFindMob = 0;
    var mobsFarmed = 0;
    var mobsFarmedBeforeRunToggle = 50;
    var toggleRunButtonX = 1723;
    var toggleRunButtonY = 154;


    console.log("starting");
    sleep(4000);

    while (true) {
        var mob = findMob();

        if (mob === false) {
            console.log("I have missed " + ++couldNotFindMob + " mobs");
        } else {
            robot.moveMouse(mob.x, mob.y);
            robot.mouseClick();
            console.log(++mobsFarmed + " mobs have fell to my wrath");
            // toggle run
            if (mobsFarmed % mobsFarmedBeforeRunToggle === 0) {
                robot.moveMouseSmooth(toggleRunButtonX, toggleRunButtonY);
                robot.mouseClick();
            }
            sleep(13000);
        }

    }
}

function findMob() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);
    
    var mob_color = "ff0000";

    for (var i = 0; i < 100; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (mob_color === sample_color) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found mob at: " + screen_x + ", " + screen_y);
            return { x: screen_x, y: screen_y };
        }
    }

    return false;
}

function findSquare() {

    // ADD ABILITY TO FIND MARKS OF GRACE

    var x = 100, y = 100, width = 1300, height = 800;
    var img = robot.screen.capture(x, y, width, height);
    
    var cow_colors = [
        "ff0000"
    ]

    for (var i = 0; i < 10000; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (cow_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found cow at: " + screen_x + ", " + screen_y + " with the color " + sample_color);
            return { x: screen_x, y: screen_y };
        }
    }

    return false;
}

function treeGnomeStrongholdAgilityTraining() {
    
    var sleepTime = 6000;

    // log
    robot.moveMouse(939, 483);
    robot.mouseClick();

    sleep(sleepTime);

    // cargo net box
    robot.moveMouse(955,401);
    robot.mouseClick();

    sleep(sleepTime);

    // pole
    robot.moveMouse(945,487);
    robot.mouseClick();

    sleep(sleepTime);

    // rope bridge
    robot.moveMouse(787,529);
    robot.mouseClick();

    sleep(7000);

    // down the tree
    robot.moveMouse(850,490);
    robot.mouseClick();

    sleep(sleepTime);

    // over cargo net
    robot.moveMouse(977,735);
    robot.mouseClick();

    sleep(sleepTime);

    // pipe
    robot.moveMouse(982,628);
    robot.mouseClick();

    sleep(9000);

    // back to the start
    robot.moveMouse(1247,475);
    robot.mouseClick();
}

function draynorVillageAgilityTraining() {
    var sleepTime = 6000;

    robot.moveMouse(875,515);
    robot.mouseClick();
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