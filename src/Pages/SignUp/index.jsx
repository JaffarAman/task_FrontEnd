import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BackdropCmp, ButtonCmp, InputCmp } from "../../Components";
import Strings from "../../constants/Strings";
import styles from "./signup.module.css";
import yupValidation from "../../validations";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAction } from "../../store/Actions/AuthAction";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
    resolver: yupResolver(yupValidation.signUpSchema),
  });

  const { signUpLoading } = useSelector((state) => state.SignUpReducer);
  const onSubmit = (obj) => {
    dispatch(SignUpAction(obj, toast, navigate));
  };
  return (
    <Box className={styles.signupPageWrapper}>
      <Box
        className={styles.signupContainer}
        component="form"
        sx={{
          width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ marginBottom: "50px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {Strings.signup.heading}
          </Typography>
          <Typography>{Strings.signup.subHeading}</Typography>
        </Box>

        <Box sx={{ margin: "20px 0" }}>
          <InputCmp
            label={Strings.firstName}
            control={control}
            name={"firstName"}
          />
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <InputCmp
            label={Strings.lastName}
            control={control}
            name={"lastName"}
          />
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <InputCmp
            label={Strings.emailAddress}
            control={control}
            name={"emailAddress"}
          />
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <InputCmp
            label={Strings.password}
            control={control}
            name={"password"}
            type="password"
          />
        </Box>

        <ButtonCmp title={Strings.signup.text} type="submit" />
      </Box>
      <Box sx={{ textAlign: "center", margin: "20px 0" }}>
        <Typography>
          {Strings.signup.alreadyAccount} &nbsp;
          <Link to={"/"} style={{ textDecoration: "none", fontWeight: "bold" }}>
            <Typography
              variant="span"
              sx={{ color: "var(--primary-color)", cursor: "pointer" }}
            >
              {Strings.signup.loginHere}
            </Typography>
          </Link>
        </Typography>
      </Box>
      {signUpLoading && <BackdropCmp />}
    </Box>
  );
};

export default memo(SignUp);
