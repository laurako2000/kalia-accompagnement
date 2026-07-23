module.exports = function (eleventyConfig) {
  // ── Fichiers statiques copiés tels quels (chemins relatifs à la racine du dépôt,
  //    car addPassthroughCopy n'est PAS affecté par dir.input) ──
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/shared.css");
  eleventyConfig.addPassthroughCopy("src/shared.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  // ── Collection des articles de blog (triés du plus récent au plus ancien) ──
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ── Filtres Nunjucks utilitaires ──
  eleventyConfig.addFilter("formatDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toISOString();
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("readingTime", (content) => {
    const text = String(content || "").replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return minutes;
  });

  eleventyConfig.addFilter("relatedPosts", (allPosts, currentUrl, currentCategories, limit) => {
    limit = limit || 3;
    const others = (allPosts || []).filter((p) => p.url !== currentUrl);
    const sameCategory = others.filter((p) =>
      (p.data.categories || []).some((c) => (currentCategories || []).includes(c))
    );
    const rest = others.filter((p) => !sameCategory.includes(p));
    return sameCategory.concat(rest).slice(0, limit);
  });

  eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("absoluteUrl", (value, baseUrl) => {
    if (!value) return "";
    if (/^https?:\/\//i.test(value)) return value;
    return (baseUrl || "") + value;
  });

  const slugifyOne = (value) =>
    String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  eleventyConfig.addFilter("slugify", slugifyOne);

  eleventyConfig.addFilter("slugifyList", (arr) =>
    (arr || []).map(slugifyOne).join(" ")
  );

  eleventyConfig.addFilter("where_exp_category", (posts, category) => {
    if (!category) return posts;
    return posts.filter((p) => (p.data.categories || []).includes(category));
  });

  // Ne pas traiter les .html en tant que templates Nunjucks : les pages
  // existantes du site (index.html, contact.html, etc.) doivent être
  // copiées telles quelles, sans interprétation de leur contenu.
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
