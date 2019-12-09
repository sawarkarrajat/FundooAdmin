import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class adminServices {

  login(data) {
    return obj.postMethod(data, "/user/login", false);
  }

  getAllUserData() {
    return obj.getMethod("/user/getAdminUserList", true);
  }

  getAllStatics() {
    return obj.getMethod("/user/UserStatics", true);
  }
}
