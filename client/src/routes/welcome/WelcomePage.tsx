import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/button/Button";
import Container from "../../components/container/Container";
import Layout from "../../components/container/Layout";

export const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container>
        <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to the app
        </h4>

        <CustomButton
          text="LOGOUT"
          type_="button"
          onClick={() => navigate("/login")}
        />
      </Container>
    </Layout>
  );
};
