require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const param = ('computador');
const url = ('https://api.mercadolibre.com/sites/MLB/search?q=computador')

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Executa a função fetchProducts com o argumento computador e testa se fetch foi chamada;', async () => {
    await fetchProducts(param);
    expect(fetch).toBeCalledTimes(1);
  });
  it('Testa se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto `computadorSearch`.', async () => {
    const teste = await fetchProducts(param);
    expect(teste).toBe(computadorSearch.results);
  });
  it('Testa se, ao chamar a função fetchProducts com o argumento `computador`, a função fetch utiliza o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador`', async () => {
    await fetchProducts(param);
    expect(fetch).toBeCalledWith(url);
  });
  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    expect(fetchProducts()).rejects.toThrowError('You must provide an url');
  });
});
