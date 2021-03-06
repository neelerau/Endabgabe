/*
Dönersimulation
Neele Rauber
MKB3
Matrikelnummer: 266954
In Zusammenarbeit mit Alessia Carbone kreiert
*/
var Dönerladen;
(function (Dönerladen) {
    Dönerladen.customerIn = [];
    var customerSpawnPoint;
    var lastFrame;
    var moveables = [];
    var employeeColor = "66b2ff";
    var customerColor = "#ff3333";
    var employeeMood = "green";
    var customerMood = "green";
    var instructionButton;
    var instructionBoard;
    //Handleload on window
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        var canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Dönerladen.crc2 = canvas.getContext("2d");
        instructionButton = document.getElementById("instructionButton");
        instructionBoard = document.getElementById("instructionBoard");
        instructionButton.addEventListener("click", showInstruction);
        canvas.addEventListener("click", handleCanvasClick);
    }
    //Instruction Board
    var hiddencanvas = document.getElementById("hiddencanvas");
    function showInstruction() {
        console.log("HI");
        if (instructionBoard.classList.contains("is-hidden")) {
            instructionBoard.classList.remove("is-hidden");
            instructionBoard.classList.add("visible");
            hiddencanvas.classList.add("noopacity");
        }
        else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("is-hidden");
            hiddencanvas.classList.remove("noopacity");
        }
    }
    //start Simulation
    var ingrediens = document.getElementById("ingrediens");
    var landingPage = document.getElementById("settings");
    var startbutton = document.getElementById("startbutton");
    var reloadbutton = document.getElementById("newSimulation");
    startbutton.addEventListener("click", function () {
        startSimulation();
    });
    function startSimulation() {
        landingPage.classList.add("is-hidden");
        ingrediens.classList.remove("is-hidden");
        Dönerladen.storesimulation = new Dönerladen.Doenerladen();
        console.log("start");
        Dönerladen.storesimulation.draw();
        reloadbutton.classList.remove("is-hidden");
        getUserPreferences();
        moodEmployees();
        moodCustomer();
        createEmployee();
        window.setInterval(drawUpdate, 20);
        window.setInterval(function () {
            animationUpdate();
        }, 20);
        customerSpawnPoint = new Dönerladen.Vector(1000, 300);
        lastFrame = performance.now();
        update();
        newCustomer();
        window.setInterval(newCustomer, 5000);
    }
    //Employees moving with keyevent + mouseclick
    function drawUpdate() {
        Dönerladen.storesimulation.draw();
        for (var _i = 0, moveables_1 = moveables; _i < moveables_1.length; _i++) {
            var moveable = moveables_1[_i];
            moveable.draw();
        }
    }
    function getUserPreferences() {
        var formData = new FormData(document.forms[0]);
        employeeColor = formData.get("employeeColorPicker");
        customerColor = formData.get("customerColorPicker");
    }
    function moodEmployees() {
        employeeMood = "green";
        console.log("color");
    }
    function createEmployee() {
        Dönerladen.employee1 = new Dönerladen.Employees(new Dönerladen.Vector(200, 300), employeeColor, employeeMood);
        Dönerladen.employee2 = new Dönerladen.Employees(new Dönerladen.Vector(200, 400), employeeColor, employeeMood);
        moveables.push(Dönerladen.employee1);
        moveables.push(Dönerladen.employee2);
    }
    function handleCanvasClick(_event) {
        if (_event.shiftKey || _event.altKey) {
            employee1moving(_event);
        }
        employee2moving(_event);
    }
    function employee1moving(_event) {
        var xpos = 0;
        var ypos = 0;
        if (_event.shiftKey) {
            if (_event.offsetX > 50 && _event.offsetX < 400) {
                xpos = _event.offsetX;
            }
            if (_event.offsetY > 90 && _event.offsetY < 500) {
                ypos = _event.offsetY;
            }
            if (xpos > 0 && ypos > 0) {
                Dönerladen.employee1.destination = new Dönerladen.Vector(xpos, ypos);
                Dönerladen.employee1.startMoving = true;
            }
        }
    }
    function employee2moving(_event) {
        var xpos = 0;
        var ypos = 0;
        if (_event.altKey) {
            if (_event.offsetX > 50 && _event.offsetX < 400) {
                xpos = _event.offsetX;
            }
            if (_event.offsetY > 90 && _event.offsetY < 500) {
                ypos = _event.offsetY;
            }
            if (xpos > 0 && ypos > 0) {
                Dönerladen.employee2.destination = new Dönerladen.Vector(xpos, ypos);
                Dönerladen.employee2.startMoving = true;
                console.log("HI");
            }
        }
    }
    function animationUpdate() {
        for (var _i = 0, moveables_2 = moveables; _i < moveables_2.length; _i++) {
            var moveable = moveables_2[_i];
            moveable.move(200);
        }
    }
    //Kunden kommen, warten und gehen
    var nextCustomer = document.getElementById("nextCustomer");
    function newCustomer() {
        if (Dönerladen.customerIn.length < 5) {
            Dönerladen.customerIn.push(new Dönerladen.Customer(new Dönerladen.Vector(customerSpawnPoint.x, customerSpawnPoint.y), customerColor, customerMood));
            console.log("hi");
        }
    }
    nextCustomer.addEventListener("click", function () {
        customerLeave();
    });
    function moodCustomer() {
        customerMood = "green";
    }
    function customerLeave() {
        Dönerladen.customerIn[0].finishedOrder();
        console.log("weg");
    }
    function update() {
        var frameTime = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (var _i = 0, customerIn_1 = Dönerladen.customerIn; _i < customerIn_1.length; _i++) {
            var customer = customerIn_1[_i];
            //Geschwindigkeit Kunde
            customer.move(frameTime / 1000);
            customer.draw();
        }
        window.requestAnimationFrame(update);
    }
    function removeCustomer(_customer) {
        Dönerladen.customerIn.splice(Dönerladen.customerIn.indexOf(_customer), 1);
    }
    Dönerladen.removeCustomer = removeCustomer;
})(Dönerladen || (Dönerladen = {}));
//# sourceMappingURL=main.js.map