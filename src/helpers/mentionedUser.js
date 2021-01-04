function mentionedUser(content, listUsers) {
  const text = content;
  const result = [];
  listUsers.forEach((item) => {
    const haveMention = text.indexOf(item.username);
    if (haveMention !== -1) {
      if (text[haveMention - 1] === '@') {
        result.push({ id: item.id, username: item.username });
      }
    }
  });
  return result;
}

export default mentionedUser;
