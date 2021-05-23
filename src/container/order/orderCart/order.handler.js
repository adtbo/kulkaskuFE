import axios from "axios";

const sendOrder = (data) => {
  console.log(data);
  axios.post(`https://kulkasku.herokuapp.com/checkout`, data).then((res) => {
    console.log(res);
    console.log(res.data);
  });
};

export { sendOrder };
