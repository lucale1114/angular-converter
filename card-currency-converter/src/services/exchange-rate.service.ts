let url =
  'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/sek.json';
let urlNotSet =
  'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

export function convertCurrency(): Promise<number> {
  return fetch(url)
    .then((res) => {
     if (!res.ok) {
            throw new Error(res.statusText)
      }
      return res.json();
    })
    .then((res) => {
      console.log(res.sek);
      return res.sek;
    })
}

async function fetchJSON(from: string, to: string) {
//   let resp = await fetch(urlNotSet + from + "/" + to + ".json");
  let resp = await fetch(url);

  if (!resp.ok) {
    throw new Error('Error: ' + resp.status);
  }

  return resp.json();
}

export async function testFetch() {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error('Error: ' + resp.status);
      }
    const data = await resp.json();
    console.log(data);
    return data;
}