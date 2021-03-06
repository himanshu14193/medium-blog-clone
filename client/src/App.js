import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import  { MDBIcon }  from "mdbreact"
import Register from "./components/authentication/Register"
import Login from "./components/authentication/Login"
import Account from "./components/authentication/account"
import StoryList from "./components/story/StoryList"
import Topic from "./components/story/Topics"
import SelectedTopic from "./components/story/SelectedTopic"
import StoryShow from "./components/story/StoryShow"
import StoryForm from "./components/story/StoryForm"
class App extends Component {
  constructor(){
    super()
    this.state={
      collapsed:true,
      isAuthenticated:!!localStorage.getItem('token')
    }
  }
  toggleNavbar =() =>{
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  handleIsAuthenticated=(bool)=>{
    this.setState(()=>({
      isAuthenticated:bool
    }))
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar className="navbar navbar-expand-sm bg-dark navbar-dark ">
            <NavbarBrand href="/" className="mr-4"><MDBIcon icon="blog" /> Medium-Blog-clone </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                  <Collapse isOpen={!this.state.collapsed} navbar>
                  { this.state.isAuthenticated &&
                    <Nav navbar className="mr-auto">
                        <NavItem>
                          <Link to="/topic" className="nav-link active" > Topics </Link>
                        </NavItem>
                    </Nav>
                  }
                  { this.state.isAuthenticated ?

                        <Nav className='rightNav ml-auto' navbar>
                          <NavItem>
                            <Link to="/users/account" className="nav-link active" ><MDBIcon icon="user-alt" /> Account </Link>
                          </NavItem>
                          <NavItem>
                            <Link to="/users/logout" className="nav-link active" ><MDBIcon icon="sign-out-alt" /> Logout </Link>
                          </NavItem>
                        </Nav>
                        :
                        <Nav className='rightNav ml-auto' navbar>  
                          <NavItem>
                            <Link to="/users/login" className="nav-link active" ><MDBIcon icon="sign-in-alt" /> Login </Link>
                          </NavItem>
                          <NavItem>
                            <Link to="/users/register" className="nav-link active" ><MDBIcon icon="user-plus" /> Register </Link>
                          </NavItem>
                        </Nav>
                  }
                  </Collapse>
          </Navbar>
          <Switch>
            <Route path="/story/new/:id" component={StoryForm} exact={true} />
            <Route path="/story/new" component={StoryForm} exact={true} />
            <Route path="/story/:id" component={StoryShow} exact={true} />
            <Route path="/topic/:id" component={SelectedTopic} exact={true} />
            <Route path="/topic" component={Topic} excat={true} />
            <Route path="/" component={StoryList} exact={true} />
            <Route path="/users/register" component={Register} exact={true} />
            <Route path="/users/login" render={()=><Login handleIsAuthenticated={this.handleIsAuthenticated} />} exact={true} />
            <Route path="/users/logout" component={(props)=>{
              localStorage.clear()
              console.log(props)
              axios.defaults.headers['x-auth'] = null
              return(
                <div>
                  <h3 align="center">You Have Successfully Logged Out.</h3>
                </div>
              )
            }} exact={true}/>
            <Route path="/users/account" component={Account} exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
