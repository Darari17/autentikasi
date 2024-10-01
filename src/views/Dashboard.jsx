import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

// Test dashboard (please delete)
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector((state) => state.user);

  if (!isAuth) {
    return <p>Please Login</p>;
  }

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
    alert("logout berhasil");
  };

  return (
    <>
      <Card>
        <CardHeader>Dashbaord</CardHeader>
        <CardBody>Selamat datang, {currentUser.username}</CardBody>
        <CardFooter>
          <Button onPress={logout}>Logout</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Dashboard;
