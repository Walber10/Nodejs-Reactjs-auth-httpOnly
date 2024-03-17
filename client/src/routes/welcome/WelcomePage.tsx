import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/button/Button";
import Container from "../../components/container/Container";
import Layout from "../../components/container/Layout";
import { useAppSelector } from "../../redux/hooks";
import { useLogOutMutation } from "../../services/authService";
import { toast } from "react-toastify";

export const WelcomePage = () => {
  const data = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [logOut] = useLogOutMutation();
  return (
    <Layout>
      <Container>
        <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {data.user?.name}Welcome to the app
        </h4>

        <CustomButton
          text="LOGOUT"
          type_="button"
          onClick={async () => {
            try {
              await logOut();
              navigate("/login");
            } catch (error) {
              toast.error("Failed to logout");
            }
          }}
        />
      </Container>
    </Layout>
  );
};
