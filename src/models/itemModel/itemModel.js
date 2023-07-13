import itemSchema from "./itemSchema.js";

export const getAllItems = () => {
  return itemSchema.find();
};
export const getItemById = (_id) => {
  return itemSchema.findById(_id);
};
// export const getselectedProducts = (filter) => {
//   return itemSchema.find(filter);
// };
// export const getsingleItem = (filter) => {
//   return itemSchema.find(filter);
// };

export const addItem = (obj) => {
  return itemSchema(obj).save();
};

export const updateItemById = ({ _id, ...rest }) => {
  return itemSchema.findByIdAndUpdate(_id, rest);
};
// export const updateItemById = (_id, { update }) => {
//   return itemSchema.findByIdAndUpdate(_id, { update });
// };
export const deleteItemById = (_id) => {
  return itemSchema.findByIdAndDelete(_id);
};
// export const deleteImageOnUpdate = (_id, { images }) => {
//   return itemSchema.findByIdAndUpdate(_id, { images });
// };
// see if a product has any items
export const hasItemsById = async (_id) => {
  const item = await itemSchema.findOne({ productId: _id });
  return item?._id ? true : false;
};
// find items by productId ( used while updating products so that the related items gets updated)
export const findItemsByProduct = async (_id) => {
  const items = await itemSchema.find({ productId: _id });
  return items;
};
// update multiple items ( used while updating items if product they are associated is updated)
export const updateMultipleItemsCat = async (
  productId,
  { catId, subCatId }
) => {
  return itemSchema.updateMany({ productId }, { $set: { catId, subCatId } });
};
export const updateMultipleItemsSubCat = async (productId, { subCatId }) => {
  return itemSchema.updateMany({ productId }, { $set: { subCatId } });
};
