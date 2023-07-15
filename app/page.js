'use client'
import MainPage from "./MainPage/page";
import { UserContextProvider } from "./UserContext";

export default function Home() {
  return (
    <div>
      <UserContextProvider>
        <MainPage />
      </UserContextProvider>
    </div>
  );
}

