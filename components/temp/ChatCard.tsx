interface ChatCardProps {
  name: string;
  members: number;
  description: string;
  professor: string;
}

const ChatCard = ({ name, members, description, professor }: ChatCardProps) => {
  return (
    <>
      <div className="card w-80 bg-base-200 text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <div className="badge badge-accent badge-outline">{professor}</div>
          <p>{description}</p>
          <span className="grid grid-flow-col gap-4">
            <p className="text-success">{members} Online</p>
            <p className="text-base">{members} Members</p>
          </span>
          <div className="card-actions grid grid-flow-col">
            <button className="btn btn-primary">Chat</button>
            <button className="btn btn-ghost">Discuss</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
