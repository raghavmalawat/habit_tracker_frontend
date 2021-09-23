import wretch from "wretch";

const login = (email: string, password: string) =>
  wretch(`${process.env.REACT_APP_API_HOST}/api/v1/users/login`)
    .post({ user: { email, password } })
    .res((res) => res.headers.get("Authorization"));

const resetPassword = (email: string) =>
  wretch(`${process.env.REACT_APP_API_HOST}/api/v1/users/reset_password`)
    .post({ user: { email } })
    .res((res) => res)
    .catch((error) => {
      throw new error();
    });

const updatePassword = (
  token: string,
  password: string,
  confirm_password: string
) => {
  return wretch(`${process.env.REACT_APP_API_HOST}/api/v1/users/password`)
    .post({
      user: {
        reset_password_token: token,
        password,
        password_confirmation: confirm_password
      }
    })
    .res((res) => res)
    .catch((error) => {
      throw new error();
    });
};

export { login, resetPassword, updatePassword };
