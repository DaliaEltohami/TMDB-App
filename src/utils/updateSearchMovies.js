import { ID, Query } from "appwrite";
import { databases } from "../lib/appwrite.js";
import noPoster from "../assets/no-movie.png";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const updateSearchMovies = async (movie) => {
  const searchMoviesList = await databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    [Query.equal("movieID", movie.id)],
  );

  console.log(searchMoviesList);

  if (searchMoviesList.documents.length > 0) {
    const movieDoc = searchMoviesList.documents[0];

    const updatedMovie = await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      movieDoc.$id,
      { count: movieDoc.count + 1 },
    );
    console.log(updatedMovie);
  } else {
    console.log("creating new document");
    const newMovieSearch = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        movieID: movie.id,
        count: 1,
        movieTitle: movie.title,
        movieImageURL: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      },
    );
    console.log(newMovieSearch);
  }
};
