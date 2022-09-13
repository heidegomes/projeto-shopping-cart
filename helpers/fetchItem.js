const getApiProduct = (ItemID) => `https://api.mercadolibre.com/items/${ItemID}`;

const fetchItem = async (ItemID) => {
  try {
    const url = getApiProduct(ItemID);
    const request = await fetch(url);
    // console.log(request);
    const response = await request.json();
    // console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
