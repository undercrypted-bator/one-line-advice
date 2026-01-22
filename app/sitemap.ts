import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://one-line-advice.vercel.app",
      lastModified: new Date(),
    },
  ];
}
