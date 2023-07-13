import productsSchema from "./productsSchema.js";
// post products
export const insertproduct = (obj) => {
  return productsSchema(obj).save();
};
// get one product
export const getproductById = (_id) => {
  return productsSchema.findById(_id);
};
// get all products
export const getAllproducts = () => {
  return productsSchema.find();
};
// update product
export const updateproductById = ({ _id, ...update }) => {
  return productsSchema.findByIdAndUpdate(_id, update, { new: true });
};

// delete product
export const deleteproductById = async (_id) => {
  return productsSchema.findByIdAndDelete(_id);
};
// to check if the given category has products assigned to them
export const hasProductsById = async (_id) => {
  const product = await productsSchema.findOne({ subCatId: _id });
  return product?._id ? true : false;
};
