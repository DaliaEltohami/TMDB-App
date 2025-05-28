import { databases } from "../lib/appwrite";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const fetchTrendingMovies = async () => {
  const trendingMoviesRequest = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
  );
  return trendingMoviesRequest;
};

export default fetchTrendingMovies;
