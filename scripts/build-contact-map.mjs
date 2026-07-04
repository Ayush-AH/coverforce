import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = fs.readFileSync(
  path.join(root, "public/images/map.svg"),
  "utf8",
);

const nycMarker = `<g className="contact-nyc-marker"><circle className="contact-nyc-pulse" cx="1074.42" cy="462.26" r="11.36" fill="white" /><rect className="contact-nyc-dot" x="1063.06" y="450.902" width="22.7196" height="22.7196" rx="11.3598" fill="white" fillOpacity="0.38" /></g>`;

let jsx = src
  .replace(/^<\?xml[^>]*>\s*/i, "")
  .replace(/fill-opacity/g, "fillOpacity")
  .replace(/fill-rule/g, "fillRule")
  .replace(/clip-path/g, "clipPath")
  .replace(/color-interpolation-filters/g, "colorInterpolationFilters")
  .replace(/flood-opacity/g, "floodOpacity")
  .replace(/stroke-width/g, "strokeWidth")
  .replace(/stroke-linecap/g, "strokeLinecap")
  .replace(/stroke-linejoin/g, "strokeLinejoin")
  .replace(
    '<rect x="1063.06" y="450.902" width="22.7196" height="22.7196" rx="11.3598" fill="white" fillOpacity="0.38"/>',
    nycMarker,
  );

const svgInner = jsx.trim().replace("<svg", "<svg {...props}");

const out = `"use client";

import type { SVGProps } from "react";

export default function ContactMapSvg(props: SVGProps<SVGSVGElement>) {
  return (
    ${svgInner}
  );
}
`;

fs.writeFileSync(
  path.join(root, "src/components/contact/ContactMapSvg.tsx"),
  out,
);
console.log("ContactMapSvg.tsx written");
