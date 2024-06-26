import { json, useRouteLoaderData , redirect} from "react-router-dom";
import { getAuthToken } from "../util/auth";
import MyProfile from "../components/MyProfile/MyProfile";

function ProfileDetailPage() {
  //make it just loader data
  const data = useRouteLoaderData('profile-details');
  return <MyProfile profile={data} />;
}

export default ProfileDetailPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8000/users/profiles/", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch profile details for logged user." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}