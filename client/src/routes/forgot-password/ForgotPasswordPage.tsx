import React from "react";
import Layout from "../../components/container/Layout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/input/Input";
import {
  ForgotPasswordRequest,
  useForgotPasswordMutation,
} from "../../services/authService";
import Container from "../../components/container/Container";

const ForgotPasswordForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<ForgotPasswordRequest>;
}) => {
  const { control, handleSubmit } = useForm<ForgotPasswordRequest>({
    defaultValues: {
      email: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className="space-y-6">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          We will send you an email with instructions on how to reset your
          password.
        </h2>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput label="Email" required {...field} />
          )}
        />
        <input type="submit" />
      </Container>
    </form>
  );
};
export const ForgotPasswordPage = () => {
  const [mutate] = useForgotPasswordMutation();
  const onSubmit: SubmitHandler<ForgotPasswordRequest> = async (data) => {
    try {
      await mutate(data).unwrap();
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };
  return (
    <Layout>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </Layout>
  );
};
