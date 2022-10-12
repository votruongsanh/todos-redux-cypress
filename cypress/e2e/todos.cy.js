//setup these constants to match what TodoMVC does
const TODO_ITEM_ONE = "buy some cheese";
const TODO_ITEM_TWO = "feed the cat";
const TODO_ITEM_THREE = "book a doctors appoiment";
//if you need 3 todos created instantly on load
const initialState = [
  {
    id: 0,
    text: TODO_ITEM_ONE,
    completed: false,
  },
  {
    id: 1,
    text: TODO_ITEM_TWO,
    completed: false,
  },
  {
    id: 2,
    text: TODO_ITEM_THREE,
    completed: false,
  },
];

describe("TodoMVC - React", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("add 2 todo", () => {
    cy.get(".new-todo").type("learn testing{enter}").type("be cool{enter}");
    cy.get(".todo-list li").should("have.length", 2);
  });

  context("When page is initially opened", () => {
    it("should focus on the todo input field", () => {
      cy.focused().should("have.class", "new-todo");
    });
  });

  context("No todos", () => {
    it("should hide #main and # footer", () => {
      cy.get(".todo-list li").should("not.exist");
      cy.get(".footer").should("not.exist");
    });
  });

  context("New todo", () => {
    it("should allow me to add todo items", () => {
      //create 1st todo
      cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
      //make sure the 1st label contains the 1st todo text
      cy.get(".todo-list li")
        .eq(0)
        .find("label")
        .should("contain", TODO_ITEM_ONE);
      //create 2nd todo
      cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
      //make sure the 2nd label contains the 2nd todo text
      cy.get(".todo-list li")
        .eq(1)
        .find("label")
        .should("contain", TODO_ITEM_TWO);
    });

    it("Add items", () => {
      cy.get(".new-todo")
        .type("todo A{enter}")
        .type("todo B{enter}")
        .type("todo C{enter}")
        .type("todo D{enter}");
      cy.get(".todo-list li").should("have.length", 4);
    });

    it("should clear text input field when item is added", () => {
      cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
      cy.get(".new-todo").should("have.text", "");
    });

    it("should append new items to the bottom of the list", () => {
      //this is ab example of a custom command
      // defined in cypress/support/command.js
      cy.createDefaultTodos().as("todos");

      cy.get(".todo-count").contains("3 items left");

      cy.get("@todos").eq(0).find("label").should("contain", TODO_ITEM_ONE);
      cy.get("@todos").eq(1).find("label").should("contain", TODO_ITEM_TWO);
      cy.get("@todos").eq(2).find("label").should("contain", TODO_ITEM_THREE);
    });

    it("should trim text input", () => {
      //this is ab example of a custom command
      // defined in cypress/support/command.js
      // since we repeat the todo creation over and over again.
      cy.createTodo(`${TODO_ITEM_ONE}`);

      cy.get(".todo-list li").eq(0).should("have.text", TODO_ITEM_ONE);
    });

    it("should show #main and #footer when items added", () => {
      cy.createTodo(TODO_ITEM_ONE);
      cy.get(".main").should("be.visible");
      cy.get(".footer").should("be.visible");
    });

    it("does noting without entered text", () => {
      cy.get(".new-todo").type("{enter}");
    });
  });

  context("Item", () => {
    it("should allow me to mark items as completed", () => {
      cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
      cy.createTodo(TODO_ITEM_TWO).as("secondTodo");

      cy.get("@firstTodo").find(".toggle").check();
      cy.get("@firstTodo").should("have.class", "completed");

      cy.get("@secondTodo").should("not.have.class", "completed");
      cy.get("@secondTodo").find(".toggle").check();

      cy.get("@firstTodo").should("have.class", "completed");
      cy.get("@secondTodo").should("have.class", "completed");
    });

    it("should allow me to un-mark items as complete", () => {
      cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
      cy.createTodo(TODO_ITEM_TWO).as("secondTodo");

      cy.get("@firstTodo").find(".toggle").check();
      cy.get("@firstTodo").should("have.class", "completed");
      cy.get("@secondTodo").should("not.have.class", "completed");

      cy.get("@firstTodo").find(".toggle").uncheck();
      cy.get("@firstTodo").should("not.have.class", "completed");
      cy.get("@secondTodo").should("not.have.class", "completed");
    });

    it("show allow me to edit an item", () => {
      const secondTodo = "buy some sausages";

      cy.createDefaultTodos().as("todos");

      cy.get("@todos").eq(1).as("secondTodo").find("label").dblclick();
      //clear out the inputs current value and type a new value
      cy.get("@secondTodo")
        .find(".edit")
        .clear()
        .type(secondTodo)
        .type("{enter}");

      cy.get("@todos").eq(0).should("contain", TODO_ITEM_ONE);
      cy.get("@secondTodo").should("contain", secondTodo);
      cy.get("@todos").eq(2).should("contain", TODO_ITEM_THREE);
    });

    it("should delete item", () => {
      cy.createDefaultTodos().as("todos");
      //the destroy element onle becomes visible on hover
      cy.get("@todos").eq(1).find(".destroy").click({ force: true });

      cy.get("@todos").should("have.length", 2);
      cy.get("@todos").eq(0).should("contain", TODO_ITEM_ONE);
      cy.get("@todos").eq(1).should("contain", TODO_ITEM_THREE);
    });
  });

  context("Counter", () => {
    it("should display the current number of todo items", () => {
      cy.createTodo(TODO_ITEM_ONE);
      cy.get(".todo-count").contains("1 item left");
      cy.createTodo(TODO_ITEM_TWO);
      cy.get(".todo-count").contains("2 items left");
    });
  });
});

context("Mark all as completed", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.get(".todo").as("todos");
  });
  //new command used here
  // const completeAll = () => {
  //   //complete all todos
  //   cy.get("[data-cy-toggle-all]").click({ force: true });
  // };

  it.only("should allow me to mark all items as completed", () => {
    // cy.get("[data-cy-toggle-all]").click({ force: true });
  });
});
