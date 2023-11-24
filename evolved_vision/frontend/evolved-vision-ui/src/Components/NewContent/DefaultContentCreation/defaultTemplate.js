export function generateHtml(header, description, imgSrc) {
  return `<div style="border:2px solid #000;border-radius:10px;padding-left:20px;max-width:1000px;width:800px;background:rgba(255,255,255,.8)"><h1>${header}</h1><div style="display:flex;flex-direction:row;align-items:center;justify-content:center"><p style="color:#000">${description}</p><img alt="Placeholder overlay"src="${imgSrc}"style="max-width:50%;margin-top:20px"></div></div>`;
}
