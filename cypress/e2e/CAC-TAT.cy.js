describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {  //antes do início de cada teste, esse bloco será executado
    cy.visit('./src/index.html')  //caminho da página local do projeto
    cy.viewport(410, 860)  //redimensionando o navegador
  })

  it('verifica o título da aplicação', () => {    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () =>{   //o "only" serve para indicar que queremos que execute "somente" aquele teste específico
    cy.get('#firstName').type('Paulo Henrique')  //quando tem # é porque o elemento é um id
    cy.get('#lastName').type('Oliveira da Cruz')
    cy.get('#email').type('pauloh.2903@gmail.com')
    cy.get('#open-text-area').type('Obrigado pela MANUELLA!!!')
    cy.contains('button', 'Enviar').click() 

    cy.get('.success').should('be.visible')
  })



it('preenche os campos para treinar', () =>{
  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)  //repeat -> para repetir quantas vezes indicarmos. nesse caso 10

  cy.get('#firstName').type('Manuella França')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella@gmail.com')
  cy.get('#open-text-area').type(longText, { delay:0 })  //parâmetro para tirar os 10 milisegundos de digitação default
  cy.contains('button', 'Enviar').click() 

  cy.get('.success').should('be.visible')
  })


it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
  cy.get('#firstName').type('Manuella França')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella.gmail.zzz')  //e-mail inválido
  cy.get('#open-text-area').type('Princesinha linda do papai !!!')
  cy.contains('button', 'Enviar').click() 

  cy.get('.error').should('be.visible')
  })  


  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () =>{
    cy.get('#phone')
      .type('aaaaaaaa')
      .should('have.value', '') //verifica se o campo ficou vazio como mostra nas aspas simples. 
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () =>{
    cy.get('#firstName').type('Paulo Henrique')
    cy.get('#lastName').type('Cruz')
    cy.get('#email').type('manuella@gmail.com')
    cy.get('#open-text-area').type('Manuella, a Princesinha linda do papai !!!')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click() 
  
    cy.get('.error').should('be.visible')
  })

  
  /* Exercício extra 5
Uma funcionalidade que pode ser usada em conjunto com comando o .type(), é o .clear(), o qual limpa um campo, para posterior digitação, por exemplo.
Portanto, crie um teste chamado preenche e limpa os campos nome, sobrenome, email e telefone
Tal teste deve verificar o valor (value) após a digitação (.type(...).should('have.value', 'valor-aqui')) e após a limpeza do campo (.clear().should('have.value', ''))*/
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName')
      .type('Manuella França')
      .should('have.value', 'Manuella França')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Cruz')
      .should('have.value', 'Cruz')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('manuella@gmail.com')      
      .should('have.value', 'manuella@gmail.com')
      .clear()
      .should('have.value', '') 

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '') 
    
      cy.contains('button', 'Enviar').click()   
    }) 

    /*Exercício extra 6
      Crie um novo teste chamado exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.
      O teste deve simplesmente acessar a aplicação e clicar no botão Enviar
      Tal teste deve verificar que uma mensagem é exibida em um elemento com a classe error*/
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{       
      cy.contains('button', 'Enviar').click()   
      cy.get('.error').should('be.visible') 
      }) 



  /* Exercício extra 7 - "Comandos customizados"
No mundo de testes automatizados com Cypress, podemos fazer uso de comandos customizados para evitar duplicação de código.
Criar um teste chamado envia o formuário com sucesso usando um comando customizado
Tal teste deve fazer uso de um comando chamado fillMandatoryFieldsAndSubmit, o qual deve ser implementado no arquivo cypress/support/commands.js
👨‍🏫 Sugiro que você experimente diferentes implementações para o mesmo comando (por exemplo, um comando que não recebe nenhum argumento; um comando que recebe um objeto como argumento; um comando que recebe um objeto como argumento, com valores padrão).
Deve haver a verificação de que a mensagem de sucesso é exibida*/
it('envia o formuário com sucesso usando um comando customizado', () => { 
  const data = {
    firstName: 'Paulo Henrique',
    lastName: 'Oliveira da Cruz',
    email: 'paulohenrique@gmail.com',
    text: 'Teste.'
  }  

  cy.fillMandatoryFieldsAndSubmit(data)
  
  cy.get('.success').should('be.visible')   
  }) 


