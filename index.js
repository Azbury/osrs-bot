var robot = require('robotjs');

function main() {
    const agilitySleepDelay = 9000;
    const runMobSleepDelay = 12000;
    const walkMobSleepDelay = 13000;

    const objectsFoundBeforeRunToggle = 100;

    const toggleRunButtonX = 1723;
    const toggleRunButtonY = 154;

    let couldNotFindObject = 0;
    let marksFound = 0;
    let objectsFound = 0;
    let running = true;

    console.log("starting");
    sleep(4000);

    while (true) {
        var mob = findMob();

        if (mob === false) {
            console.log("I have been unable find my target " + ++couldNotFindObject + " times");
        } else {
            robot.moveMouse(mob.x, mob.y);
            robot.mouseClick();
            if (mob.object === "marks of grace") {
                console.log(++marksFound + " marks of grace have been found");
            } else {
                console.log(++objectsFound + " " + mob.object + " have been located");
            }
            // toggle run
            if (objectsFound % objectsFoundBeforeRunToggle === 0) {
                running = !running;
                robot.moveMouseSmooth(toggleRunButtonX, toggleRunButtonY);
                robot.mouseClick();
            }
            if (running) {
                sleep(runMobSleepDelay);
            } else {
                sleep(walkMobSleepDelay)
            }
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
            return { x: screen_x, y: screen_y, object: "mobs" };
        }
    }

    return false;
}

function findSquare() {

    // ADD ABILITY TO FIND MARKS OF GRACE

    var mark_x = 300, mark_y = 300, mark_width = 1300, mark_height = 400

    var obstacle_x = 100, obstacle_y = 100, obstacle_width = 1300, obstacle_height = 800;
    
    var agility_obstacle = "ff0000";
    var mark_of_grace_colors = ["00ff00", "00cd00", "00a500"];

    var img = robot.screen.capture(obstacle_x, obstacle_y, obstacle_width, obstacle_height);

    for (var i = 0; i < 10000; i++) {
        var random_x = getRandomInt(0, obstacle_width - 1);
        var random_y = getRandomInt(0, obstacle_height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (agility_obstacle === sample_color) {
            var screen_x = random_x + obstacle_x;
            var screen_y = random_y + obstacle_y;

            console.log("Found agility obstacle at: " + screen_x + ", " + screen_y);
            return { x: screen_x, y: screen_y, object: "agility obstacles" };
        } 
    }

    img = robot.screen.capture(mark_x, mark_y, mark_width, mark_height);

    for (var i = 0; i < 10000; i++) {
        var random_x = getRandomInt(0, mark_width - 1);
        var random_y = getRandomInt(0, mark_height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (mark_of_grace_colors.includes(sample_color)) {
            var screen_x = random_x + mark_x;
            var screen_y = random_y + mark_y;

            console.log("Found mark of grace at: " + screen_x + ", " + screen_y);
            return { x: screen_x, y: screen_y , object: "marks of grace"};
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