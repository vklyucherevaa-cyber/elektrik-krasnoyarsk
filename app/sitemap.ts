import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://elektrik-krasnoyarsk.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://elektrik-krasnoyarsk.vercel.app/privacy",
      lastModified: new Date(),
    },
  ];
}