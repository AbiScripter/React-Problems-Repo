import React, { useState } from "react";

const MultiForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (validate(2)) {
      alert("form succssfully applied");
      console.log(formData);
    }
  }

  function validate(index) {
    const { firstname, lastname, email, mobile, password, confirmpassword } =
      formData;
    let errorText = "";

    switch (index) {
      case 0: {
        if (firstname.length > 3 && lastname.length > 3) {
          setError("");
          return true;
        } else {
          errorText = "names should be alteas have length of 3";
          setError(errorText);

          return false;
        }
      }

      case 1: {
        if (email.includes("@") && mobile.length === 10) {
          setError("");
          return true;
        } else {
          errorText =
            "give a proper email / mobile number lenght should be in l0chars";
          setError(errorText);
          return false;
        }
      }

      case 2: {
        if (password === confirmpassword) {
          setError("");
          return true;
        } else {
          errorText = "password does not match";
          setError(errorText);
          return false;
        }
      }

      default:
        return true;
    }
  }

  function handleNext() {
    if (validate(activeIndex)) {
      setActiveIndex((prev) => prev + 1);
    }
  }

  function handlePrev() {
    setActiveIndex((prev) => prev - 1);
  }

  return (
    <div>
      {activeIndex === 0 && (
        <First formData={formData} setFormData={setFormData} />
      )}
      {activeIndex === 1 && (
        <Second formData={formData} setFormData={setFormData} />
      )}
      {activeIndex === 2 && (
        <Third formData={formData} setFormData={setFormData} />
      )}
      {activeIndex !== 0 && <button onClick={handlePrev}>prev</button>}
      {activeIndex !== 2 && <button onClick={handleNext}>next</button>}
      {activeIndex === 2 && <button onClick={handleSubmit}>submit</button>}
      <p>{error.length > 0 && <span style={{ color: "red" }}>{error}</span>}</p>
    </div>
  );
};

const First = ({ formData, setFormData }) => {
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="firstname"
      />
      <input
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="lastname"
      />
    </>
  );
};

const Second = ({ formData, setFormData }) => {
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="mobile"
      />
    </>
  );
};

const Third = ({ formData, setFormData }) => {
  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="password"
      />
      <input
        name="confirmpassword"
        type="password"
        value={formData.confirmpassword}
        onChange={handleChange}
        placeholder="confirmpassword"
      />
    </>
  );
};

export default MultiForm;
