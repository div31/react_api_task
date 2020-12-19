import React,{useState} from "react";
import "./card.css";
import { Modal} from "antd";
import "antd/dist/antd.css";
import {HeartOutlined, DeleteFilled, MailOutlined, PhoneOutlined, GlobalOutlined, HeartFilled, EditOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

//ant-design form variables
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};



export const Card = (props) => {
    //states
    const [iconColor, setIconColor] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputText, setInputText] = useState(`${props.users.name}`);
    const [inputEmail, setInputEmail] = useState(`${props.users.email}`)
    const [inputPhone, setInputPhone] = useState(`${props.users.phone}`)
    const [inputWebsite, setInputWebsite] = useState(`${props.users.website}`)
    let [currentUsers, setCurrentUsers] = useState({})

    //handling the delete api button
    const handleDelete = (user_id, username) => {
      currentUsers = [props.users]

      fetch('https://jsonplaceholder.typicode.com/users/'+user_id, {
      method: 'DELETE',
    })
    .then(console.log(`Card ${user_id} is removed`))
    .then(m => m.json())
    .then(() => {
      const updatedUsers = currentUsers.filter(item => item.id !== user_id)
      setCurrentUsers(updatedUsers)
    })
    .then(() => console.log(currentUsers));

      fetch(`https://avatars.dicebear.com/4.5/v2/avataaars/${username}.svg?options[mood][]=/`,{
        method: 'DELETE',
      })
      .then(console.log(`Card ${username} is removed`))
    }

    //model form on click
    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    //handling the name input
    const inputTextHandler = (e) => {
      console.log(e.target.value);
      setInputText(e.target.value);
    }

    //handling the email input
    const inputEmailHandler = (e) => {
      console.log(e.target.value);
      setInputEmail(e.target.value);
    }

    //handling the phone input
    const inputPhoneHandler = (e) => {
      console.log(e.target.value);
      setInputPhone(e.target.value);
    }

    //handling the website input
    const inputWebsiteHandler = (e) => {
      console.log(e.target.value);
      setInputWebsite(e.target.value);
    }

    //icon toggling
    const heartIcon = () => {
      setIconColor(!iconColor)
    }

    //modal form functions
    const onFinish = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };


  return(
    // main card content
    <div className="card-container">
      <div className="img-container">
      <img
        className="img-main"
        alt="monster"
        src={`https://avatars.dicebear.com/4.5/v2/avataaars/${props.users.username}.svg?options[mood][]=`}
      />
      </div>
      <div className="details">
        <h3>{inputText}</h3>

        <p><MailOutlined />  {inputEmail}</p>
        <p><PhoneOutlined /> {inputPhone}</p>
        <p><GlobalOutlined /> https://{inputWebsite}</p>
      </div>

      {/* the effect icons code */}
      <div className="ant-cards">
      <ul className="ant-card-actions">
        <li >
          <span>

            <button style={{"color":"#ff0000"}} onClick={heartIcon} >
              {iconColor? <HeartFilled /> : <HeartOutlined />}
            </button>
          </span>
        </li>
        <li >
          <span>
            <button type="primary" onClick={showModal}>
              <EditOutlined onClick={showModal} />
            </button>
          </span>
        </li>
        <li >
          <span>
            <button onClick={() => {handleDelete(props.users.id,props.users.username)}}>
              <DeleteFilled  />
            </button>
          </span>
        </li>
      </ul>
      </div>

      {/* model form code */}
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input value={inputText} onChange={inputTextHandler} />
      </Form.Item>

      <Form.Item
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input value={inputEmail} onChange={inputEmailHandler}/>
      </Form.Item>
      <Form.Item
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input value={inputPhone} onChange={inputPhoneHandler}/>
      </Form.Item>
      <Form.Item
        label="Website"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input value={inputWebsite} onChange={inputWebsiteHandler}/>
      </Form.Item>


    </Form>
      </Modal>
    </div>
  )

};

