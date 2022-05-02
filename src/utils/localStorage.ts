export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };
  
  export const setAccessToken = (value: string) => {
    localStorage.setItem("accessToken", value);
  };
  
  export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
  };
  
  export const setUserInfo = (value: object) => {
    localStorage.setItem("userInfo", JSON.stringify(value));
  };
  
  export const getUserInfo = () => {
    let recievedInfo = localStorage.getItem("userInfo");
    return JSON.parse(recievedInfo!);
  };
  
  export const removeUserInfo = () => {
    localStorage.removeItem("userInfo");
  };
  
  export const getRole = () => {
    return localStorage.getItem('role')
  }
  
  export const setRole = (role:string) => {
    localStorage.setItem('role', role)
  }
  