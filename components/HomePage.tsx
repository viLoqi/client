import React from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firebaseStore, firebaseAuth } from "@/core/firebase";
import AvatarOnline from "./AvatarOnline";
import NavBar from "./NavBar";
import ChatCard from "./ChatCard";
import useIcon from "@/hooks/useIcon";
import CardFilter from "./CardFilter";

const HomePage = () => {
  const [value, loading, error] = useCollectionOnce(
    collection(firebaseStore, "chats")
  );
  const compassIcon = useIcon("compass");

  const cards = value?.docs.map((e) => {
    const { description, members, professor } = e.data();
    return (
      <ChatCard
        key={crypto.randomUUID()}
        name={e.id}
        description={description}
        members={members}
        professor={professor}
      />
    );
  });

  const servers = [compassIcon, compassIcon, compassIcon, compassIcon];

  console.log(error);

  const src = firebaseAuth.currentUser?.photoURL!;

  return (
    <div className="mx-2">
      <NavBar />
      <div className="grid grid-cols-10">
        <div className="flex flex-col mx-2 gap-4">{servers}</div>
        <div className="col-span-8">
          <CardFilter />
          <div className="flex gap-4">{cards}</div>
        </div>
        <div></div>
      </div>
      {/* <a className="btn btn-ghost normal-case text-xl">
        <AvatarOnline src={src} />
      </a> */}
    </div>
  );
};

export default HomePage;
