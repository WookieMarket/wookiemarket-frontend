import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../api/client";
import storage from "../utils/storage";

export const login = credentials => {
  return client.post("/api/login", credentials).then(({ jwt }) => {
    setAuthorizationHeader(jwt);
    if (credentials.rememberMe) storage.set("auth", jwt);
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });
};
