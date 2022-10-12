describe("add Todos", () => {
  it("input text", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".new-todo")
      .type("write code{enter}")
      .type("write test{enter}")
      .type("deploy{enter}");

    cy.get(".todo").should("have.length", 3);
  });
});
