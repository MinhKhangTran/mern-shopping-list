import React from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputRightElement,
  IconButton,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, userInfo } = useSelector((state: RootState) => state.user);
  const [showPW, setShowPW] = React.useState(false);
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Es muss eine E-Mail Addresse sein!")
      .required("Bitte geben Sie Ihre E-Mail Addresse ein"),

    password: Yup.string()
      .required("Bitte geben Sie Ihr Password ein")
      .min(6, "mindestens 6 Zeichen"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(loginUser(daten));

      resetForm();
    },
  });

  React.useEffect(() => {
    if (userInfo._id.length !== 0) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <Box>
      <Heading bgGradient="linear(to-l,green.500,yellow.400)" bgClip="text">
        Login
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <FormControl
          isInvalid={!!formik.errors.email && formik.touched.email}
          id="email"
          mt={4}
        >
          <FormLabel>E-Mail</FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="YourBestEmail@example.com"
            {...formik.getFieldProps("email")}
          />

          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={!!formik.errors.password && formik.touched.password}
          id="password"
          mt={4}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={showPW ? "text" : "password"}
              placeholder="******"
              {...formik.getFieldProps("password")}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="hide/show password"
                onClick={() => setShowPW(!showPW)}
                variant="ghost"
                colorScheme="yellow"
                h="1.75rem"
              >
                {showPW ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button isLoading={loading} mt={8} colorScheme="yellow" type="submit">
          Login
        </Button>
        <Text mt={4} fontStyle="italic">
          Noch kein Account?{" "}
          <Link to="/register">
            <Text
              as="span"
              cursor="pointer"
              bgGradient="linear(to-l,green.600,yellow.600)"
              bgClip="text"
            >
              hier klicken
            </Text>
          </Link>{" "}
          um sich anzumelden!
        </Text>
      </form>
    </Box>
  );
};
export default Login;
