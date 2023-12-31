import { useGetUsersQuery } from "../../services/userService";

export const Public = () => {
  const { data } = useGetUsersQuery();
  console.log(data);
  return <div>Public</div>;
};
