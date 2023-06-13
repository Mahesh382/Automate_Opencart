describe('Auomate Opencart',()=>{
     it('Mouse Operations, Mouse Hover', ()=>{
    cy.visit("https://demo.opencart.com/")
    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
    .should('not.be.visible')
    cy.get('.nav > :nth-child(1) > .dropdown-toggle').trigger('mouseover').click()
    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
    .should('be.visible')
    
  })
  it('Handle table, Check Number of rows and columns',()=>{
    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 


    cy.get("table[class='table table-bordered table-hover']>tbody>tr").should('have.length','10')
    cy.get("table[class='table table-bordered table-hover']>thead>tr>td").should('have.length','7')
})

it('Handle table, Check cell data from specific  rows and columns',()=>{

    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 

    cy.get("table[class='table table-bordered table-hover']>tbody>tr:nth-child(5)>td:nth-child(3)")
    .contains('xvrt@test.com')
  
})

it('Handle table, Read all rows and columns data in the first page',()=>{

    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 

    cy.get("table[class='table table-bordered table-hover']>tbody>tr")
    .each( ($row, index, $rows)=>{
        cy.wrap($row).within( ()=>{
            cy.get("td").each( ($col, index, $cols)=>{
                cy.log($col.text())
            })
        })
    })
    
})


it('Handle table, pagination', ()=>{
    //find total number of pages

    /*
    let totalPages;
    cy.get(".col-sm-6.text-end").then( (e)=>{
        let mytext=e.text(); //showing 1 to 10 of 13305
    })
    */


    cy.visit("https://demo.opencart.com/admin/index.php")
    cy.get('#input-username').type('demo')
    cy.get('#input-password').type('demo')
    cy.get("button[type='submit']").click()

    cy.get(".btn-close").click()

    //Customers --> Customers
    cy.get("#menu-customer>a").click();  //customer main menu
    cy.get("#menu-customer>ul>li:first-child").click(); 


   let totalPages=5;
   for(let p=1; p<=totalPages;p++)
   {
    if(totalPages>1)
    {
        cy.log("Active Page is=="+p);
        cy.get("ul[class='pagination']>li:nth-child("+p+")").click()
        cy.wait(3000)

        cy.get("table[class='table table-bordered table-hover']>tbody>tr")
        .each( ($row,index,$rows)=>{
            cy.wrap($row).within( ()=>{
                cy.get('td:nth-child(3)').then( (e)=>{
                    cy.log(e.text()); 
                })
            })
        })
    }
   }
})
  it('Mouse Operations, Mouse Hover', ()=>{
    cy.visit("https://demo.opencart.com/")
    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
    .should('not.be.visible')
    cy.get('.nav > :nth-child(1) > .dropdown-toggle').trigger('mouseover').click()
    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
    .should('be.visible')
})

})