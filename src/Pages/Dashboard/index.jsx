import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Colors from "../../constants/Colors";
import {
  AddPaymentModal,
  BackdropCmp,
  ButtonCmp,
  LottieFilesCmp,
  Navbar,
  PaymentCard,
} from "../../Components";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import Strings from "../../constants/Strings";
import { useDispatch, useSelector } from "react-redux";
import { GetPaymentAction } from "../../store/Actions/PaymentActions";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { EmptyAnimation } from "../../assets";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { getPaymentLoading, getPaymentData } = useSelector(
    (state) => state.GetPaymentReducer
  );
  const { deletePaymentLoading, deletePaymentData } = useSelector(
    (state) => state.DeletePaymentReducer
  );
  const { addPaymentData } = useSelector((state) => state.AddPaymentReducer);
  const { editPaymentData } = useSelector((state) => state.EditPaymentReducer);
  const { markAsPaidLoading, markAsPaidData } = useSelector(
    (state) => state.MarkAsPaidReducer
  );

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    dispatch(GetPaymentAction(toast));
  }, [deletePaymentData, markAsPaidData]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setUserData(data);
  }, []);

  useEffect(() => {
    if (addPaymentData) {
      dispatch(GetPaymentAction(toast));
    }
  }, [addPaymentData]);

  useEffect(() => {
    if (editPaymentData) {
      dispatch(GetPaymentAction(toast));
    }
  }, [editPaymentData]);

  return (
    <Box className={styles.dasboardWrapper}>
      <Navbar />
      <Container sx={{ padding: "20px " }}>
        <Box sx={{ marginLeft: "auto", width: "max-content" }}>
          <ButtonCmp
            title={Strings.dashboard.addPayment}
            style={{ width: "150px" }}
            onClick={() => setOpen(!open)}
          />
        </Box>

        {/* Payment Listing */}
        {getPaymentLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PulseLoader color="#6851FF" />
          </Box>
        ) : getPaymentData.length ? (
          getPaymentData?.map((payment) => {
            return <PaymentCard key={payment._id} payment={payment} />;
          })
        ) : (
          <Box>
            <LottieFilesCmp animation={EmptyAnimation} />
          </Box>
        )}
      </Container>
      <AddPaymentModal open={open} setOpen={setOpen} />
      {(deletePaymentLoading || markAsPaidLoading) && <BackdropCmp />}
    </Box>
  );
};

export default Dashboard;
