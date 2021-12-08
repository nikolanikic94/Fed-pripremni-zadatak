var studenti = [];
var aktivanStudent = null;
function promeniAktivnog(selekt) {
    //TODO Implement
    for (var i = 0; i < studenti.length; i++) {
        if (studenti[i].jmbg === Number(selekt.value)) {
            aktivanStudent = studenti[i];
        }
    }
    console.log(aktivanStudent);
    document.getElementById("prosecnaOcena").textContent = "";
    aktivanStudent.refreshPredmeti();
}
var Predmet = /** @class */ (function () {
    function Predmet(naziv, ocena) {
        this.naziv = naziv;
        this.ocena = ocena;
    }
    return Predmet;
}());
var Student = /** @class */ (function () {
    function Student(ime, prezime, jmbg) {
        this._ime = ime;
        this._prezime = prezime;
        this._jmbg = jmbg;
        this._predmeti = [];
    }
    Student.prototype.dodajPredmet = function (predmet) {
        this._predmeti.push(predmet);
        this.refreshPredmeti();
    };
    Student.prototype.refreshPredmeti = function () {
        var outPredmeti = document.getElementById("predmeti");
        var outString = "";
        this._predmeti.forEach(function (predmet) {
            outString += "<p>Predmet: " + predmet.naziv + "<br>Ocena: " + predmet.ocena + "</p>";
        });
        outPredmeti.innerHTML = outString;
    };
    Student.prototype.getProsek = function () {
        var sum = 0;
        this._predmeti.forEach(function (predmet) {
            sum += predmet.ocena;
        });
        return sum / this._predmeti.length;
    };
    Object.defineProperty(Student.prototype, "ime", {
        /**
         * Getter ime
         * @return {string}
         */
        get: function () {
            return this._ime;
        },
        /**
         * Setter ime
         * @param {string} value
         */
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "prezime", {
        /**
         * Getter prezime
         * @return {string}
         */
        get: function () {
            return this._prezime;
        },
        /**
         * Setter prezime
         * @param {string} value
         */
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "jmbg", {
        /**
         * Getter jmbg
         * @return {number}
         */
        get: function () {
            return this._jmbg;
        },
        /**
         * Setter jmbg
         * @param {number} value
         */
        set: function (value) {
            this._jmbg = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "predmeti", {
        /**
         * Getter predmeti
         * @return {Predmet[]}
         */
        get: function () {
            return this._predmeti;
        },
        enumerable: false,
        configurable: true
    });
    return Student;
}());
function wireEvents() {
    document.getElementById("dodajPredmet").addEventListener("click", function () {
        var naziv = document.getElementById("naziv");
        var ocena = document.getElementById("ocena");
        var p1 = new Predmet(naziv.value, Number(ocena.value));
        aktivanStudent.dodajPredmet(p1);
    });
    document
        .getElementById("izracunajProsecnuOcenu")
        .addEventListener("click", function () {
        document.getElementById("prosecnaOcena").innerText = aktivanStudent
            .getProsek()
            .toString();
    });
}
//OVAJ KOD OSTAVITI NA DNU FAJLA
window.onload = function () {
    initStudenti.forEach(function (elem) {
        var s = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach(function (elem) {
            var p = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if (aktivanStudent == null) {
            aktivanStudent = s;
        }
    });
    if (QueryString["ime"] != null) {
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);
    }
    var selekt = document.getElementById("student");
    var output = "";
    for (var i = 0; i < studenti.length; i++) {
        var optionElem = "<option value=" + studenti[i].jmbg + ">" + studenti[i].ime + " " + studenti[i].prezime + "</option>";
        output += optionElem;
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
};
var initStudenti = [
    {
        ime: "Pera",
        prezime: "Peric",
        jmbg: "1123456789000",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 10,
            },
            {
                naziv: "Predmet2",
                ocena: 8,
            },
            {
                naziv: "Predmet3",
                ocena: 9,
            },
            {
                naziv: "Predmet4",
                ocena: 9,
            },
        ],
    },
    {
        ime: "Mika",
        prezime: "Mikic",
        jmbg: "1123456789001",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 7,
            },
            {
                naziv: "Predmet2",
                ocena: 10,
            },
            {
                naziv: "Predmet3",
                ocena: 8,
            },
        ],
    },
];
var QueryString = (function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        }
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        }
        else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
})();
//# sourceMappingURL=proba.js.map