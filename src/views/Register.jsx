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
import { registerUser } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = (data) => {
    dispatch(registerUser(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        alert("Register Berhasil");
        navigate("/login");
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px] h-[400px]">
        <CardHeader>Register</CardHeader>
        <form onSubmit={handleSubmit(handleRegister)}>
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
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <Input {...field} type="email" label="Email" size="sm" />
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
              {status === "loading" ? "Registering..." : "Register"}
            </Button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default register;
