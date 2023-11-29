export const extractDetails = (data) => {
  return data.arAssets.map((e) => {
    const { customTemplate, images, orgTargetImage, videos } =
      e.arContent.arAssetFiles;
    return {
      created: e.created,
      title: e.arContent.contentHeader,
      description: e.arContent.contentBody,
      targetImage: e.targetImage.imageAddress,
      modelAddress: e.modelAddress,
      customTemplate,
      images,
      videos,
      orgTargetImage,
    };
  });
};
