function rewriteUrl(url) {
  if (typeof url !== 'string') return url;
  if (url.startsWith('../medias/')) {
    return `/medias/${url.replace(/^\.\.\/medias\/?/, '')}`;
  }
  return url;
}

export function remarkMediasToAbsolute() {
  return (tree) => {
    function visit(node) {
      if (!node || typeof node !== 'object') return;

      if ((node.type === 'image' || node.type === 'link') && node.url) {
        node.url = rewriteUrl(node.url);
      }

      if (node.type === 'mdxJsxAttribute' && typeof node.value === 'string') {
        if (node.name === 'src' || node.name === 'href') {
          node.value = rewriteUrl(node.value);
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
      if (Array.isArray(node.attributes)) {
        node.attributes.forEach(visit);
      }
    }

    visit(tree);
  };
}
