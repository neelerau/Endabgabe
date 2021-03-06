/*
Dönersimulation
Neele Rauber
MKB3
Matrikelnummer: 266954
In Zusammenarbeit mit Alessia Carbone kreiert
*/

namespace Dönerladen {


    export let crc2: CanvasRenderingContext2D;
    export let storesimulation: Doenerladen;

    export let employee1: Employees;
    export let employee2: Employees;

    export let customerIn: Customer[] = [];

    let customerSpawnPoint: Vector;
    let lastFrame: number;
    let moveables: Moveable[] = [];


    let employeeColor: string = "66b2ff";
    let customerColor: string = "#ff3333";
    let employeeMood: string = "green";
    let customerMood: string = "green";


    let instructionButton: HTMLSpanElement;
    let instructionBoard: Element;


    //Handleload on window

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {


        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        instructionButton = <HTMLDivElement>document.getElementById("instructionButton");
        instructionBoard = <HTMLSpanElement>document.getElementById("instructionBoard");

        instructionButton.addEventListener("click", showInstruction);

        canvas.addEventListener("click", handleCanvasClick);

    }


    //Instruction Board

    const hiddencanvas: Element = (document.getElementById("hiddencanvas") as HTMLInputElement);

    function showInstruction(): void {
        console.log("HI");
        if (instructionBoard.classList.contains("is-hidden")) {
            instructionBoard.classList.remove("is-hidden");
            instructionBoard.classList.add("visible");
            hiddencanvas.classList.add("noopacity");
        } else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("is-hidden");
            hiddencanvas.classList.remove("noopacity");
        }
    }


    //start Simulation

    const ingrediens: Element = (document.getElementById("ingrediens") as HTMLInputElement);
    const landingPage: Element = (document.getElementById("settings") as HTMLInputElement);
    const startbutton: Element = (document.getElementById("startbutton") as HTMLInputElement);
    const reloadbutton: Element = (document.getElementById("newSimulation") as HTMLInputElement);


    startbutton.addEventListener("click", function (): void {
        startSimulation();
    });

    function startSimulation(): void {
        landingPage.classList.add("is-hidden");
        ingrediens.classList.remove("is-hidden");
        storesimulation = new Doenerladen();
        console.log("start");
        storesimulation.draw();
        reloadbutton.classList.remove("is-hidden");

        getUserPreferences();
        moodEmployees();
        moodCustomer();
        createEmployee();
        window.setInterval(drawUpdate, 20);
        window.setInterval(function (): void {
            animationUpdate();
        },                 20);

        customerSpawnPoint = new Vector(1000, 300);
        lastFrame = performance.now();
        update();
        newCustomer();
        window.setInterval(newCustomer, 5000);
    }


    //Employees moving with keyevent + mouseclick

    function drawUpdate(): void {
        storesimulation.draw();
        for (let moveable of moveables) {
            moveable.draw();
        }
    }

    function getUserPreferences(): void {
        let formData: FormData = new FormData(document.forms[0]);
        employeeColor = <string>formData.get("employeeColorPicker");
        customerColor = <string>formData.get("customerColorPicker");
    }

    function moodEmployees(): void {
        employeeMood = "green";
        console.log("color");
    }

    function createEmployee(): void {

        employee1 = new Employees(new Vector(200, 300), employeeColor, employeeMood);
        employee2 = new Employees(new Vector(200, 400), employeeColor, employeeMood);
        moveables.push(employee1);
        moveables.push(employee2);

    }

    function handleCanvasClick(_event: MouseEvent): void {
        if (_event.shiftKey || _event.altKey) {
            employee1moving(_event);
        }
        employee2moving(_event);
    }

    function employee1moving(_event: MouseEvent): void {
        let xpos: number = 0;
        let ypos: number = 0;
        if (_event.shiftKey) {
            if (_event.offsetX > 50 && _event.offsetX < 400) {
                xpos = _event.offsetX;
            }
            if (_event.offsetY > 90 && _event.offsetY < 500) {
                ypos = _event.offsetY;
            }

            if (xpos > 0 && ypos > 0) {
                employee1.destination = new Vector(xpos, ypos);
                employee1.startMoving = true;
            }
        }
    }

    function employee2moving(_event: MouseEvent): void {
        let xpos: number = 0;
        let ypos: number = 0;

        if (_event.altKey) {
            if (_event.offsetX > 50 && _event.offsetX < 400) {
                xpos = _event.offsetX;
            }
            if (_event.offsetY > 90 && _event.offsetY < 500) {
                ypos = _event.offsetY;
            }

            if (xpos > 0 && ypos > 0) {
                employee2.destination = new Vector(xpos, ypos);
                employee2.startMoving = true;
                console.log("HI");
            }
        }
    }


    function animationUpdate(): void {
        for (let moveable of moveables) {
            moveable.move(200);
        }

    }



    //Kunden kommen, warten und gehen

    const nextCustomer: Element = (document.getElementById("nextCustomer") as HTMLInputElement);

    function newCustomer(): void {
        if (customerIn.length < 5) {
            customerIn.push(new Customer(new Vector(customerSpawnPoint.x, customerSpawnPoint.y), customerColor, customerMood));
            console.log("hi");
        }
    }

    nextCustomer.addEventListener("click", function (): void {
        customerLeave();

    });

    function moodCustomer(): void {
        customerMood = "green";
    }


    function customerLeave(): void {
        customerIn[0].finishedOrder();
        console.log("weg");
    }

    function update(): void {
        let frameTime: number = performance.now() - lastFrame;
        lastFrame = performance.now();
        for (let customer of customerIn) {
            //Geschwindigkeit Kunde
            customer.move(frameTime / 1000);
            customer.draw();
        }
        window.requestAnimationFrame(update);
    }

    export function removeCustomer(_customer: Customer): void {
        customerIn.splice(customerIn.indexOf(_customer), 1);

    }

}