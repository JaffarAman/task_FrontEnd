import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BackdropCmp, ButtonCmp, InputCmp } from "../../Components";
import Strings from "../../constants/Strings";
import styles from "./login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import yupValidation from "../../validations";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../store/Actions/AuthAction";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.LoginReducer);

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      emailAddress: "",
      password: "",
    },
    resolver: yupResolver(yupValidation.loginSchema),
  });

  const onSubmit = (obj) => {
    dispatch(LoginAction(obj, toast, navigate));
  };

  return (
    <Box className={styles.loginPageWrapper}>
      <Box
        component={"form"}
        className={styles.loginContainer}
        sx={{
          width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ marginBottom: "50px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {Strings.login.heading}
          </Typography>
          <Typography>{Strings.login.subHeading}</Typography>
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <InputCmp
            label={Strings.emailAddress}
            control={control}
            name="emailAddress"
          />
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <InputCmp
            label={Strings.password}
            control={control}
            name="password"
            type={"password"}
          />
        </Box>

        <ButtonCmp title={Strings.login.text} type="submit" />
      </Box>
      <Box>
        <Box sx={{ textAlign: "center", margin: "20px 0" }}>
          <Typography>
            {Strings.login.notRegistered} &nbsp;
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", fontWeight: "bold" }}
            >
              <Typography
                variant="span"
                sx={{
                  color: "var(--primary-color)",
                  cursor: "pointer",
                }}
              >
                {Strings.login.createAnAccount}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
      {loginLoading && <BackdropCmp />}
    </Box>
  );
};

export default memo(Login);
