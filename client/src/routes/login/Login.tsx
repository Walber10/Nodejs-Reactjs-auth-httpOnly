import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/input/Input";
import Layout from "../../components/container/Layout";
import { LoginRequest, useSignInMutation } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/button/Button";

const LoginForm = ({ onSubmit }: { onSubmit: SubmitHandler<LoginRequest> }) => {
  const { control, handleSubmit } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput label="Email" required {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="Password"
              required
              {...field}
              inputType="password"
            />
          )}
        />
        <input type="submit" />
      </Layout>
    </form>
  );
};
export const LoginPage = () => {
  const [signIn, { isLoading, isError }] = useSignInMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      await signIn(data).unwrap();
      navigate("/welcome");
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Layout>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm onSubmit={onSubmit} />
        <CustomButton
          type_="button"
          text="forgot my password"
          bgColor="transparent"
          onClick={() => navigate("/forgotpassword")}
        />
      </div>
    </Layout>
  );
};
