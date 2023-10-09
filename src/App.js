import React, { Component } from 'react';
import './App.css';
import { getAllStudents } from './client.js'
import Container from './Container.js';
import Footer from './footer.js';
import AddStudentForm from './forms/AddStudentForm';
import {
  Table,
  Avatar,
  Spin,
  Modal
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const getIndicatorIcon = () => (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

class App extends Component{

  state= {
    students: [],
    isFetching: false,
    isAddStudentModalVisiable: false
  }

  componentDidMount () {
    this.fetchStudents();
  }

  openAddStudentModalVisiable = () => this.setState({isAddStudentModalVisiable:true})

  closeAddStudentModalVisiable = () => this.setState({isAddStudentModalVisiable:false})

  fetchStudents = () => {
    this.setState({
      isFetching:true
    });
    getAllStudents()
      .then(res => res.json()
      .then(students =>{
        console.log(students);
        this.setState({
          students,
          isFetching: false,
          isAddStudentModalVisiable: false
        });
    }));
  }
  render(){

    const { students, isFetching, isAddStudentModalVisiable} = this.state;

    if (isFetching){
      return(
        <Container>
          <Spin indicator={getIndicatorIcon} />
        </Container>
      );
    }

    if (students && students.length) {

      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
      ];

      return(
        <Container>
          <Table 
          dataSource={students} 
          columns={columns} 
          pagination={false}
          rowKey='studentId' />
          <Modal
            title = 'Add new student'
            open={isAddStudentModalVisiable}
            onOk={this.closeAddStudentModalVisiable}
            onCancel={this.closeAddStudentModalVisiable}
            width={1000}>
            <AddStudentForm />
          </Modal>
          <Footer numberOfStudents={students.length}
          handleAddStudentClickEvent = {this.openAddStudentModalVisiable}/>
        </Container>
      );

    }

    return <h1>No Students found</h1>
  }
}

export default App;
