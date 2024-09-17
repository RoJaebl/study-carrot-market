async function getProducts() {
  await new Promise((res) => setTimeout(res, 10000));
}
export default async function Products() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-white text-4xl">Products!</h1>
    </div>
  );
}
