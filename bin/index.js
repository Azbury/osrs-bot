#! /usr/bin/env node

var robot = require('robotjs');
const { argv } = require('yargs');
var yargs = require("yargs");

var usage = '\nA bot for OSRS'

const options = yargs  
  .usage(usage)
  .option("agility", { describe: "Run agility course"})
  .option("fire", { describe: "Make fires" })
  .option("motherload", { describe: "Motherload Mine"})
  .option("nmz", { describe: "Nightmare Zone" })
  .help('info')
  .argv;

if (argv.agility) agility();
if (argv.fire) firemaking();
if (argv.motherload) motherloadMine();
if (argv.nmz) nightmareZone();

function firemaking() {
    let tinderboxPosition = 0;
    let currentInventoryPosition = 1;

    while (currentInventoryPosition < 28) {
        useInventory(tinderboxPosition);
        sleep(3000);
        useInventory(currentInventoryPosition++);
        sleep(3000);
    }
}

function nightmareZone() {
    let overloadPotPosition = 0;
    let prayerPotPosition = 4;

    let overloadPotCount = 1;
    let prayerPotCount = 0;

    setInterval(() => {
        useInventory(overloadPotPosition)
        if (++overloadPotCount % 4 === 0) overloadPotPosition++;
    }, 305000); // 5 minutes and 5 seconds 

    setInterval(() => {
        useInventory(prayerPotPosition)
        if (++prayerPotCount % 4 === 0) prayerPotPosition++;
    }, 42 * 1000); // 39 seconds
}

function agility() {
    let marksFound = 0;
    let obstaclesFound = 0;

    while(true) {
        let mob = findSquare();

        if (mob === false) {
            console.log("Searching...")
            //console.log("I have been unable find my target " + ++couldNotFindObject + " times");
        } else {
            robot.moveMouse(mob.x, mob.y);
            robot.mouseClick();
            if (mob.object === "marks of grace") {
                console.log(++marksFound + " marks of grace have been found");
            } else {
                console.log(++obstaclesFound + " " + mob.object + " have been located");
            }
            sleep(5000);
        }
    }
}

function motherloadMine() {
    let oresFound = 0;

    while(true) {
        let ore = findMotherloadOre();

        if (ore === false) {
            console.log("Searching...")
            //console.log("I have been unable find my target " + ++couldNotFindObject + " times");
        } else {
            robot.moveMouse(ore.x, ore.y);
            robot.mouseClick();
            console.log(++oresFound + " " + ore.object + " have been located");
            sleep(15000);
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

function findMotherloadOre() {
    var x = 500, y = 100, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);
    
    let oreColors = [
        "615858",
        "4f4848",
        "46403f",
        "585050",
        "5d5454",
        "564e4e",
    ]

    for (var i = 0; i < 100; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (oreColors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found mob at: " + screen_x + ", " + screen_y);
            return { x: screen_x, y: screen_y, object: "ores" };
        }
    }

    return false;
}

function findSquare() {

    var mark_x = 300, mark_y = 300, mark_width = 1300, mark_height = 400

    var obstacle_x = 100, obstacle_y = 0, obstacle_width = 1820, obstacle_height = 900;
    
    var agility_obstacle_colors = ["e700ff", "ba00cd"];

    var mark_of_grace_overlay_color = ["0026ff", "001fcd", "0019a5"]

    // Using actual mark of grace colors
    var mark_of_grace_colors = [
        "ae920b",
        "a0870a",
        "a78c0b", 
        "a4880a", 
        "867109", 
        "8c7409", 
        "7e6a08", 
        "685806", 
        "715e07", 
        "6a5906"
    ];

    var img = robot.screen.capture(obstacle_x, obstacle_y, obstacle_width, obstacle_height);

    for (var i = 0; i < 100; i++) {
        var random_x = getRandomInt(0, obstacle_width - 1);
        var random_y = getRandomInt(0, obstacle_height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (agility_obstacle_colors.includes(sample_color)) {
            var screen_x = random_x + obstacle_x;
            var screen_y = random_y + obstacle_y;

            console.log("Found agility obstacle at: " + screen_x + ", " + screen_y);
            return { x: screen_x, y: screen_y, object: "agility obstacles" };
        } 
    }

    img = robot.screen.capture(mark_x, mark_y, mark_width, mark_height);

    for (var i = 0; i < 100; i++) {
        var random_x = getRandomInt(0, mark_width - 1);
        var random_y = getRandomInt(0, mark_height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (mark_of_grace_overlay_color.includes(sample_color)) {
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

function singleCrabNearAltar() {
    // wait 11 mins
    sleep(660000);

    robot.moveMouse(370,448);
    robot.mouseClick();

    sleep(14000);

    robot.moveMouse(356,507);
    robot.mouseClick();

    sleep(14000)

    robot.moveMouse(1633,591);
    robot.mouseClick();

    sleep(14000);

    robot.moveMouse(1455,600);
    robot.mouseClick();
}

function doubleCrabNearWCGuild() {
    // wait 11 mins
    sleep(660000);

    robot.moveMouse(1421,255);
    robot.mouseClick();

    sleep(11000);

    robot.moveMouse(1107,189);
    robot.mouseClick();

    sleep(11000);

    robot.moveMouse(705,999)
    robot.mouseClick();

    sleep(11000);

    robot.moveMouse(567,951);
    robot.mouseClick();

    sleep(11000);

    robot.moveMouse(540,725);
    robot.mouseClick();
}

function fourCrabBottomLeft() {
    // wait 11 mins
    sleep(660000)

    robot.moveMouse(1656,535);
    robot.mouseClick();

    sleep(11000);

    robot.moveMouse(1670,626);
    robot.mouseClick();

    sleep(11000)

    robot.moveMouse(210,471);
    robot.mouseClick();

    sleep(11000);

    robot.moveMouse(305,510);
    robot.mouseClick();
}

function useInventory(position) {
    let inventoryCoordinates = [
        { x: 1699, y: 767},
        { x: 1742, y: 767},
        { x: 1783, y: 767},
        { x: 1826, y: 767},
        { x: 1699, y: 803},
        { x: 1742, y: 803},
        { x: 1783, y: 803},
        { x: 1826, y: 803},
        { x: 1699, y: 839},
        { x: 1742, y: 839},
        { x: 1783, y: 839},
        { x: 1826, y: 839},
        { x: 1699, y: 876},
        { x: 1742, y: 876},
        { x: 1783, y: 876},
        { x: 1826, y: 876},
        { x: 1699, y: 911},
        { x: 1742, y: 911},
        { x: 1783, y: 911},
        { x: 1826, y: 911},
        { x: 1699, y: 947},
        { x: 1742, y: 947},
        { x: 1783, y: 947},
        { x: 1826, y: 947},
        { x: 1699, y: 984},
        { x: 1742, y: 984},
        { x: 1783, y: 984},
        { x: 1826, y: 984}
    ]

    robot.moveMouse(inventoryCoordinates[position].x, inventoryCoordinates[position].y);
    robot.mouseClick();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}