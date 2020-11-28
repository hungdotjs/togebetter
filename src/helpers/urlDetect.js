function urlify(text, hidden = false) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    if (hidden) return '';
    return `<a href="${url}" target="_blank" class="base-link">${url}</a>`;
  });
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

export default urlify;
