import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDMwZGJmMGY3NjcwMDE2ZmIyOGQ4ODhiMTU0MWRmOCIsIm5iZiI6MTczNDUyODIwOS43NjEsInN1YiI6IjY3NjJjY2QxOTQxOTZhYWVkMmZmZTg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sF9rOsuMXdAE4ZHgHXsKDY7Ykjk3hndXRJlTarOWeRU",
  },
});

export default instance;
