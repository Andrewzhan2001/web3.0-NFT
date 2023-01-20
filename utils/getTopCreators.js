// Return an array of top sellers(object)
// Top seller is person who has a high sum of all NFTs they've listed
export const getCreators = (array) => {
  // initial value (creatorObject) is {}
  /*  {
      'sellerA': [{},{}]
      'sellerB': [{},{}]
      'sellerC': [{},{}]
    } */
  const result = array.reduce((creatorObject, nft) => {
    // if that entry exist, use that entry, else create a new array
    creatorObject[nft.seller] = creatorObject[nft.seller] || [];
    creatorObject[nft.seller].push(nft);
    return creatorObject;
  }, {});
  /* Object.entries
  const obj = { foo: 'bar', baz: 42 };
  console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
  */
  return Object.entries(result).map((creator) => {
    const seller = creator[0];
    const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);

    return ({ seller, sum });
  });
};
