import Client from "appwrite";

const APPWRITE_BASE_URL = import.meta.env.VITE_APPWRITE_BASE_API;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_DTABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();
client.setEndpoint(APPWRITE_BASE_URL).setProject(APPWRITE_PROJECT_ID);

export const updateSearchMovies = () => {
  console.log(
    APPWRITE_BASE_URL,
    APPWRITE_PROJECT_ID,
    APPWRITE_DTABASE_ID,
    APPWRITE_COLLECTION_ID,
  );
};
