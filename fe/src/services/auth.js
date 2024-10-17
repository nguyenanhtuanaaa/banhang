import * as httpRequest from "~/utils/httpRequest";

export const login = async (email, password) => {
  try {
    const res = await httpRequest.get("v1/auth/login", {
      params: {
        email,
        password,
      },
    });
    console.log("res 123", res);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
