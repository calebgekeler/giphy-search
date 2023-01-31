const gifUrl = 'https://api.giphy.com/v1/gifs';
const apiKey = process.env.REACT_APP_GIPHY_KEY

export function getGifsFromQuery(searchTerm, offset=0) {
  const gifSearchUrl = `${gifUrl}/search?api_key=${apiKey}&q=${searchTerm}&limit=30&offset=${offset}&rating=g&lang=en`;
  const results = fetch(gifSearchUrl).then(res => res.json()).catch(err => console.error(err));
  return results;
}

export async function getRandomGifs( count=3 ) {
  const randomGifUrl = `${gifUrl}/random?api_key=${apiKey}`
  const results = [];

  for(let i = 0; i<count; i++) {
    results.push(await fetch(randomGifUrl)
      .then(res => res.json())
      .then(json => {
        return json.data
      })
      .catch(err => console.error(err)));
  }

  return results;
}