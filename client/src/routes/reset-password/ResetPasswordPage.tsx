import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ResetPasswordRequest,
  useResetPasswordMutation,
} from "../../services/authService";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Container from "../../components/container/Container";
import CustomInput from "../../components/input/Input";
import Layout from "../../components/container/Layout";
import { CustomButton } from "../../components/button/Button";
import { toast } from "react-toastify";

const ResetPasswordForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<ResetPasswordRequest>;
}) => {
  const { control, handleSubmit } = useForm<ResetPasswordRequest>({
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className="space-y-6">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <CustomInput label="Password" required {...field} />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <CustomInput label="Confirm Password" required {...field} />
          )}
        />
        <CustomButton text="Reset Password" type_="submit" />
      </Container>
    </form>
  );
};

export const ResetPasswordPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<ResetPasswordRequest> = async (data) => {
    if (!token) return;
    try {
      await resetPassword({ ...data, token }).unwrap();
      navigate("/welcome");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };
  return (
    <Layout>
      <Container>
        <ResetPasswordForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  );
};
