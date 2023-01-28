const gifUrl = 'https://api.giphy.com/v1/gifs';
const apiKey = process.env.REACT_APP_GIPHY_KEY

export function getGifsFromQuery(searchTerm) {
  const gifSearchUrl = `${gifUrl}/search?api_key=${apiKey}&q=${searchTerm}&limit=30&offset=0&rating=g&lang=en`;
  const results = fetch(gifSearchUrl).then(res => res.json());
  return results;
}

export async function getRandomGifs( count=3 ) {
  const randomGifUrl = `${gifUrl}/random?api_key=${apiKey}`
  let promises = [];

  for(let i = 0; i<count; i++) {
    promises.push(await fetch(randomGifUrl).then(res => res.json()).then(res => res.data))
  }

  return promises;
}