#! /usr/bin/env node

var robot = require('robotjs');
const { argv } = require('yargs');
var yargs = require("yargs");

var usage = '\nA bot for OSRS'

const options = yargs  
  .usage(usage)
  .option("agility", { describe: "Run agility course"})
  .option("crab", { describe: "Farm crabs" })
  .option("craft", { describe: "Crafting gems" })
  .option("fire", { describe: "Make fires" })
  .option("magictrees", { describe: "Farm magic trees"})
  .option("mob", { describe: "Attack mobs"})
  .option("motherload", { describe: "Motherload Mine"})
  .option("nmz", { describe: "Nightmare Zone" })
  .help('info')
  .argv;

if (argv.agility) agility();
if (argv.crab) farmCrabs();
if (argv.craft) crafting();
if (argv.fire) firemaking();
if (argv.magictrees) magicTrees();
if (argv.mob) attackMobs();
if (argv.motherload) motherloadMine();
if (argv.nmz) nightmareZone();

function attackMobs() {
    let mobsFound = 0;

    let prayerPotPosition = 0;
    let prayerPotCount = 0;

    while(true) {
        let mob = findMob();

        if (mob === false) {
            console.log("Searching...")
        } else {
            moveAndClick(mob.x, mob.y);
            console.log(++mobsFound + " " + mob.object + " have been located");
            sleep(25000);
            if (mobsFound % 2 === 0) {
                useInventory(prayerPotPosition)
                if (++prayerPotCount % 4 === 0) prayerPotPosition++;
            }
            sleep(1000);
        }
    }
}

function crafting() {
    let chiselPosition = 0;
    let firstGemPosition = 1;
    let craftSleep = 3000; // 3 sec

    while (true) {
        useInventory(chiselPosition);
        sleep(craftSleep);
        useInventory(firstGemPosition);
        sleep(craftSleep);
        moveAndClick(259,966); // start crafting
        sleep(35000) // 35 seconds
        moveAndClick(981,907); // click bank booth
        sleep(craftSleep)
        useInventory(firstGemPosition);
        sleep(craftSleep);
        useBank(0);
        sleep(craftSleep);
        closeBank();
        sleep(craftSleep);
    }
}

function farmCrabs() {
    let crabResets = 0;

    while (true) {
        fourCrabBottomLeft();
        console.log("The crabs have been reset " + ++crabResets + " times");
    }
}

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
    }, 48 * 1000); // 50 seconds
}

function agility() {
    let marksFound = 0;
    let obstaclesFound = 0;

    while(true) {
        let square = findSquare();

        if (square === false) {
            console.log("Searching...")
        } else {
            moveAndClick(square.x, square.y);
            if (square.object === "marks of grace") {
                console.log(++marksFound + " marks of grace have been found");
            } else {
                console.log(++obstaclesFound + " " + square.object + " have been located");
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
        } else {
            moveAndClick(ore.x, ore.y);
            console.log(++oresFound + " " + ore.object + " have been located");
            sleep(15000);
        }
    }
}

function magicTrees() {
    let treesFound = 0;
    let tree1XCord = 614;
    let tree1YCord = 354;
    let tree2XCord = 610;
    let tree2YCord = 246;

    while(true) {
        if (treesFound % 2 === 0) {
            moveAndClick(tree1XCord, tree1YCord);
        } else {
            moveAndClick(tree2XCord, tree2YCord);
        }
        sleep(270000); //4.5mins
        moveAndClick(1314, 772);
        sleep(6000); //3sec
        useInventory(0);
        sleep(3000); //3secs
        closeBank();
        console.log(++treesFound + " trees have been farmed");
    }
}

function findMob() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);
    
    var mob_color = "ff0000"; // red color
    // var mob_color = "000000" // tree tile color

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

            console.log("Found ore at: " + screen_x + ", " + screen_y);
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

function fourCrabBottomLeft() {
    let crabSleep = 11000; // 11 sec

    sleep(660000) // 11 min

    moveAndClick(1656, 535);
    sleep(crabSleep);
    moveAndClick(1670,626);
    sleep(crabSleep)
    moveAndClick(210,471);
    sleep(crabSleep);
    moveAndClick(305,510);
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

    moveAndClick(inventoryCoordinates[position].x, inventoryCoordinates[position].y);
}

function useBank(position) {
    let bankCoordinates = [
        { x: 646 , y: 143 }
    ]

    moveAndClick(bankCoordinates[position].x, bankCoordinates[position].y);
}

function closeBank() {
    moveAndClick(1043, 66);
}

function useSpecialAttack() {
    moveAndClick(1750, 176);
}

function moveAndClick(x, y) {
    robot.moveMouse(x, y);
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