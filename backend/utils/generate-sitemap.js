const fs = require("fs");

//Import the model which you want to autogenerate.
const Product = require("../models/productModel");
const Blog = require("../models/blogModel");

const generateSitemap = async () => {
  const products = await Product.find();
  const blogs = await Blog.find();
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
  <loc>https://xtrack.pk/</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>1.00</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/about/</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/blogs/</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/account/</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/cart</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/favorite</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/shop</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  <url>
  <loc>https://xtrack.pk/terms</loc>
  <lastmod>2018-10-20T01:46:40+00:00</lastmod>
  <priority>0.80</priority>
  </url>
  ${products
    ?.map((page) => {
      return `
      <url>
          <loc>${`https://xtrack.pk/product/${page?._id}`}</loc>
          <priority>0.80</priority>
      </url>
    `;
    })
    .join("")}
    ${blogs
      ?.map((page) => {
        return `
          <url>
              <loc>${`https://xtrack.pk/blog/${page?._id}`}</loc>
          <priority>0.80</priority>
          </url>
        `;
      })
      .join("")}
    
  </urlset>`;
  fs.writeFileSync("./frontend/public/sitemap.xml", sitemap);
  console.log("Sitemap generated successfully");
  return true;
};

module.exports = generateSitemap;
