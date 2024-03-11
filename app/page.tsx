import UserCard from "@/components/UserCard";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

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
async function getInfo() {
  const response = await fetch("https://randomuser.me/api/?results=2");
  return response.json();
}
