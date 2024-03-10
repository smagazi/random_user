import UserCard from "@/components/UserCard";

export default async function Home() {
    const info = await getInfo()
    return (
      <main>
        <UserCard/>
        <UserCard/>
        </main>
    );
}
async function getInfo() {
  const response = await fetch("https://randomuser.me/api/?results=2")
  return response.json()
  
}