import UserCard from "@/components/UserCard";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

async function getInfo() {
  const response = await fetch("https://randomuser.me/api/?results=2");
  return response.json();
}

export default async function Home() {
  const info = await getInfo();
  console.log(info)
  return (
    <main>
      <UserCard/>
      <UserCard/>
    </main>
  );
}

