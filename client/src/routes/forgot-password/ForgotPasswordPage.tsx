import React from "react";
import Layout from "../../components/container/Layout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/input/Input";
import {
  ForgotPasswordRequest,
  useForgotPasswordMutation,
} from "../../services/authService";
import Container from "../../components/container/Container";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/button/Button";

const EmailSendConfirmation = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          We will send you an email with instructions on how to reset your
          password.
        </h2>
        <CustomButton
          text="Go back to login"
          type_="button"
          onClick={() => navigate("/login")}
        />
      </Container>
    </Layout>
  );
};

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
        <input type="submit" className="bg-yellow-300/70" />
      </Container>
    </form>
  );
};
export const ForgotPasswordPage = () => {
  const [mutate, { isLoading }] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = React.useState(false);
  const onSubmit: SubmitHandler<ForgotPasswordRequest> = async (data) => {
    try {
      await mutate(data).unwrap();
      setEmailSent(true);
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <Layout>
      {emailSent ? (
        <EmailSendConfirmation />
      ) : (
        <ForgotPasswordForm onSubmit={onSubmit} />
      )}
    </Layout>
  );
};
