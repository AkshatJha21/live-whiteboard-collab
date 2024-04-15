import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        THIS IS A SCREEN FOR AUTHENTICATED USERS ONLY
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}
