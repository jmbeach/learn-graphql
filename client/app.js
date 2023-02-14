const GRAPHQL_URL = "http://localhost:9000/";
const el = document.getElementById("greeting");
el.textContent = "Loading...";

async function fetchGreeting() {
  const req = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          greeting
        }
      `,
    }),
  });
  const { data } = await req.json();
  return data;
}

(async () => {
  const data = await fetchGreeting();
  el.textContent = data.greeting;
})();
