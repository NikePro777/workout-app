// @desc Get user profile (получает юзер профайл)
// @route Get /api/users/profile (получает по этому адресу)
// @accets Private (это все для авторизованных пользователей)

export const getUserProfile = (req, res) => {
  const user = {
    name: "Jeka",
    age: 29,
  };
  res.json(user);
};
