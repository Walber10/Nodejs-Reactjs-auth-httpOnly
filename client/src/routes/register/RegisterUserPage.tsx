import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/input/Input";
import Layout from "../../components/container/Layout";
import { useSignUpMutation } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { RegisterUserRequest } from "../../common/model/User";
import Container from "../../components/container/Container";
import { toast } from "react-toastify";

const RegisterUserForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<RegisterUserRequest>;
}) => {
  const { control, handleSubmit } = useForm<RegisterUserRequest>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      mobile: undefined,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout className="space-y-6">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <CustomInput label="First Name" required {...field} />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <CustomInput label="Last Name" required {...field} />
          )}
        />
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
            <CustomInput label="Password" required {...field} />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field }) => (
            <CustomInput label="confirmPassword" required {...field} />
          )}
        />
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <CustomInput
              label="mobile"
              required
              {...field}
              inputType="number"
            />
          )}
        />
        <input type="submit" />
      </Layout>
    </form>
  );
};
export const RegisterUserPage = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterUserRequest> = async (data) => {
    try {
      await signUp({ ...data, mobile: Number(data.mobile) }).unwrap();
      navigate("/welcome");
    } catch (error) {
      toast.error("Failed to register user");
    }
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <Container>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </Container>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterUserForm onSubmit={onSubmit} />
      </div>
    </Layout>
  );
};
