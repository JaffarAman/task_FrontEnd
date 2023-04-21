import react, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import InputCmp from "../InputCmp";
import { useForm } from "react-hook-form";
import Strings from "../../constants/Strings";
import ButtonCmp from "../ButtonCmp";
import yupValidation from "../../validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPaymentAction,
  AddPaymentEmptyAction,
  GetPaymentAction,
} from "../../store/Actions/PaymentActions";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function AddPaymentModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const { addPaymentLoading, addPaymentData } = useSelector(
    (state) => state.AddPaymentReducer
  );

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
    resolver: yupResolver(yupValidation.paymentDetailSchema),
  });

  const handleClose = () => setOpen(false);
  const onSubmit = (obj) => {
    dispatch(AddPaymentAction(obj, toast));
  };

  useEffect(() => {
    if (addPaymentData) {
      handleClose();
      reset();
      dispatch(AddPaymentEmptyAction());
    }
  }, [addPaymentData]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ borderBottom: "1px solid var(--black-color)" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Payment Details
              </Typography>
            </Box>

            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ margin: "20px 0" }}>
                <InputCmp
                  label={Strings.dashboard.title}
                  control={control}
                  name="title"
                />
              </Box>

              <Box sx={{ margin: "20px 0" }}>
                <InputCmp
                  label={Strings.dashboard.description}
                  control={control}
                  name="description"
                />
              </Box>

              <Box sx={{ margin: "20px 0" }}>
                <InputCmp
                  label={Strings.dashboard.dueDate}
                  control={control}
                  name="dueDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box sx={{ margin: "20px 0" }}>
                {addPaymentLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PulseLoader color="#6851FF" />
                  </Box>
                ) : (
                  <ButtonCmp
                    title={Strings.dashboard.addPayment}
                    type="submit"
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default memo(AddPaymentModal);
