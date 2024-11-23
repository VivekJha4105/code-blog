import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createBlog({ title, content, slug, image, author, status }) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, image, author, status }
      );

      return response;
    } catch (error) {
      console.error("Appwrite Service :: Create a Blog :: Error :: ", error);
    }
  }

  async updateBlog(slug, data) {
    try {
      const response = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        data
      );
      return response;
    } catch (error) {
      console.error("Appwrite Service :: Update a Blog :: Error :: ", error);
    }
  }

  async deleteBlog(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Service :: Delete a Blog :: Error :: ", error);
      return false;
    }
  }

  async getSingleBlog(slug) {
    try {
      const response = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return response;
    } catch (error) {
      console.error("Appwrite Service :: Get Single Blog :: Error :: ", error);
    }
  }

  async getAllBlogs(queries = [Query.equal("status", ["active"])]) {
    try {
      const response = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return response;
    } catch (error) {
      console.error("Appwrite Service :: Get all Blog :: Error :: ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.Storage(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error("Appwrite Service :: Upload a File :: Error :: ", error);
    }
  }

  async updateFile(fileId) {
    try {
      const response = await this.Storage.updateFile(
        config.appwriteBucketId,
        fileId
      );
      return response;
    } catch (error) {
      console.error("Appwrite Service :: File Preview :: Error :: ", error);
    }
  }

  async getFilePreview(fileId) {
    try {
      await this.Storage.getFilePreview(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Service :: File Preview :: Error :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.Storage(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Service :: Delete a File :: Error :: ", error);
      return false;
    }
  }
}

const services = new Service();

export default services;
