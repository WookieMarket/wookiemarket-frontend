function disable(isLogged, userId, advertUserId) {
  const isAdvertOwner = isLogged && advertUserId === userId;
  const isDisabled = !isAdvertOwner;
  return isDisabled;
}

export default disable;
