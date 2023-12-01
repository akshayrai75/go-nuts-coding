export function generateHtml(header, description, imgSrc) {
  return `<div style="height: 300px; width: 500px; overflow-x: auto; overflow-y: auto; max-height: 300px; max-width: 500px; border:2px solid #000;border-radius:10px;padding-left:20px;background:rgba(255,255,255,.8)"><h1>${header}</h1><div style="display:flex;flex-direction:row;align-items:center;justify-content:center"><p style="color:#000">${description}</p><img alt="Placeholder overlay"src="${imgSrc}"style="max-width: 200px; margin-top:20px"></div></div>`;
}
