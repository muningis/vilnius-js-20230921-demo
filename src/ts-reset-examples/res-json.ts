// import '@total-typescript/ts-reset/fetch'

const res = await fetch("https://jsonplaceholder.typicode.com/users");
const data = await res.json();

data.foo.bar.baz.lorem.ipsum;

export {};