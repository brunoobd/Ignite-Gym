import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";

type SignInData = {
  email: UserDTO["email"];
  password: string;
};

type SignUpData = SignInData & {
  name: UserDTO["name"];
};

export type AuthContextDataProps = {
  user?: UserDTO;
  signIn: (signInData: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>();
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const signIn = async (signInData: SignInData) => {
    try {
      const { data }: { data: { user?: UserDTO } } = await api.post(
        "/sessions",
        signInData
      );
      const dataUser = data.user;

      if (dataUser) {
        setUser(dataUser);
        await storageUserSave(dataUser);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserRemove();
      setUser(undefined);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
