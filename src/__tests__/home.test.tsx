/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../home";

const user = {
  username: "username",
  identifier: "nanasan@yahoo.com",
  userId: "1234",
};

test("Home component renders", () => {
  const { getByTestId } = render(
    <Home
      handleForm={() => {}}
      showLoginForm={true}
      userHandler={(token) => {
        console.log(token);
      }}
      user={user}
      form="login"
      toggleForm={() => {}}
    />
  );
  const component = getByTestId("home");
  expect(component).toBeInTheDocument();
});

describe("Correct text is displayed", () => {
  test("Correct title display when not logged in", () => {
    const { getByText } = render(
      <Home
        handleForm={() => {}}
        showLoginForm={true}
        userHandler={(token) => {
          console.log(token);
        }}
        user={{}}
        form="login"
        toggleForm={() => {}}
      />
    );
    expect(getByText("Welcome to Dreamscape")).toBeInTheDocument();
  });

  test("Correct title display when logged in", () => {
    const { getByText } = render(
      <Home
        handleForm={() => {}}
        showLoginForm={true}
        userHandler={(token) => {
          console.log(token);
        }}
        user={user}
        form="login"
        toggleForm={() => {}}
      />
    );
    expect(
      getByText(`Welcome to Dreamscape, ${user.username}`)
    ).toBeInTheDocument();
  });

  test("Subtext exists", () => {
    const { getByText } = render(
      <Home
        handleForm={() => {}}
        showLoginForm={true}
        userHandler={(token) => {
          console.log(token);
        }}
        user={user}
        form="login"
        toggleForm={() => {}}
      />
    );
    expect(getByText(/Explore the link between/i)).toBeInTheDocument();
  });
});

test("It's free! text exists", () => {
  const { getByText } = render(
    <Home
      handleForm={() => {}}
      showLoginForm={true}
      userHandler={(token) => {
        console.log(token);
      }}
      user={{}}
      form="login"
      toggleForm={() => {}}
    />
  );
  expect(getByText("(It's free!)")).toBeInTheDocument();
});

describe("Get started button", () => {
  test("Get started button exists", () => {
    const { getByRole } = render(
      <Home
        handleForm={() => {}}
        showLoginForm={true}
        userHandler={(token) => {
          console.log(token);
        }}
        user={{}}
        form="login"
        toggleForm={() => {}}
      />
    );
    const button = getByRole("button", { name: /Get started/i });
    expect(button).toBeInTheDocument();
  });

  test("Login form appears on button click", () => {
    const { getByTestId, getByText } = render(
      <Home
        handleForm={() => {}}
        showLoginForm={true}
        userHandler={(token) => {
          console.log(token);
        }}
        user={{}}
        form="login"
        toggleForm={() => {}}
      />
    );

    fireEvent.click(getByText("Get started"));
    const loginForm = getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  test("Signup form appears when form has string value signup", () => {
    const { getByTestId, getByText } = render(
      <Home
        handleForm={() => {}}
        showLoginForm={true}
        userHandler={(token) => {
          console.log(token);
        }}
        user={{}}
        form="signup"
        toggleForm={() => {}}
      />
    );

    fireEvent.click(getByText("Get started"));
    const loginForm = getByTestId("signup-form");
    expect(loginForm).toBeInTheDocument();
  });
});
