// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
// Iniciando o projeto
/**
 * 
 
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const cart = document.querySelector('.cart__items'); // pega ol do carrinho

const price = () => {
  const list = document.querySelectorAll('.cart__item');
  console.log(list);
  const values = [];
  for (let i = 0; i < list.length; i += 1) {
    const e = Number(list[i].innerText.split('$')[1]);
    console.log(e);
    // sum += e[i];
    values.push(e);
  }
  return values;
};

const totalprice = () => {
  const total = price();
  console.log(total);
  let subTotal = 0;
  for (let i = 0; i < total.length; i += 1) {
    subTotal += total[i];
  }
  // console.log(subTotal);
  const sectionCart = document.querySelector('.total-price');
  sectionCart.innerText = subTotal;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  totalprice();
  // console.log(itemCart);
  // const selectItemsCart = document.querySelector('.cart__item');
  // selectItemsCart.remove('cart__item');
};

const emptyCart = () => {
  console.log('cliquei aqui!');
  cart.innerHTML = '';
  localStorage.clear();
  totalprice();
};

const buttonEmptyCart = () => {
  const buttonEmpty = document.querySelector('.empty-cart');
  // console.log(buttonEmpty);
  buttonEmpty.addEventListener('click', emptyCart);
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const recebeClick = async (evento) => {
  const product = evento.target.parentNode;
  // console.log(product)
  const products = product.querySelector('.item_id').innerText;
  const infoItem = await fetchItem(products);
  cart.appendChild(createCartItemElement(infoItem));
  // console.log(selectItems.innerHTML);
  saveCartItems(cart.innerHTML);
  totalprice();
};

// funcao para add evento em todos os botões
const addEventButtons = () => {
  const productSelected = document.getElementsByClassName('item__add');
  for (let i = 0; i < productSelected.length; i += 1) {
    productSelected[i].addEventListener('click', recebeClick);
  }
};

const createElementItem = async () => {
  const selectItems = document.querySelector('.items');
  const data = await fetchProducts('computador');
  for (let i = 0; i < data.length; i += 1) {
    selectItems.appendChild(createProductItemElement(data[i]));
  }
  addEventButtons();  
};

const loading = () => {
  const container = document.querySelector('.container');
  // console.log(container);
  const paragraph = document.createElement('p');
  paragraph.classList = 'loading';
  paragraph.innerText = 'carregando...';
  container.appendChild(paragraph);
};

const clearLoading = () => {
  const removeLoading = document.querySelector('.loading');
  removeLoading.remove();
};

window.onload = async () => { 
  loading();
  await createElementItem();
  clearLoading();
  const itensCart = getSavedCartItems();
  // console.log(itensCart);
  cart.innerHTML = itensCart;
  totalprice();
  const itensCartLocalStorage = document.querySelectorAll('.cart__item'); // fazer um query selector all para pegar todas as lis novamente
  // console.log(itensCartLocalStorage);
  for (let i = 0; i < itensCartLocalStorage.length; i += 1) { // utilizando um laço de repetição devo percorrer cada uma das li e reatribuir o mesmo evento
    itensCartLocalStorage[i].addEventListener('click', cartItemClickListener);
  }
  buttonEmptyCart();
};
