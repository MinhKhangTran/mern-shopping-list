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
import { useHistory, useParams } from "react-router-dom";
import { getItemById, updateItem, clearState } from "../slices/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Edit = () => {
  interface ParamType {
    id: string;
  }
  const { id } = useParams<ParamType>();
  const [formData, setFormData] = React.useState({ name: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state: RootState) => state.user);
  const { singleItem } = useSelector((state: RootState) => state.item);
  const initialValues = formData;
  const validationSchema = Yup.object({
    name: Yup.string().required("Bitte geben Sie einen Namen ein"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(updateItem({ name: daten.name, id }));
      // dispatch(getItems());
      history.push("/");
      resetForm();
    },
  });

  // get Single item by rendering
  React.useEffect(() => {
    dispatch(getItemById({ id }));
  }, [dispatch, id]);

  // Set input to the name
  React.useEffect(() => {
    if (singleItem && singleItem.data) {
      const { name } = singleItem.data;
      setFormData({ name });
      // console.log(name);
    }
  }, [singleItem]);

  // Clean up
  React.useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <Box>
      <Heading bgGradient="linear(to-l,green.500,yellow.400)" bgClip="text">
        Item ändern
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
          Ändern
        </Button>
      </form>
    </Box>
  );
};
export default Edit;
