/*Exercício extra 2 - Desafio
Crie um testes chamado testa a página da política de privacidade de forma independente
Use sua criativade e as funcionalidades que aprendeu até aqui para realizar este teste (a solução é mais simples do que você imagina)*/
it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')  //caminho para abrir direto a página de política de privacidade
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
  })