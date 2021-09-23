import * as React from "react";
import authOperations from "../state/operations";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "../state";
import { history } from "../../../routes/history";
import { Link as RouteLink } from "react-router-dom";
import {
  Flex,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Link,
  Image,
  Center,
  useBoolean,
  CircularProgress
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormAlert } from "../../../components/formAlert/formAlert";
import { authRoutes } from "../authRoutes";
import { addTestId } from "../../../utils/test.utils";

const loginFormSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required().min(6)
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const isLoading = useSelector(authSelectors.isAuthLoading);
  const formSubmitError = useSelector(authSelectors.getAuthError);
  const dispatch = useDispatch();

  const authenticateUser = (email: string, password: string) =>
    dispatch(authOperations.authenticateUser(email, password));

  const checkAuthentication = authOperations.checkAuthentication;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    // resolver: yupResolver(loginFormSchema)
  });

  const [isPasswordVisible, setPasswordVisible] = useBoolean();

  const handleShowPasswordClick = () => setPasswordVisible.toggle();

  const onSubmit = (data: LoginFormInputs) => {
    authenticateUser(data.email, data.password);
  };

  if (checkAuthentication()) {
    history.push(authRoutes.DASHBOARD);
    return null;
  } else {
    return (
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        minHeight="100vh"
        backgroundImage="url('/assets/banner.png')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="bottom"
        backgroundColor="yellow.100">
        <Box
          p={8}
          width="100%"
          maxWidth="460px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          backgroundColor="white">
          <Center m={2}>
          </Center>
          <Box my={4} textAlign="left">
            <FormAlert message={formSubmitError} type="error" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={!!errors?.email}
                isRequired
                isDisabled={isLoading}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="enter your email"
                  {...register("email")}
                  {...addTestId("emailField")}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                mt={6}
                isInvalid={!!errors?.password}
                isRequired
                isDisabled={isLoading}>
                <FormLabel>Password</FormLabel>
                <InputGroup size={"md"}>
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="*******"
                    {...register("password")}
                    {...addTestId("passwordField")}
                  />

                  <InputRightElement width="3rem">
                    <Button
                      h="8"
                      size="sm"
                      onClick={handleShowPasswordClick}
                      {...addTestId("showPassword")}>
                      {isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="brand"
                width="full"
                mt={4}
                type="submit"
                disabled={!!(errors.email || errors.password || isLoading)}
                {...addTestId("loginButton")}>
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Box>
          <Box mt={16}>
            <Link
              as={RouteLink}
              to={authRoutes.PASSWORD_RESET}
              {...addTestId("forgotPasswordLink")}>
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </Flex>
    );
  }
};

export default Login;
