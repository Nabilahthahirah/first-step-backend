const {
    loginAdmin,
    postAdmin
} = require("../services/admin.service");

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await loginAdmin(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const createAdmin = async (req, res) => {
    const result = await postAdmin(req.body);
    const { id, username, email, address } = result;
  
    return res.status(201).json({
      status: "success",
      message: "Admin is created",
      data: { id, username, email, address },
    });
  };

module.exports = {
    login,
    createAdmin
};