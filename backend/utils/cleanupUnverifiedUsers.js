import * as userRepository from "../repositories/user.repository.js";

export const cleanUpUnverifiedUser = async (filter) => {
  const user = await userRepository.findByEmail({
    email: user.email,
    isVerified: false,
  });
  await user.deleteOne();
};
