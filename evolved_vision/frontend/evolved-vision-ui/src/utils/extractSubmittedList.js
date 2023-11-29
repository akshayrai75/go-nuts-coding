export const extractDetails = (data) => {
  return data.arAssets.map((e) => ({
    created: e.created,
    title: e.arContent.contentHeader,
    description: e.arContent.contentBody,
    targetImage: e.targetImage.imageAddress,
    modelAddress: e.modelAddress,
  }));
};
