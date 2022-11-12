var robot = require('robotjs');

function main() {

    var cowsFarmed = 0;
    var couldNotFindCow = 0;

    console.log("starting");
    sleep(4000);
    //draynorVillageAgilityTraining();
    while (true) {
        var cow = findCow();

        if (cow === false) {
            console.log("I have missed " + ++couldNotFindCow + " cows");
        } else {
            robot.moveMouse(cow.x, cow.y);
            robot.mouseClick();
            console.log(++cowsFarmed + " cows have fell to my wrath");
            sleep(8000);
        }

    }

    console.log("done.");
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
        "0b7383"
    ]

    for (var i = 0; i < 100; i++) {
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