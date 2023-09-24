import '@total-typescript/ts-reset/is-array'

const validate = (input: unknown) => {
  if (Array.isArray(input)) {
    console.log(input);
  }
}

  