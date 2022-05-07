import User from "../models/userModel";

const Query = {
  getUsers: async (parent, args, context, info) => {
    return "users";
  },
};

export default { Query };
