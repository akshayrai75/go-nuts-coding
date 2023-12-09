export const extractDetails = (data) => {
  const { fileNotes } = data;

  return data.arAssets.map((e, index) => {
    const { customTemplate, images, orgTargetImage, videos } =
      e.arContent.arAssetFiles;
    const { notes } = fileNotes?.[index];
    return {
      created: e.created,
      title: e.arContent.contentHeader,
      description: e.arContent.contentBody,
      targetImage: e.targetImage.imageAddress,
      modelAddress: e.modelAddress,
      customTemplate,
      images,
      notes,
      videos,
      orgTargetImage,
    };
  });
};
