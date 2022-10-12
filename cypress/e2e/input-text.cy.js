describe("add Todos", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("input text", () => {
    cy.get(".new-todo")
      .type("write code{enter}")
      .type("write test{enter}")
      .type("deploy{enter}");

    cy.get(".todo").should("have.length", 3);
  });
});
