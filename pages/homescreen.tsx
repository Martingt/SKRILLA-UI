import React from 'react'
import withAuth from  '../utils/withAuth'

class HomeScreen extends React.Component<any, any> {
   render() {
     const user = this.props.auth.getProfile()
     return (   
         <div>Current user: {user.email}</div>
     )
   }
}

export default withAuth(HomeScreen) 