import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkblue;
  height: 100px;
  width: 100px;
`;





const Person = () => {
  const [person, setperson] = useState(null);

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    try {
      const response = await axios.get('/google/test');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  


  return (
    <div>
      hello
    </div>
  )
}

export default Person
