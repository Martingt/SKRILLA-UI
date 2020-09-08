import * as React from 'react'
import '../resources/styles/styles.scss'

export default class extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>       
        <div className="logo">
            
        </div>
        <div className="login">
            <form>
                <label>
                    Email:
                    <input type="text" name="email"></input>
                </label>
                <label>
                    Password:
                    <input type="password" name="password"></input>
                </label>
                <input type="submit" value="Log in"></input>
            </form>
        </div>
      </div>
    )
  }
}
