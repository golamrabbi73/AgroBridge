import { productSchema } from "./schemas/product.schema.js";

const validData = {
  name: "Rice",
  price: 80,
};

const invalidData = {
  name: 123,
  price: "hello",
};

const validResult = productSchema.safeParse(validData);
const invalidResult = productSchema.safeParse(invalidData);

console.log("Valid result:", validResult);
console.log("Invalid result:", invalidResult);