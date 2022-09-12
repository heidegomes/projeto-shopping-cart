require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const param = ('computador');
const url = ('https://api.mercadolibre.com/sites/MLB/search?q=computador')

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada;', async () => {
    await fetchProducts(param);
    expect(fetch).toBeCalledTimes(1);
  });
  it('Teste se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto `computadorSearch`, que já está importado no arquivo.', async () => {
    const teste = await fetchProducts(param);
    expect(teste).toBe(computadorSearch.results);
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento `computador`, a função fetch utiliza o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador`', async () => {
    await fetchProducts(param);
    expect(fetch).toBeCalledWith(url);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    expect(fetchProducts()).rejects.toThrowError('You must provide an url');
  });
});
