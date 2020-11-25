function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" class="base-link">${url}</a>`,
  );
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

export default urlify;
