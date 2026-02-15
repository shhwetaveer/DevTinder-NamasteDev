const UserCards = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender, about } = user;

  const defaultImage =`https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=terminal-${firstName}`

  return (
    <div className="card w-96 bg-base-100 shadow-xl rounded-2xl overflow-hidden">

      <figure className="h-110 bg-gray-200 flex items-center justify-center">
        <img
          src={photoURL ? photoURL : defaultImage}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold">
          {firstName} {lastName}
        </h2>

        <p className="text-gray-500 text-sm">
          {age || ""} {gender || ""}
        </p>

        <p className="mt-2 text-gray-700">
          {about || "No bio available"}
        </p>

        <div className="card-actions justify-center gap-4 mt-6">
          <button className="btn btn-outline btn-secondary px-6">
            Ignore
          </button>
          <button className="btn btn-primary px-6">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCards;

