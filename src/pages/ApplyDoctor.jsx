import Layout from "../components/Layout/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import dayjs from "dayjs";
import DoctorForm from "../components/DoctorForm/DoctorForm"

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user)

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          // Values: all the info from the UserId 
          ...values,
          userId: user._id,
          // FromTime-ToTime only store the time values in HH:mm format
          fromTime: dayjs(values.fromTime).format("HH:mm"),
          toTime: dayjs(values.toTime).format("HH:mm")
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout>
      <h2>Apply Doctor</h2>
      <hr/>
      
      <DoctorForm onFinish={onFinish}/>

    </Layout>
  );
};

export default ApplyDoctor;
