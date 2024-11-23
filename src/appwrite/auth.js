import { Account, Client, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, fullName = "" }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        fullName
      );

      if (userAccount) {
        // Log In him.
        return this.login({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      console.error("Appwrite Service :: Create User :: Error :: ", error);
    }
  }

  async login({ email, password }) {
    try {
      const loggedInUser = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (!loggedInUser) {
        return null;
      }
      return loggedInUser;
    } catch (error) {
      console.error("Appwrite Service :: Login User :: Error :: ", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error("Appwrite Service :: Get Current User :: Error :: ", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite Service :: Logout User :: Error :: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
