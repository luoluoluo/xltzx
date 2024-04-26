import LoginForm from "./components/login-form";
import loginLeft from "@/assets/images/login_left.png";
import "./index.less";

const Login = () => {
  return (
    <div className="login-container relative">
      <div className="login-box">
        <div className="login-left">
          <img src={loginLeft} alt="login" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <span className="logo-text">管理后台</span>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
