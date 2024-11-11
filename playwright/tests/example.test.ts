import { test, expect, Page, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // await page.goto('https://demo.playwright.dev/todomvc');
    const url = "https://test.sales.driva.io/"
    // const url = "http://localhost:3000"
    const email = 'user.script@driva.com.br'; 
    const password = 'secret';

    await page.goto(url);
    await page.getByPlaceholder('E-mail').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    // await page.pause()
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  });

test.describe("Filtros", () => {
   
    async function goToFilter(page: Page, filter: string){
        await page.locator('div').filter({ hasText: /^Search$/ }).first().click();
        await page.getByRole('button', { name: filter }).click();
    }

    async function checkNumberOfCompanies(page: Page, value: number){ // func pra isso?
        await expect(page.getByRole('tab', { name: /Social \(/ })).toHaveText(`Social(${value})`, {timeout: 10000 })
    }
        
    test("Filtro - Nome da Empresa", async ({ page }) => {
        test.slow();
    
        const filter = 'Nome da Empresa';
        const dropdown = page.locator('.w-full > button').first();
    
        await goToFilter(page, filter);

        async function searchCompanie(company: string) {
            await page.getByPlaceholder('Digite nome da empresa').click();
            await page.getByPlaceholder('Digite nome da empresa').fill(company);
            await page.getByText(company, { exact: true }).click();
            await expect(page.getByRole('table').getByText(company)).toBeVisible({timeout: 40000})
        }
    
        let company = 'Driva';
        await searchCompanie(company);

        company = 'Loja Vivo';
        await searchCompanie(company);

        await dropdown.click();
        await page.getByPlaceholder('Digite nome da empresa').click();
        await page.getByText('Selecionar Todos', { exact: true }).click();

        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)

        await page.getByRole('button', { name: 'Busca em massa de empresas' }).click();
        await page.getByPlaceholder('Por exemplo:\nEmpresa 1\nEmpresa 2\n...\nou\nEmpresa 1, Empresa 2,').click();
        await page.getByPlaceholder('Por exemplo:\nEmpresa 1\nEmpresa 2\n...\nou\nEmpresa 1, Empresa 2,').fill('Driva\nLoja Vivo, Claro');
        await page.getByRole('button', { name: 'Adicionar' }).click();

        await expect(page.getByRole('table').getByText('Driva',  { exact: true })).toBeVisible({timeout: 40000});
        await expect(page.getByRole('table').getByText('Loja Vivo',  { exact: true })).toBeVisible({timeout: 40000});
        // await expect(page.getByRole('table').getByText('Claro',  { exact: true })).toBeVisible() 

        await page.getByText('Claro').nth(1).click();
        await page.getByText('Driva').nth(2).click();
        await page.getByText('Loja Vivo').nth(1).click();
        await checkNumberOfCompanies(page, 0);
    });

    test("Filtro - Número de Funcionários", async({page}) => {

        test.setTimeout(180000)
        
        const filter = 'Número de Funcionários';
        await goToFilter(page, filter);

        const dropdown = page.locator('.w-full > button').first()
 
        await dropdown.click(); //open
        await page.getByText('-200').click();
        let checkbox = page.getByRole('table').getByText('-200');
        await expect(checkbox.first()).toBeVisible({ timeout: 40000 });

        await page.getByText('501-').click();
        checkbox = page.getByRole('table').getByText('501-');
        await expect(checkbox.first()).toBeVisible({ timeout: 40000 });

        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)

        await dropdown.click(); //open
        await page.getByText('Selecionar Todos', { exact: true }).click();
        checkbox = page.getByRole('table').getByText('10001-');
        await expect(checkbox.first()).toBeVisible({ timeout: 40000 });
        await dropdown.click(); //close
    
        await page.locator('div').filter({ hasText: /^\+ 5$/ }).nth(1).click();
        await page.getByText('0-').nth(2).click();
        await page.getByText('2-').nth(2).click();
        await page.getByText('11-').nth(2).click();
        await page.getByText('-200').nth(2).click();
        await page.getByText('201-').nth(2).click();
        await page.getByText('501-').nth(2).click();
        await page.getByText('-5000').nth(2).click();
        await page.getByText('-10000').nth(2).click();

        await page.getByText('10001-').nth(2).click();
        await checkNumberOfCompanies(page, 0)

        const minDropdown = page.locator('.flex > div > .dropdown > div > .flex > button').first();
        await minDropdown.click();
        await page.getByText('1', { exact: true }).first().click();
        await expect(page.getByRole('cell', { name: 'Funcionários' })).toBeVisible({timeout: 40000});
        

        await page.locator('.badge > .pl-1').click();
        await checkNumberOfCompanies(page, 0);

        const maxDropdown = page.locator('div:nth-child(2) > .dropdown > div > .flex > button');
        await maxDropdown.click();
        await page.getByText('51', { exact: true }).click();

        await expect(page.getByRole('cell', { name: 'Funcionários' })).toBeVisible({timeout: 40000});

        await page.locator('.badge > .pl-1').click();
        await checkNumberOfCompanies(page, 0);

        await minDropdown.click();
        await page.getByText('1', { exact: true }).first().click();
        await maxDropdown.click();
        await page.getByText('51', { exact: true }).click();
        await expect(page.getByRole('cell', { name: 'Funcionários' })).toBeVisible({timeout: 20000});
        await page.locator('.badge > .pl-1').click();
        await checkNumberOfCompanies(page, 0);
    })

    test("Filtro - Segmento", async({page}) => {
        test.setTimeout(180000)
        
        const filter = 'Segmento';
        await goToFilter(page, filter);

        const dropdown = page.locator('.w-full > button').first()
        await dropdown.click();

        await page.locator('li').filter({ hasText: 'Construção (2)' }).getByRole('button').click();
        await expect(page.locator('td:nth-child(4) > .flex > div').first()).toHaveText('Construção',{timeout: 40000 });

        await dropdown.click();

        await page.locator('span').filter({ hasText: /^Construção$/ }).nth(1).click();
        await page.locator('span').filter({ hasText: 'Arquitetura, Engenha...' }).nth(1).click();
        await page.locator('span').filter({ hasText: 'Construção Civil, Co...' }).nth(1).click();
        await checkNumberOfCompanies(page, 0);

        await dropdown.click();
        await page.getByText('Selecionar Todos', { exact: true }).click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 20000});

        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)
    })

    test("Filtro - Faturamento", async({page}) =>{
        test.slow();

        const filter = 'Faturamento';
        const dropdown = page.locator('.w-full > button').first();
    
        await goToFilter(page, filter);

        await page.getByPlaceholder('Min').click();
        await page.getByText('1', { exact: true }).first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        await page.locator('span').filter({ hasText: 'ou acima' }).nth(1).click();
        await checkNumberOfCompanies(page, 0)
        
        await page.getByPlaceholder('Máx').click();
        await page.getByText('11', { exact: true }).first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        await page.locator('span').filter({ hasText: 'Até' }).nth(1).click();
        await checkNumberOfCompanies(page, 0)

        await page.getByPlaceholder('Min').click();
        await page.getByPlaceholder('Min').fill('5');
        await page.getByRole('button', { name: 'Pesquisa por "5"' }).click();

        await page.getByPlaceholder('Máx').click();
        await page.getByPlaceholder('Máx').fill('50');
        await page.getByRole('button', { name: 'Pesquisa por "50"' }).click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});

        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)
    }) 

    test("Filtro - Localização", async({page}) => {

        test.setTimeout(180000)
        
        const filter = 'Localização';
        await goToFilter(page, filter);
        
        const dropdownEstado = page.locator('.w-full > button').first()
        const dropdownCidade = page.locator('div:nth-child(4) > div > div > div > .dropdown > div > div > button')

        dropdownEstado.click();
        await page.getByPlaceholder('Digite estado').click();
        await page.getByPlaceholder('Digite estado').fill('AC');
        await page.locator('li').filter({ hasText: /^AC$/ }).getByRole('button').click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});

        await dropdownEstado.click();
        await page.locator('p').filter({ hasText: 'AC' }).nth(3).click();
        await checkNumberOfCompanies(page, 0);

        dropdownEstado.click();
        await page.locator('div').filter({ hasText: /^Selecionar Todos$/ }).first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});

        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)
        
        await dropdownCidade.click();
        await page.getByPlaceholder('Digite município').click();
        await page.getByPlaceholder('Digite município').fill('Pinhais');
        await page.locator('li').filter({ hasText: /^Pinhais$/ }).getByRole('button').click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        
        await dropdownCidade.click();
        await page.locator('p').filter({ hasText: 'Pinhais' }).nth(1).click();
        await checkNumberOfCompanies(page, 0);

        await dropdownCidade.click();
        await page.getByPlaceholder('Digite município').click();
        await page.getByPlaceholder('Digite município').fill('Ponta grossa');
        await page.getByRole('button', { name: 'Pesquisa por "Ponta grossa"' }).click() // talvez tirar
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
                
        await dropdownCidade.click();
        await page.locator('p').filter({ hasText: 'Ponta grossa' }).nth(1).click();
        await checkNumberOfCompanies(page, 0);

        await dropdownEstado.click();
        await page.locator('li').filter({ hasText: /^AC$/ }).getByRole('button').click();
        await dropdownEstado.click();

        await page.getByPlaceholder('Digite município').click();
        await page.getByPlaceholder('Digite município').fill('Rio Branco');
        await page.locator('li').filter({ hasText: /^Rio branco$/ }).getByRole('button').click();
        
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)
    })

    test("Filtro - Redes Sociais", async({page}) =>{
        test.slow();

        const filter = 'Redes Sociais';
        await goToFilter(page, filter);
        await page.pause();
        await page.locator('.flex > .h-4').first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        await page.locator('span').filter({ hasText: 'Facebook' }).nth(1).click();
        await checkNumberOfCompanies(page, 0)

        await page.locator('div:nth-child(2) > .h-4').first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        await page.locator('span').filter({ hasText: 'Twitter' }).nth(1).click();
        await checkNumberOfCompanies(page, 0)

        await page.locator('div:nth-child(3) > .h-4').first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});
        await page.locator('span').filter({ hasText: 'Instagram' }).nth(1).click();
        await checkNumberOfCompanies(page, 0)

        await page.locator('.flex > .h-4').first().click();
        await page.locator('div:nth-child(2) > .h-4').first().click();
        await page.locator('div:nth-child(3) > .h-4').first().click();
        await expect(page.getByRole('cell', { name: 'Segmento' })).toBeVisible({timeout: 40000});

        await page.getByRole('button', { name: /Clear All/i }).click();
        await checkNumberOfCompanies(page, 0)
    })
});

