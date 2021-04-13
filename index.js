function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(obj, timestamp) {
    const DateTime = timestamp.split(' ')
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(DateTime[1]),
        date: DateTime[0]
    });
    return obj;
};

function createTimeOutEvent(employee, timestamp) {
    const DateTime = timestamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(DateTime[1]),
        date: DateTime[0]
    });
    return employee;
};

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(dayWorked => dayWorked.date === date);
    const timeOut = employee.timeOutEvents.find(dayWorked => dayWorked.date === date);

    return parseInt( (timeOut.hour - timeIn.hour) / 100 )
};

function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
};

function allWagesFor(employee) {
    const daysWorked = employee.timeInEvents.map(time => time.date);

    return daysWorked.reduce( (a, date) => {
        return a + wagesEarnedOnDate(employee, date)
    }, 0);
};

function calculatePayroll(arr) {
  return arr.reduce((acc, employee) => {
    return acc + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(employees, employee) {
    return employees.find(emp => emp.firstName === employee)
}