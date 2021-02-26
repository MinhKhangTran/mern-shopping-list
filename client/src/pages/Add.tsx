import React from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { addItem, getItems } from "../slices/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Add = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state: RootState) => state.user);
  const initialValues = { name: "" };
  const validationSchema = Yup.object({
    name: Yup.string().required("Bitte geben Sie einen Namen ein"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(addItem(daten));
      dispatch(getItems());
      history.push("/");
      resetForm();
    },
  });

  // React.useEffect(() => {
  //   if (userInfo._id.length !== 0) {
  //     history.push("/");
  //   }
  // }, [history, userInfo]);

  return (
    <Box>
      <Heading bgGradient="linear(to-l,green.500,yellow.400)" bgClip="text">
        Neues Item einfügen
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <FormControl
          isInvalid={!!formik.errors.name && formik.touched.name}
          id="name"
          mt={4}
        >
          <FormLabel>Name</FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Magerquark"
            {...formik.getFieldProps("name")}
          />

          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <Button isLoading={loading} mt={8} colorScheme="yellow" type="submit">
          Einfügen
        </Button>
      </form>
    </Box>
  );
};
export default Add;
