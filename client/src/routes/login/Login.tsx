import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/input/Input";
import Container from "../../components/container/FlexContainer";
import { LoginRequest, useSignInMutation } from "../../services/authService";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit }: { onSubmit: SubmitHandler<LoginRequest> }) => {
  const { control, handleSubmit } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className="space-y-6">
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
      </Container>
    </form>
  );
};
export const LoginPage = () => {
  const [signIn, { isLoading, isError }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const response = await signIn(data).unwrap();
      if (response?.token) {
        dispatch(
          addAuth({
            token: response.token,
            userName: response.userName,
          })
        );
      }
      navigate("/welcome");
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Container>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm onSubmit={onSubmit} />
      </div>
    </Container>
  );
};
