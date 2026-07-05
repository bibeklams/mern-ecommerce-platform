import * as userRepository from "../repositories/user.repository.js";

export const getProfile = async (req, res) => {
  const user = await userRepository.findById(req.user.userId);

  res.json(user);
};
