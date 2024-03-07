import Employee from "./src/employee.js";

const EmployeeDb = {
  employees: [],
  getAllEmployees() {
    // return all employees ordered by name
    return this.employees.filter(employee => employee && employee.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  addEmployee(name, position, division) {
    const newEmployee = new Employee(name, position, division);
    // add new employee only if it doesn't exist
    // using static method to compare employees Employee.compareEmployee
    if (this.employees.some((employee) => Employee.compareEmployee(employee, newEmployee))) {
      return;
    }
    this.employees.push(newEmployee);
  },
  getEmployeeByName(name) {
    const employee = this.employees.find((employee) => employee.name === name);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  },
  updateEmployee(employee, name, position, division) {
    if (name) {
      employee.name = name;
    }
    if (position) {
      employee.position = position;
    }
    if (division) {
      employee.division = division;
    }
  },
  deleteEmployee(employee) {
    // using delete operator to remove employee from array
    // note: this will leave a hole in the array
    const index = this.employees.indexOf(employee)
    if (index < 0) {
      throw new Error("Employee not found");
    }
    delete this.employees[index];
  },
  cloneEmployee(employee) {
    // using spread operator to clone employee
    // not the best way to clone an object, only for learning purposes
    const { name, position, division } = { ...employee };
    const newEmployee = new Employee(name, position, division);
    return newEmployee;
  },
  getAllDivisions() {
    const divisions = [];
    for (const employee of this.employees) {
      const { division } = employee;
      if (!divisions.includes(division)) {
        divisions.push(division);
      }
    }
    return divisions;
  },
  mergeDb(newDb) {
    // merge newDb into employeeDb
    // don't add duplicates
    newDb.employees.forEach((employee) => {
      if (!this.employees.some((emp) => Employee.compareEmployee(emp, employee))) {
        this.employees.push(employee);
      }
    });
  }
};


const db1 = {
  __proto__: EmployeeDb,
  employees: [
    new Employee("John Doe", "Developer", "Web"),
    new Employee("Jane Doe", "Manager", "Web"),
  ],
}

const db2 = {
  __proto__: EmployeeDb,
  employees: [
    new Employee("john doe", "Developer", "Web"),
    new Employee("Jane Doe", "Manager", "Web"),
    new Employee("John Smith", "Developer", "Mobile"),
    new Employee("Jane Smith", "Manager", "Mobile"),
    new Employee("Sarah Conor", "Developer", "Mobile"),
  ],
}

console.log('print all employees from db1');
console.log(db1.getAllEmployees());
console.log('===============================\n');

console.log('get one employee and capitalize name');
const employee1 = db2.getEmployeeByName("john doe");
employee1.capitalizeName();
console.log(db2.getAllEmployees());
console.log('===============================\n');

console.log('compare employee from db1 and db2');
const employee2 = db1.getEmployeeByName("Jane Doe");
console.log('are they equal? ', Employee.compareEmployee(employee1, employee2));
console.log('===============================\n');

console.log('delete employee from db1');
db1.deleteEmployee(employee2);
console.log(db1.getAllEmployees());
console.log('===============================\n');

console.log('clone employee from db2 and compare');
const employee3 = db2.getEmployeeByName("John Smith");
const employee4 = db2.cloneEmployee(employee3);
console.log('are they equal? ', Employee.compareEmployee(employee3, employee4));
console.log('===============================\n');

console.log('merge db1 and db2');
db1.mergeDb(db2);
console.log(db1.getAllEmployees());
console.log('===============================\n');