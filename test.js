/// <reference path="typings/mocha/mocha.d.ts"/>

var assert = require("assert");

describe("Functional Programming Workshop", function () {
  describe("Pure Functions", function () {
    it("Retorne os dias do mês", function () {
      // impure
      var daysThisMonth = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var start = new Date(year, month, 1);
        var end = new Date(year, month + 1, 1);
        return Math.round((end - start) / (1000 * 60 * 60 * 24));
      };

      // pure
      var daysInMonth = function (year, month) {
        var start = new Date(year, month - 1, 1);
        var end = new Date(year, month, 1);
        return Math.round((end - start) / (1000 * 60 * 60 * 24));
      };

      assert.equal(daysThisMonth(), daysInMonth(2016, 3));
    });

    it("returns the increment", function () {
      var counter = 0;

      // impure
      var increment = function () {
        counter = counter + 1;
        return counter;
      };

      // pure
      var increment = function (counter) {
        return counter + 1;
      };

      assert.equal(increment(counter), counter + 1);
    });

    it("Retorne o quadrado", function () {
      var x = 10;

      // impure
      var square = function () {
        x = x * 2;
        return x;
      };

      // pure
      var square = function (x) {
        x = 10;
        return x * 2;
      };

      assert.equal(square(x), x * 2);
    });
  });

  describe("Map", function () {
    it("Retorne as raízes quadradas dos números", function () {
      var numbers = [1, 4, 9];

      var roots = numbers.map(function (number) {
        return Math.sqrt(number);
      });

      // or like this:
      var roots = numbers.map(Math.sqrt);

      assert.deepEqual(roots, [1, 2, 3]);
    });

    it("Retorne o array das notas", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var grades = students.map(({ grade }) => {
        return grade;
      });

      assert.deepEqual(grades, [6, 4, 9]);
    });

    it("Retorne o array dos nomes", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var animals = [{ name: "Panda" }, { name: "Elephant" }, { name: "Dog" }];

      var byNames = (array) => {
        return array.map(({ name }) => {
          return name;
        });
      };

      assert.deepEqual(byNames(students), ["Anna", "John", "Maria"]);
      assert.deepEqual(byNames(animals), ["Panda", "Elephant", "Dog"]);
    });
  });

  describe("Filter", function () {
    it("Retorne os números maiores que 4", function () {
      var numbers = [1, 4, 9];

      var filteredNumbers = numbers.filter(function (number) {
        return number > 4;
      });

      assert.deepEqual(filteredNumbers, [9]);
    });

    it("Retorne os alunos com nota maior ou igual a 6", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var filterApprovedStudents = students.filter(({ grade }) => grade >= 6);

      assert.deepEqual(filterApprovedStudents, [
        { name: "Anna", grade: 6 },
        { name: "Maria", grade: 9 },
      ]);
    });
  });

  describe("Map + Filter", function () {
    it("Retorne os nomes dos alunos com nota maior ou igual a 6", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var filterApprovedStudentsByName = students
        .filter(({ grade }) => grade >= 6)
        .map(({ name }) => name);

      assert.deepEqual(filterApprovedStudentsByName, ["Anna", "Maria"]);
    });
  });

  describe("Reduce", function () {
    it("Retorne a soma total", function () {
      var numbers = [1, 2, 3, 4];

      var sum = numbers.reduce(function (acc, current) {
        return acc + current;
      }, 0);

      assert.equal(sum, 10);
    });

    it("Retorne os nomes combinados", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var combinedNames = students.reduce((acc, current) => {
        return acc + current.name;
      }, "");

      assert.equal(combinedNames, "AnnaJohnMaria");
    });

    it("Retorne os números pares", function () {
      var numbers = [1, 2, 3, 4];

      var evenNumbers = numbers.reduce((acc, current) => {
        if (current % 2 === 0) {
          acc.push(current);
        }
        return acc;
      }, []);

      assert.deepEqual(evenNumbers, [2, 4]);
    });
  });

  describe("Map + Reduce", function () {
    it("Retorne a soma total das notas", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var totalSumOfTheGrades = students
        .map(({ grade }) => grade)
        .reduce((acc, current) => {
          return (grade = acc + current);
        }, 0);

      assert.equal(totalSumOfTheGrades, 19);
    });
  });

  describe("Higher Order Functions", function () {
    it("Retorne os alunos filtrados", function () {
      var students = [
        { name: "Anna", grade: 6 },
        { name: "John", grade: 4 },
        { name: "Maria", grade: 9 },
      ];

      var filterGrade = function (student) {
        return student.grade > 6;
      };

      var filteredStudents = students.filter(filterGrade);

      assert.deepEqual(filteredStudents, [{ name: "Maria", grade: 9 }]);
    });

    it("Retorne o cálculo", function () {
      var sum = function (x, y) {
        return x + y;
      };

      var mult = function (x, y) {
        return x * y;
      };

      var calculate = function (operation, x, y) {
        return operation(x, y);
      };

      assert.equal(calculate(sum, 10, 2), 12);
      assert.equal(calculate(mult, 10, 2), 20);
    });
  });

  describe("Currying", function () {
    it("Retorne a saudação", function () {
      var greet = function (greeting) {
        return function (name) {
          return greeting + " " + name;
        };
      };

      var greetHello = greet("Hello");

      assert.equal(greetHello("Matheus"), "Hello Matheus");
    });

    it("Retorne a soma", function () {
      // impure
      var sum = function (num1) {
        return function (num2) {
          return num1 + num2;
        };
      };

      // pure
      var sum = (num1) => (num2) => num1 + num2;

      assert.equal(sum(2)(3), 5);
    });

    it("Retorne o volume", function () {
      // impure
      var volume = function (num1) {
        return function (num2) {
          return function (num3) {
            return (num1 + num2 + num3) * 4;
          };
        };
      };

      // pure
      var volume = (num1) => (num2) => (num3) => (num1 + num2 + num3) * 4;

      assert.equal(volume(2)(3)(10), 60);
    });

    it("Retorne o objeto", function () {
      // impure
      var student = function (firstName) {
        return function (lastName) {
          return function (age) {
            return {
              firstName: firstName,
              lastName: lastName,
              age: age,
            };
          };
        };
      };

      // pure
      var student = (firstName) => (lastName) => (age) => {
        return {
          firstName: firstName,
          lastName: lastName,
          age: age,
        };
      };

      assert.deepEqual(student("Matheus")("Lima")(26), {
        firstName: "Matheus",
        lastName: "Lima",
        age: 26,
      });
    });
  });

  describe("Compose", function () {
    it("Retorne a string invertida de minúscula para maiúscula", function () {
      var compose = function (f, g) {
        return function (x) {
          return f(g(x));
        };
      };

      var reverse = function (x) {
        return x.split("").reverse().join("");
      };

      var toUpperCase = function (x) {
        return x.toUpperCase();
      };

      var reversedUpperCase = compose(reverse, toUpperCase);

      assert.equal(reversedUpperCase("hello"), "OLLEH");
    });

    it('Retorne a string de minúscula para maiúscula e com "!!!" no final', function () {
      var compose = function (f, g) {
        return function (x) {
          return f(g(x));
        };
      };

      var toUpperCase = function (x) {
        return x.toUpperCase();
      };

      var concat = function (x) {
        return x + "!!!";
      };

      var angry = compose(toUpperCase, concat);

      assert.equal(angry("hello"), "HELLO!!!");
    });

    it("Retorne o número de palavras", function () {
      var compose = function (f, g) {
        return function (x) {
          return f(g(x));
        };
      };

      var split = function (x) {
        return x.split(" ");
      };

      var length = function (x) {
        return x.length;
      };

      var numberOfWords = compose(length, split);

      assert.deepEqual(numberOfWords("hello my friend"), 3);
    });

    it('Retorne a string invertida de minúscula para maiúscula e com "!!!" no final', function () {
      var compose = function (f, g) {
        return function (x) {
          return f(g(x));
        };
      };

      var toUpperCase = function (x) {
        return "!!!" + x.toUpperCase();
      };

      var reverse = function (x) {
        return x.split("").reverse().join("");
      };

      var angryReversed = compose(toUpperCase, reverse);

      assert.equal(angryReversed("hello"), "!!!OLLEH");
    });
  });
});
