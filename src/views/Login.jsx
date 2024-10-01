import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (data) => {
    dispatch(loginUser(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        alert("Login berhasil");
        navigate("/");
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px] h-[400px]">
        <CardHeader>Login</CardHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardBody>
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                return (
                  <Input {...field} type="text" label="Username" size="sm" />
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    size="sm"
                  />
                );
              }}
            />
          </CardBody>
          <CardFooter>
            <Button type="submit" size="sm" color="primary">
              {status === "loading" ? "Logging in..." : "Login"}
            </Button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default login;
