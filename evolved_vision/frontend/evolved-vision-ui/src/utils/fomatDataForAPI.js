export const formatNewContentPayload = (details) => {
  const {
    header,
    description,
    images,
    videos,
    model,
    isCustomTemplate,
    targetImage,
    targetImgZpt,
    userId,
    pdfFile,
  } = details;
  return {
    pdfFile,
    model,
    targetImage: targetImgZpt,
    title: header,
    description,
    arAssets: JSON.stringify({
      customTemplate: isCustomTemplate,
      images,
      videos,
      orgTargetImage: targetImage,
    }),
    userId,
  };
};
