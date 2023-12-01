export function extractContent(html) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract description
    const paragraphs = Array.from(doc.querySelectorAll("p"));
    const description = paragraphs.map((p) => p.textContent.trim()).join("\n");

    // Extract images
    const images = Array.from(doc.querySelectorAll("img"));
    const imageUrls = images.map((img) => img.src);

    // Extract videos
    const videos = Array.from(doc.querySelectorAll("video"));
    const videoSources = videos.map((video) => video.src);

    let split_string = description.split("\n");
    const header = split_string.find((x) => x !== "");
    const headerIndex = split_string.indexOf(header);
    return {
      header,
      description: split_string.slice(headerIndex + 1).join(""),
      images: imageUrls,
      videos: videoSources,
    };
  } catch (e) {
    console.log("error parsing html content");
  }
}
