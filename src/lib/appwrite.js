import { Account, Client, Databases } from "appwrite";

const APPWRITE_BASE_URL = import.meta.env.VITE_APPWRITE_BASE_API;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();
client.setEndpoint(APPWRITE_BASE_URL).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
