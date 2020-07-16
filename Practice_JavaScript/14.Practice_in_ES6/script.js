class Element {
    constructor(name1, buildYear1) {
        this.name = name1; // if we use this.name1 = name1, so the childs class have to have the name1 property too
        this.buildYear = buildYear1; // instead of using name
    }
}

class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; // area in this.area has to have the same name as name in this.name of super class
        this.numTrees = numTrees; // On the other word, the properties of super class have the same name with the
        // child's properties
    }

    treeDensity() {
        const density = (this.numTrees)/(this.area);
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'hugge');
        console.log(`${this.name} build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}

const park1 = new Park('Green Park', 1987, 0.2, 215);
const park2 = new Park('National Park', 1946, 2.8, 2155);
const park3 = new Park('Green Park', 1765, 3.1, 3215);
const allParks = [park1, park2, park3];

const street1 = new Street('Brookhust', 1876, 1.3, 2);
const street2 = new Street('Katella', 1987, 4.3, 5);
const street3 = new Street('Euclid', 1897, 5.4, 4);
const allStreet = [street1, street2, street3];

function reportParks(element) {
    element.forEach(el => {
        el.treeDensity();
    });
}

function reportStreets(element) {
    element.forEach(el => {
        el.classifyStreet();
    });
}

reportParks(allParks);
reportStreets(allStreet);