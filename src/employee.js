class Employee {
  constructor(name, position, division) {
    this.name = name;
    this.position = position;
    this.division = division;
  }

  capitalizeName() {
    // if name consists of multiple words, capitalize each word
    this.name = this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  lowerCaseDivision() {
    this.division = this.division.toLowerCase();
  }

  static compareEmployee(employeeA, employeeB) {
    // compare by all fields
    return (
      employeeA.name?.toLowerCase() === employeeB.name?.toLowerCase() &&
      employeeA.position?.toLowerCase() === employeeB.position?.toLowerCase() &&
      employeeA.division?.toLowerCase() === employeeB.division?.toLowerCase()
    );
  }
}

export default Employee;