describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Cristhian',
      username: 'cris0987',
      password: '15975369'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#user-name').type('aaa');
      cy.get('#password').type('1597sdsa5369');
      cy.get('#login-btn').click();
      cy.get('#error-message').should(
        'have.css',
        'border',
        '2px solid rgb(255, 0, 0)'
      );
    });
    it('succeeds with correct credentials', function () {
      cy.get('#user-name').type('cris0987');
      cy.get('#password').type('15975369');
      cy.get('#login-btn').click();
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cris0987', password: '15975369' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('WTF IS CYPRESS');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('long url here');
      cy.get('#create-btn').click();
      cy.get('#success-message').should(
        'have.css',
        'border',
        '2px solid rgb(0, 128, 0)'
      );
    });
  });
  describe('Blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'cris0987', password: '15975369' });
      cy.createBlog({
        author: 'another note cypress',
        title: 'aaaaaaa',
        url: 'lolololol'
      });
    });

    it('it can be liked', function () {
      cy.contains('show').click();
      cy.get('#likes').contains('0');
      cy.get('.like-handler').click();
      cy.get('#likes').contains('1');
    });

    it('it can be deleted', function () {
      cy.contains('show').click();
      cy.get('.delete-handler').click();
      cy.get('#blogs-list').children().should('have.length', '0');
    });

    describe('several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'aa note cypresdss',
          title: 'aaaaaaa',
          url: 'lolololol'
        });
        cy.createBlog({
          author: 'another notdase cypress',
          title: 'aaaadsdsaaa',
          url: 'lololdsdsolol'
        });
        cy.createBlog({
          author: 'another note cypress',
          title: 'aaaaaaaaaa',
          url: 'lolololol'
        });
      });

      it('have several notes', function () {
        cy.get('#blogs-list')
          .children()
          .should(($p) => {
            expect($p.length).to.be.greaterThan(3);
          });
      });

      it.only('are sorted by likes', function () {
        cy.get('button.visibility-toggler').click({ multiple: true });
        cy.get('.like-handler').then(($c) => {
          $c[3].click();
        });
        cy.get('#blogs-list')
          .children()
          .find('#likes')
          .wait(500)
          .then(($c) => {
            const likes = $c
              .map((_, html) => Cypress.$(html).text().replace('like', ''))
              .get();
            const sortedLikes = Cypress._.sortBy(likes);
            expect(likes, 'cells are sorted 📈').to.deep.equal(sortedLikes);
          });
      });
    });
  });
});
