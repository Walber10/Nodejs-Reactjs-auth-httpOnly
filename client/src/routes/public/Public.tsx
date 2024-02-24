import { CustomButton } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";

export const Public = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container className="mt-10">
        <p>Welcome to the public page</p>
        <CustomButton
          text="LOGIN"
          type_="button"
          onClick={() => navigate("/login")}
        />
      </Container>
    </div>
  );
};
