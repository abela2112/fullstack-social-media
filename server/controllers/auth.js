import User from "../model/user.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, occupation } = req.body;
    console.log(req.body);
    if (!firstName || !lastName || !email)
      throw new Error("please provide a firstname");
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,

      occupation,
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error(`User not found`);

    const isMatch = user.comparePassword(password);

    if (!isMatch) throw new Error(`invalid credentials`);
    const token = user.createToken();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


