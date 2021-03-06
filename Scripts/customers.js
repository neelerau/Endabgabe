/*
Dönersimulation
Neele Rauber
MKB3
Matrikelnummer: 266954
In Zusammenarbeit mit Alessia Carbone kreiert
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Inspiration für die Kunden von Amlie Dell'Oro
var Dönerladen;
(function (Dönerladen) {
    var STATE;
    (function (STATE) {
        STATE[STATE["COMING"] = 0] = "COMING";
        STATE[STATE["ORDERING"] = 1] = "ORDERING";
        STATE[STATE["FINISH"] = 2] = "FINISH";
    })(STATE || (STATE = {}));
    var Customer = /** @class */ (function (_super) {
        __extends(Customer, _super);
        function Customer(_position, _color, _color2) {
            var _this = _super.call(this, _position) || this;
            _this.velocity.set(-150, 0);
            _this.state = STATE.COMING;
            _this.color = _color;
            _this.strokecolor2 = _color2;
            return _this;
        }
        Customer.prototype.draw = function () {
            var _this = this;
            Dönerladen.crc2.save();
            Dönerladen.crc2.beginPath();
            Dönerladen.crc2.translate(this.position.x, this.position.y);
            Dönerladen.crc2.arc(0, 0, 30, 0, 360);
            Dönerladen.crc2.fillStyle = this.strokecolor2;
            Dönerladen.crc2.fill();
            Dönerladen.crc2.restore();
            Dönerladen.crc2.save();
            Dönerladen.crc2.fillStyle = this.color;
            Dönerladen.crc2.translate(this.position.x, this.position.y);
            Dönerladen.crc2.beginPath();
            Dönerladen.crc2.arc(0, 0, 25, 0, 360);
            Dönerladen.crc2.fill();
            Dönerladen.crc2.restore();
            //Average Mood
            Dönerladen.crc2.beginPath();
            Dönerladen.crc2.rect(1100, 200, 180, 10);
            Dönerladen.crc2.closePath();
            Dönerladen.crc2.fillStyle = this.strokecolor2;
            Dönerladen.crc2.fill();
            setTimeout(function () {
                _this.strokecolor2 = "red";
            }, 15000);
        };
        Customer.prototype.move = function (_timeslice) {
            _super.prototype.move.call(this, _timeslice);
            switch (this.state) {
                case STATE.COMING:
                    var nextInLine = Dönerladen.customerIn[Dönerladen.customerIn.indexOf(this) - 1];
                    if (this.position.x <= 550) {
                        this.velocity.set(0, 0);
                        this.state = STATE.ORDERING;
                        break;
                    }
                    else if (nextInLine) {
                        if ((this.velocity.length * _timeslice) + 150 > new Dönerladen.Vector(nextInLine.position.x - this.position.x, nextInLine.position.y - this.position.y).length) {
                            this.velocity.set(0, 0);
                        }
                        else {
                            this.velocity.set(-150, 0);
                        }
                    }
                    break;
                case STATE.FINISH:
                    if (this.position.y > Dönerladen.crc2.canvas.height - 0)
                        Dönerladen.removeCustomer(this);
            }
        };
        Customer.prototype.finishedOrder = function () {
            this.velocity.set(0, 150);
            this.state = STATE.FINISH;
        };
        return Customer;
    }(Dönerladen.Moveable));
    Dönerladen.Customer = Customer;
})(Dönerladen || (Dönerladen = {}));
//# sourceMappingURL=customers.js.map