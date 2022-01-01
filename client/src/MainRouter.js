import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import { UserContext } from "./UserContext";
import {list} from './user/api-user'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./auth/Signin";
import Menu from "./Menu";
import PrivateRoute from "./auth/PrivateRoute";
import NewBook from "./book/NewBook";
import EditBook from "./book/EditBook";
import NewSoftware from "./software/NewSoftware";
import EditSoftware from "./software/EditSoftware";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";

export default function MainRouter() {
  const [users, setUsers] = useState([])


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data)=> {
      if(data?.error){
        console.log(data.error)
      }else{
        setUsers(data)
      }
    })  

    return () => {
      abortController.abort()
    }
  }, [])


  return (
    <UserContext.Provider value={users?.length}>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup } />
        <Route exact path="/signin" component={Signin} />

        <PrivateRoute exact path="/books/new" component={NewBook} />
        <PrivateRoute exact path="/books/edit/:bookId" component={EditBook} />
        
        <PrivateRoute exact path="/softwares/new" component={NewSoftware} />
        <PrivateRoute exact path="/softwares/edit/:softwareId" component={EditSoftware} />

        <PrivateRoute exact path="/posts/new" component={NewPost} />
        <PrivateRoute exact path="/posts/edit/:postId" component={EditPost} />

        
      </Switch>
    </UserContext.Provider>
  );
}
