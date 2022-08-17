import baseURL from ".";
// 회원가입 API
export const signupAPI = async (user) => 
  fetch(`${baseURL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

// 로그인 API
export const loginAPI = async (user) =>
  fetch(`${baseURL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });