const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar `saveCartItems` com um `cartItem` como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const data = selectItems.innerHTML;
    saveCartItems('cartItems', data);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
