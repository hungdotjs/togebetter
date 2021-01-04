function detectMention(content, listUsers) {
  let text = content;
  listUsers.forEach((item) => {
    const haveMention = text.indexOf(item.username);
    if (haveMention !== -1) {
      if (text[haveMention - 1] === '@') {
        text = text.replaceAll(
          `@${item.username}`,
          `<a href="/users/${item.id}" class="base-link">@${item.username}</a>`,
        );
      }
    }
  });
  return text;
}

export default detectMention;
