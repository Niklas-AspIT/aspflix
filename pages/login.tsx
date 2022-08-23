import type { NextPage } from "next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import Layout from "../components/Layout";
import Style from "../styles/Login.module.scss";
import { Formik, FormikValues, Form, ErrorMessage, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";

const auth = getAuth(app);

const tryLogin = async (event: { email: string; password: string }) => {
  await signInWithEmailAndPassword(auth, event.email, event.password);
};

const Login: NextPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      router.push("/browse");
    }
  }, [auth.user, router]);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <Layout hero={true}>
      {/* Formik forms, read here: https://formik.org/docs/overview */}
      <Formik
        initialValues={{ email: "", password: "", error: "" }}
        validate={(values) => {
          const errors: FormikValues = {};

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please enter a valid e-mail address.";
          }

          if (!values.password) {
            errors.password = "Password has to be between 6-40 characters.";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          tryLogin(values)
            .then(() => setSubmitting(false))
            .catch((e) => {
              const error = e.toString();

              // Check for errors when signing in
              if (error.includes("user-not-found")) {
                setErrors({
                  error: "Couldn't find the account",
                });
              } else if (error.includes("wrong-password")) {
                setErrors({
                  error: "Wrong email or passowrd",
                });
              } else {
                setErrors({
                  error: "An error ocurred, please try again",
                });
              }

              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={Style.form}>
            <h3 className={Style.form__title}>Login</h3>
            <ErrorMessage
              component="div"
              name="error"
              className={Style.form__errorglob}
            />
            <Field
              type="email"
              name="email"
              className={Style.form__field}
              placeholder="E-mail"
            />
            <ErrorMessage
              name="email"
              component="div"
              className={Style.form__error}
            />
            <Field
              type="password"
              name="password"
              className={Style.form__field}
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={Style.form__error}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={Style.form__submit}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
