const getApi = (param) => `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;

const fetchProducts = async (param) => {
  try {
    const url = getApi(param);
    const request = await fetch(url);
    // console.log(request);
    const response = await request.json();
    // console.log(response.results);
    const arrayResults = response.results;
    return arrayResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
