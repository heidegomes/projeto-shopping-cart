require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const param = ('MLB1615760527');
const url = ('https://api.mercadolibre.com/items/MLB1615760527');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Executa a função fetchItem com o argumento do item `MLB1615760527` e testa se fetch foi chamada', async () => {
    await fetchItem(param);
    expect(fetch).toBeCalledTimes(1);
  });
  it('Testa se, ao chamar a função fetchItem com o argumento do item `MLB1615760527`, a função fetch utiliza o endpoint `https://api.mercadolibre.com/items/MLB1615760527`', async () => {
    await fetchItem(param);
    expect(fetch).toBeCalledWith(url);
  });
  it('Testa se o retorno da função fetchItem com o argumento do item `MLB1615760527` é uma estrutura de dados igual ao objeto `item`.', async () => {
    const teste = await fetchItem(param);
    expect(teste).toEqual(item);
  });
  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    expect(fetchItem()).rejects.toThrowError('You must provide an url');
  });
});