it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')  // a validação não foi por texto mas foi por value
})

it('seleciona um produto (Mentoria) por seu valor', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')  
})

it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
    .select(1)  //índice 1 igual a "Blog"
    .should('have.value', 'blog')  
})

it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')    
})

/*Exercício extra
Crie um teste chamado marca cada tipo de atendimento
Faça a verificação de que após o .check(), cada radio foi marcado (.should('be.checked'))*/
it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"][value="ajuda"]')
  .check()
  .should('be.checked') 

  cy.get('input[type="radio"][value="elogio"]')
  .check()
  .should('be.checked') 

  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')  
       
})

/*Exercício
Crie um teste chamado marca ambos checkboxes, depois desmarca o último
O teste deve possuir verificações de que ambos checkboxes foram marcados, e depois, que o último (.last()) foi desmarcado */
it('marca ambos checkboxes, depois desmarca o último', () =>{
  cy.get('#email-checkbox')
    .check()
    .should('be.checked')

    cy.get('#phone-checkbox')
    .check()
    .should('be.checked')
    .uncheck()
    .should('not.be.checked')

    /* outra forma de se fazer */
    cy.get('input[type="checkbox"]') //dessa forma mais genérica se refere a todos os checks que existirem na página
    .check()
    .should('be.checked')
    .last()  //referencia o último check
    .uncheck()  //desmarca
    .should('not.be.checked')
})

/*=======================================
Fazendo upload de arquivos com Cypress
/*=======================================*/

/*Crie um teste chamado seleciona um arquivo simulando um drag-and-drop
Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input*/

it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('#firstName').type('Paulo Henrique')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella@gmail.com')
  cy.get('#open-text-area').type('Testando upload de arquivos.') 
  cy.get('#file-upload') 
    .selectFile('cypress/fixtures/example.json') //referência do projeto local
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json') //verificação do arquivo 
    })       
})

/*Exercício extra 1
Crie um teste chamado seleciona um arquivo simulando um drag-and-drop
Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input */
it('seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('#firstName').type('Paulo Henrique')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella@gmail.com')
  cy.get('#open-text-area').type('Testando upload de arquivos.') 
  cy.get('#file-upload') 
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //drag-drop = abre uma pasta e clica e arrasta o arquivo para upload
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json') //verificação do arquivo 
    }) 
})

/*Exercício extra 2
Crie um teste chamado seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de files do input*/
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.get('#firstName').type('Paulo Henrique')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella@gmail.com')
  cy.get('#open-text-area').type('Testando upload de arquivos.') 

  cy.fixture('example.json').as('sampleFile') //quando usamos cy.fixture, não precisa passar o caminho como feito anteriormente. o Cypress já mapeia
  cy.get('#file-upload') 
    .selectFile('@sampleFile', {action: 'drag-drop'}) //passando o alias contendo o caminho relativo  
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json') //verificação do arquivo 
    }) 
})

/*=======================================
Lidando com links que abrem em outra aba
/*=======================================*/

/*Exercício
Crie um teste chamado verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
Tal teste deve utilizar a alternativa 1 demonstrada acima*/
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.get('#firstName').type('Paulo Henrique')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella@gmail.com')
  cy.get('#open-text-area').type('Testando abertura de links em outra aba.') 

  cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html') //verifica se tem o atributo href com o valor 'privacy.html'
    .and('have.attr', 'target', '_blank')  //verifica se tem o atributo target com o valor '_blank' que faz abrir em uma nova aba
    //o ".and" foi usado para não ficar repetindo o .should
})

/*Exercício extra 1
Crie um testes chamado acessa a página da política de privacidade removendo o target e então clicando no link
Tal teste deve utilizar a alternativa 2 demonstrada acima*/
it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.get('#firstName').type('Paulo Henrique')
  cy.get('#lastName').type('Cruz')
  cy.get('#email').type('manuella@gmail.com')
  cy.get('#open-text-area').type('Testando abertura de links em outra aba.') 

  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target') //remove o target="_blank", que leva para uma nova aba
    .click()
    
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
})

})