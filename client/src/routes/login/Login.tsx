import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/input/Input";
import Layout from "../../components/container/Layout";
import {
  LoginRequest,
  useGetAuthQuery,
  useSignInMutation,
} from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/button/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginForm = ({ onSubmit }: { onSubmit: SubmitHandler<LoginRequest> }) => {
  const { control, handleSubmit } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    shouldUnregister: false, // Add this line
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
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const { refetch } = useGetAuthQuery();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginRequest> = async (data, event) => {
    event?.preventDefault();
    try {
      const response = await signIn(data).unwrap();
      dispatch(
        setUser({
          name: response.userName,
          email: data.email,
        })
      );
      await refetch();
      navigate("/welcome");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

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
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};
