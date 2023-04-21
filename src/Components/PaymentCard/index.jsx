import { Box, Typography, Tooltip } from "@mui/material";
import React, { memo, useState } from "react";
import styles from "./PaymentCard.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Strings from "../../constants/Strings";
import Colors from "../../constants/Colors";
import ButtonCmp from "../ButtonCmp";
import { useDispatch } from "react-redux";
import {
  DeletePaymentAction,
  MarkAsPaidAction,
} from "../../store/Actions/PaymentActions";
import { toast } from "react-toastify";
import EditPaymentModal from "../EditPaymentModal";

const PaymentCard = ({ payment }) => {
  const { title, description, due_date, paid, _id } = payment || {};
  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(false);

  const deleteHandler = (id) => {
    dispatch(DeletePaymentAction(id, toast));
  };

  const markAsPaid = (id) => {
    dispatch(MarkAsPaidAction(id, toast));
  };
  return (
    <Box className={styles.paymentCardWrapper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box>
          <Tooltip title="Edit" placeholder="top">
            <EditIcon
              sx={{ color: Colors.primaryColor, cursor: "pointer" }}
              onClick={() => setEditModal(!editModal)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteIcon
              sx={{ color: Colors.primaryColor, cursor: "pointer" }}
              onClick={() => deleteHandler(_id)}
            />
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          margin: "20px 0",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {Strings.dashboard.description}
          </Typography>
          <Typography>{description}</Typography>
        </Box>
        <Typography>
          <Typography sx={{ fontWeight: "bold" }} variant="span">
            {Strings.dashboard.dueDate}
          </Typography>
          :{due_date}
        </Typography>
      </Box>
      <Box sx={{ width: "max-content", ml: "auto" }}>
        {paid ? (
          <ButtonCmp
            color="success"
            style={{ width: "150px" }}
            title={Strings.payments.paid}
          />
        ) : (
          <ButtonCmp
            style={{ width: "150px" }}
            title={Strings.payments.unpaid}
            onClick={() => markAsPaid(_id)}
          />
        )}
      </Box>
      <EditPaymentModal
        open={editModal}
        setOpen={setEditModal}
        payment={payment}
      />
    </Box>
  );
};
export default memo(PaymentCard);
