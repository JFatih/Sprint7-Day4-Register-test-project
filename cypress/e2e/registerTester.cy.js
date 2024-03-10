import { errorMessages } from "../../src/components/Register";

describe("Hata mesajları doğru görünüyor mu", () => {
  it("Ad için 3 karakterden az olduğunda hata mesajı çıkıyor mu", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-ad']").type("fa");
    cy.contains(errorMessages.ad);
  });
  it("Soyad için 3 karakterden az olduğunda hata mesajı çıkıyor mu", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-soyad']").type("ca");
    cy.contains(errorMessages.soyad);
  });
  it("email formu doğru format mı", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-email']").type("emre@wit.");
    cy.contains(errorMessages.email);
  });
  it("Password formu doğru format mı", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-password']").type("123456Ff");
    cy.contains(errorMessages.password);
  });
});
describe("Doğru formatta hata mesajı çıkıyormu", () => {
  it("Ad için 3 karakterden az olduğunda hata mesajı çıkıyor mu", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-ad']").type("fatih");
    cy.contains(errorMessages.ad, { matchCase: false });
  });
  it("Soyad için 3 karakterden az olduğunda hata mesajı çıkıyor mu", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-soyad']").type("cakmak");
    cy.contains(errorMessages.soyad, { matchCase: false });
  });
  it("email formu doğru format mı", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-email']").type("emre@wit.com");
    cy.contains(errorMessages.email, { matchCase: false });
  });
  it("Password formu doğru format mı", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-password']").type("123456Ff*");
    cy.contains(errorMessages.password, { matchCase: false });
  });
});
describe("Button disabled mı", () => {
  it("Girilen bilgiler yok yada yanlışsa Buton disable mı", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-email']").type("emre@wit.");
    cy.get("[data-cy='submit-button']").should("be.disabled");
  });
});
describe("Button enabled mı", () => {
  it("Girilen bilgiler doğru ise Buton enabled mı", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-ad']").type("fatih");
    cy.get("[data-cy='input-soyad']").type("cakmak");
    cy.get("[data-cy='input-email']").type("emre@wit.com");
    cy.get("[data-cy='input-password']").type("123456Ff*");
    cy.get("[data-cy='submit-button']").should("be.enabled");
  });
});
describe("Id geliyormu", () => {
  it("Kayıt ol bastıktan sonra id geliyormu", () => {
    cy.visit("http://localhost:5173/");
    cy.get("[data-cy='input-ad']").type("fatih");
    cy.get("[data-cy='input-soyad']").type("cakmak");
    cy.get("[data-cy='input-email']").type("emre@wit.com");
    cy.get("[data-cy='input-password']").type("123456Ff*");
    cy.get("[data-cy='submit-button']").click();
    cy.get("[data-cy='response-id']").should("be.visible");
  });
});
